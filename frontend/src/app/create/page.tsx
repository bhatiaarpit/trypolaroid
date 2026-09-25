import CreateFlow from "./create-flow";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ world?: string }>;
}) {
  const { world } = await searchParams;
  return <CreateFlow initialWorld={world ?? null} />;
}