import { randomUUID } from "node:crypto";
import { supabase } from "../../lib/supabase";

const photoBucket = process.env.SUPABASE_PHOTOS_BUCKET ?? "polaroid-photos";
const outputBucket = process.env.SUPABASE_OUTPUTS_BUCKET ?? "polaroid-outputs";
const photoUrlLifetimeSeconds = 60 * 60;
const outputUrlLifetimeSeconds = 60 * 60 * 24;

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export type StoredAsset = {
  path: string;
  signedUrl: string;
};

async function uploadPrivateAsset(
  bucketName: string,
  momentId: string,
  buffer: Buffer,
  contentType: string,
  signedUrlLifetimeSeconds: number,
): Promise<StoredAsset> {
  const extension = extensions[contentType];
  if (!extension) throw new Error("Unsupported image type");

  const path = `${momentId}/${randomUUID()}.${extension}`;
  const bucket = supabase.storage.from(bucketName);
  const { error: uploadError } = await bucket.upload(path, buffer, {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

  const { data, error: signError } = await bucket.createSignedUrl(path, signedUrlLifetimeSeconds);
  if (signError) {
    await bucket.remove([path]);
    throw new Error(`Storage URL creation failed: ${signError.message}`);
  }

  return { path, signedUrl: data.signedUrl };
}

export async function uploadMomentPhoto(
  momentId: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const asset = await uploadPrivateAsset(
    photoBucket,
    momentId,
    buffer,
    contentType,
    photoUrlLifetimeSeconds,
  );
  return asset.path;
}

export function getMomentPhotoUrl(path: string): Promise<string> {
  return getSignedUrl(photoBucket, path, photoUrlLifetimeSeconds);
}

export function uploadMomentOutput(
  momentId: string,
  buffer: Buffer,
  contentType: string,
): Promise<StoredAsset> {
  return uploadPrivateAsset(
    outputBucket,
    momentId,
    buffer,
    contentType,
    outputUrlLifetimeSeconds,
  );
}

export function getMomentOutputUrl(path: string): Promise<string> {
  return getSignedUrl(outputBucket, path, outputUrlLifetimeSeconds);
}

async function getSignedUrl(bucketName: string, path: string, expiresIn: number): Promise<string> {
  const { data, error } = await supabase.storage.from(bucketName).createSignedUrl(path, expiresIn);
  if (error) throw new Error(`Storage URL creation failed: ${error.message}`);
  return data.signedUrl;
}
