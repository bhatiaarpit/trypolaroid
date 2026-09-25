"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";

type PassionId = "film" | "bikes" | "tech" | "music" | "fashion";
type Stage = "passion" | "preferences" | "prompt" | "photo" | "developing" | "reveal";
type MomentStatus = "pending" | "generating" | "completed" | "failed";
type MomentStatusResponse = {
  momentId: string;
  status: MomentStatus;
  outputUrl: string | null;
  photoUrl: string | null;
  title: string | null;
  error?: string;
};

type Passion = {
  id: PassionId;
  name: string;
  tagline: string;
  icon: string;
  accent: string;
  pale: string;
  preferences: string[];
  prompt: string;
  titles: string[];
};

const passions: Passion[] = [
  { id: "film", name: "Film", tagline: "Frames, stories, light.", icon: "◉", accent: "#bd744c", pale: "#f4e2d2", preferences: ["Noir", "A24", "70s New Hollywood", "Anime", "Indie", "Sci-Fi"], prompt: "A director who only shoots at golden hour...", titles: ["THE MIDNIGHT DIRECTOR", "THE LAST FRAME", "GOLDEN HOUR ONLY"] },
  { id: "bikes", name: "Bikes", tagline: "Machines, roads, freedom.", icon: "↗", accent: "#cf6d4e", pale: "#f6dfd0", preferences: ["Cafe Racer", "Superbike", "Classic", "Adventure", "Street", "Track"], prompt: "The one who takes the long way home...", titles: ["THE LONG WAY HOME", "ASPHALT DREAMER", "THE OPEN ROAD"] },
  { id: "tech", name: "Tech", tagline: "Build, break, reinvent.", icon: "⌘", accent: "#528d83", pale: "#dcece6", preferences: ["AI", "Open Source", "Startups", "Hardware", "Cyberpunk", "Developer"], prompt: "The builder who gets lost in tiny details...", titles: ["THE MIDNIGHT BUILDER", "SHIP IT ANYWAY", "THE OBSESSIVE ONE"] },
  { id: "music", name: "Music", tagline: "Sound, rhythm, feeling.", icon: "♫", accent: "#8069a6", pale: "#e9e2f0", preferences: ["Hip-Hop", "Indie", "Rock", "Electronic", "Jazz", "Bollywood"], prompt: "The person who always knows the next song...", titles: ["THE NEXT TRACK", "ON REPEAT", "THE ONE WHO KNOWS"] },
  { id: "fashion", name: "Fashion", tagline: "Style, identity, expression.", icon: "✳", accent: "#c4778d", pale: "#f2e0e4", preferences: ["Minimal", "Streetwear", "Vintage", "Luxury", "Avant-Garde", "Sneakers"], prompt: "Someone who treats getting dressed like storytelling...", titles: ["THE STORYTELLER", "DRESSED ON PURPOSE", "QUIET STATEMENT"] },
];

const inputStages: Stage[] = ["passion", "preferences", "prompt", "photo"];
const stageTitles: Record<Stage, string> = {
  passion: "What world are you in?",
  preferences: "Shape your world",
  prompt: "Who are you in this world?",
  photo: "Want to put yourself in it?",
  developing: "Developing your Polaroid...",
  reveal: "This one feels like you.",
};
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#1d3a35] px-7 text-sm font-semibold text-[#fbf1e3] shadow-[0_18px_40px_-24px_rgba(23,48,43,0.45)] transition hover:-translate-y-0.5 hover:bg-[#284b44] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]";
const secondaryClass = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#17302b]/35 px-6 text-sm font-medium text-[#17302b] transition hover:bg-[#17302b]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function CreateFlow({ initialWorld }: { initialWorld: string | null }) {
  const [stage, setStage] = useState<Stage>("passion");
  const [passionId, setPassionId] = useState<PassionId | null>(() => passions.find((item) => item.id === initialWorld?.toLowerCase())?.id ?? null);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [otherPreference, setOtherPreference] = useState("");
  const [selfPrompt, setSelfPrompt] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [remotePhotoUrl, setRemotePhotoUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [momentId, setMomentId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [developingMessage, setDevelopingMessage] = useState(0);
  const [revealTitle, setRevealTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const createRequestController = useRef<AbortController | null>(null);
  const passion = passions.find((item) => item.id === passionId) ?? null;

  useEffect(() => {
    if (stage !== "developing") return;
    const messages = ["Mixing your world...", "Finding your frame...", "Adding a little grain...", "Almost there..."];
    const interval = window.setInterval(() => setDevelopingMessage((value) => (value + 1) % messages.length), 950);
    return () => window.clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== "developing" || !momentId) return;
    const currentMomentId = momentId;
    const controller = new AbortController();
    let active = true;

    async function pollMoment() {
      for (let attempt = 0; attempt < 60 && active; attempt += 1) {
        const response = await fetch(`${apiBaseUrl}/api/moments/${encodeURIComponent(currentMomentId)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json().catch(() => ({}))) as MomentStatusResponse;
        if (!response.ok) throw new Error(result.error ?? "We couldn't check your Polaroid yet.");
        if (result.status === "failed") throw new Error("We couldn't develop this Polaroid. Please try again.");

        if (result.status === "completed") {
          if (!result.outputUrl) throw new Error("The mock generator didn't return an image.");
          setOutputUrl(result.outputUrl);
          setRemotePhotoUrl(result.photoUrl);
          setRevealTitle(result.title ?? "YOUR ONE-OF-ONE");
          setStage("reveal");
          return;
        }

        await new Promise<void>((resolve) => window.setTimeout(resolve, 800));
      }

      if (active) throw new Error("Your Polaroid is taking longer than expected. Please try again.");
    }

    void pollMoment().catch((error: unknown) => {
      if (active && !controller.signal.aborted) {
        setNotice(error instanceof Error ? error.message : "We couldn't develop this Polaroid.");
        setStage("photo");
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [momentId, stage]);

  useEffect(() => () => createRequestController.current?.abort(), []);

  function goBack() {
    const index = inputStages.indexOf(stage);
    if (index > 0) setStage(inputStages[index - 1]);
  }

  function togglePreference(value: string) {
    setPreferences((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function choosePhoto(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Choose an image file to add a photo.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setNotice("That image is over 10 MB. Choose a smaller one.");
      return;
    }
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoFile(file);
    setNotice("");
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    choosePhoto(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    choosePhoto(event.dataTransfer.files[0]);
  }

  async function startDeveloping() {
    if (!passionId) return;
    setNotice("");
    setDevelopingMessage(0);
    setMomentId(null);
    setOutputUrl(null);
    setRemotePhotoUrl(null);
    setStage("developing");

    const controller = new AbortController();
    createRequestController.current?.abort();
    createRequestController.current = controller;
    const formData = new FormData();
    formData.set("passion", passionId);
    formData.set("preferences", JSON.stringify(preferences));
    formData.set("preferencesText", otherPreference);
    formData.set("prompt", selfPrompt);
    if (photoFile) formData.set("photo", photoFile);

    try {
      const response = await fetch(`${apiBaseUrl}/api/moments`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as { momentId?: string; error?: string };
      if (!response.ok || !result.momentId) {
        throw new Error(result.error ?? "We couldn't start your Polaroid. Check that the backend is running.");
      }
      setMomentId(result.momentId);
    } catch (error) {
      if (!controller.signal.aborted) {
        setNotice(error instanceof Error ? error.message : "We couldn't start your Polaroid. Check that the backend is running.");
        setStage("photo");
      }
    }
  }

  function reset() {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setStage("passion");
    setPassionId(null);
    setPreferences([]);
    setOtherPreference("");
    setSelfPrompt("");
    setPhotoUrl(null);
    setPhotoFile(null);
    setRemotePhotoUrl(null);
    setOutputUrl(null);
    setMomentId(null);
    setNotice("");
  }

  async function shareLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setNotice("Link copied. Your keepsake is ready to share.");
    } catch {
      setNotice("Your keepsake is ready. Sharing will be available soon.");
    }
  }

  const inputStep = inputStages.indexOf(stage);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#fbf1e3] text-[#17302b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,#f6ddbe_0%,transparent_36%),radial-gradient(circle_at_95%_90%,#e3efec_0%,transparent_38%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-245 flex-col px-5 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-7">
        <header className="flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Polaroid</Link>
          <div className="flex items-center gap-3">
            {inputStep > 0 && <button type="button" onClick={goBack} aria-label="Go back one step" className="grid size-10 place-items-center rounded-full border border-[#17302b]/20 text-lg transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-[#e2734f]">←</button>}
            <Link href="/" className="text-sm text-[#4c645f] transition hover:text-[#17302b]">Exit</Link>
          </div>
        </header>

        {inputStep >= 0 && (
          <div className="mx-auto mt-8 w-full max-w-130" aria-label={`Step ${inputStep + 1} of 4`}>
            <div className="flex justify-between text-[0.68rem] uppercase tracking-[0.16em] text-[#4c645f]"><span>Make it yours</span><span>{inputStep + 1} / 4</span></div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#17302b]/10"><div className="h-full rounded-full bg-[#e2734f] transition-[width] duration-500" style={{ width: `${((inputStep + 1) / 4) * 100}%` }} /></div>
          </div>
        )}

        <section className="mx-auto flex w-full max-w-165 flex-1 flex-col items-center justify-center py-12 text-center" aria-live="polite">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#e2734f]">{stage === "reveal" ? "Your one-of-one" : stage === "developing" ? "A little patience" : "A small creative experience"}</p>
          <h1 className="font-serif text-[clamp(2rem,6vw,3.1rem)] font-semibold leading-tight">{stageTitles[stage]}</h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#4c645f]">{stage === "passion" ? "Pick the one that feels most like you." : stage === "preferences" ? "Choose a few details. As many as you like." : stage === "prompt" ? "Don't overthink it. A few words can say a lot." : stage === "photo" ? "Add a photo, or let the world speak for you." : stage === "developing" ? "The colors are finding their way onto the paper." : "A portrait of you, in the world you love."}</p>

          {stage === "passion" && <div className="mt-8 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {passions.map((item) => <button key={item.id} type="button" aria-pressed={passionId === item.id} onClick={() => { setPassionId(item.id); setPreferences([]); }} className={`relative min-h-28 overflow-hidden rounded-xl border bg-white/70 p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f] ${passionId === item.id ? "border-[#1d3a35] ring-2 ring-[#1d3a35]/20" : "border-[#17302b]/10"}`}>
              <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: item.accent }} /><span aria-hidden="true" className="float-right text-2xl" style={{ color: item.accent }}>{item.icon}</span><span className="block font-serif text-xl font-semibold">{item.name}</span><span className="mt-1 block text-sm text-[#4c645f]">{item.tagline}</span>
            </button>)}
          </div>}

          {stage === "preferences" && passion && <div className="mt-8 w-full">
            <div className="flex flex-wrap justify-center gap-2.5">{passion.preferences.map((item) => <button key={item} type="button" aria-pressed={preferences.includes(item)} onClick={() => togglePreference(item)} className={`min-h-11 rounded-full border px-5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f] ${preferences.includes(item) ? "border-[#1d3a35] bg-[#1d3a35] text-[#fbf1e3]" : "border-[#17302b]/15 bg-white/70 hover:border-[#1d3a35]/50"}`}>{item}</button>)}</div>
            <label htmlFor="extra-preference" className="mx-auto mt-9 block max-w-lg text-left text-sm text-[#4c645f]">Anything else you love?</label>
            <input id="extra-preference" value={otherPreference} maxLength={150} onChange={(event) => setOtherPreference(event.target.value)} placeholder="A detail only another fan would understand..." className="mt-2 h-12 w-full max-w-lg border-b border-[#17302b]/20 bg-transparent px-1 text-[#17302b] placeholder:text-[#4c645f]/55 focus:border-[#e2734f] focus:outline-none" />
            <p className="mx-auto mt-1 max-w-lg text-right text-xs text-[#4c645f]">{otherPreference.length}/150</p>
          </div>}

          {stage === "prompt" && <div className="mt-8 w-full max-w-xl">
            <label className="sr-only" htmlFor="self-prompt">Who are you in this world?</label>
            <textarea id="self-prompt" value={selfPrompt} maxLength={150} onChange={(event) => setSelfPrompt(event.target.value)} placeholder={passion?.prompt ?? "A line that sounds like you..."} className="min-h-36 w-full resize-y border-b border-[#17302b]/20 bg-transparent px-3 py-4 text-center font-serif text-2xl italic leading-relaxed text-[#17302b] placeholder:text-[#4c645f]/50 focus:border-[#e2734f] focus:outline-none" />
            <p className="mt-2 text-right text-xs text-[#4c645f]">{selfPrompt.length}/150</p>
          </div>}

          {stage === "photo" && <div className="mt-8 w-full max-w-sm">
            <label htmlFor="photo-file" className={`relative mx-auto flex aspect-[4/4.3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed bg-white/55 transition ${isDragging ? "border-[#e2734f] bg-[#fcebdd]" : "border-[#17302b]/25 hover:border-[#1d3a35]"}`} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={onDrop}>
              {photoUrl ? <><Image src={photoUrl} alt="Selected photo preview" fill unoptimized sizes="(max-width: 640px) 90vw, 384px" className="object-cover" /><span className="absolute bottom-3 rounded-full bg-white/90 px-4 py-2 text-xs font-medium">Choose a different photo</span></> : <><span aria-hidden="true" className="text-3xl text-[#4c645f]">↑</span><span className="mt-3 text-sm font-medium">Upload a photo</span><span className="mt-1 text-xs text-[#4c645f]">JPG, PNG, or WebP · up to 10 MB</span></>}
            </label>
            <input id="photo-file" type="file" accept="image/*" onChange={onFileChange} className="sr-only" />
            <p className="mt-4 text-xs text-[#4c645f]">Your photo stays in this browser preview.</p>
          </div>}

          {stage === "developing" && <div className="mt-10 w-[min(14rem,70vw)] -rotate-3 bg-white p-3 pb-10 shadow-[0_24px_55px_-24px_rgba(23,48,43,0.35)]">
            <div className="polaroid-developing relative aspect-square overflow-hidden bg-[#ead7c0]" style={{ backgroundImage: photoUrl ? `url(${photoUrl})` : `radial-gradient(circle at 30% 20%, ${passion?.accent ?? "#e7b989"}, ${passion?.pale ?? "#f8efe0"} 75%)`, backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0 bg-linear-to-br from-white/15 to-[#17302b]/20" /></div>
          </div>}

          {stage === "reveal" && passion && <div className="mt-8 flex flex-col items-center">
            <div className="w-[min(17rem,76vw)] -rotate-2 rounded-sm bg-[#fffdf8] p-4 pb-7 shadow-[0_24px_55px_-24px_rgba(23,48,43,0.35)]">
              <div className="relative aspect-square overflow-hidden rounded-sm" style={{ backgroundImage: outputUrl ? `url("${outputUrl}")` : remotePhotoUrl ? `url("${remotePhotoUrl}")` : photoUrl ? `url("${photoUrl}")` : `radial-gradient(circle at 30% 20%, ${passion.accent}88, ${passion.pale} 75%)`, backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0 bg-linear-to-br from-white/10 to-[#17302b]/20" /><span className="absolute bottom-3 right-3 font-serif text-3xl text-white drop-shadow">{passion.icon}</span></div>
              <p className="mt-4 text-center font-serif text-lg font-semibold">{revealTitle}</p><p className="mt-1 text-center text-[0.65rem] uppercase tracking-[0.16em] text-[#8a7b64]">{passion.name}{preferences[0] ? ` · ${preferences[0]}` : ""} · 2026</p>
            </div>
            <p className="mt-6 max-w-sm font-handwriting text-2xl text-[#4c645f]">&ldquo;{selfPrompt}&rdquo;</p>
          </div>}

          {notice && <p role="status" className="mt-5 text-sm text-[#4c645f]">{notice}</p>}

          {stage === "passion" && <button type="button" disabled={!passionId} onClick={() => setStage("preferences")} className={`${buttonClass} mt-8`}>Continue <span aria-hidden="true" className="ml-2">→</span></button>}
          {stage === "preferences" && <button type="button" onClick={() => setStage("prompt")} className={`${buttonClass} mt-8`}>Continue <span aria-hidden="true" className="ml-2">→</span></button>}
          {stage === "prompt" && <button type="button" disabled={selfPrompt.trim().length < 3} onClick={() => setStage("photo")} className={`${buttonClass} mt-8`}>Continue <span aria-hidden="true" className="ml-2">→</span></button>}
          {stage === "photo" && <div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={startDeveloping} className={secondaryClass}>{photoUrl ? "Skip photo" : "Skip for now"}</button><button type="button" onClick={startDeveloping} className={buttonClass}>Develop my Polaroid <span aria-hidden="true" className="ml-2">→</span></button></div>}
          {stage === "developing" && <p className="mt-6 min-h-6 text-sm text-[#4c645f]" aria-live="polite">{["Mixing your world...", "Finding your frame...", "Adding a little grain...", "Almost there..."][developingMessage]}</p>}
          {stage === "reveal" && <div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={shareLink} className={buttonClass}>Save &amp; share</button><button type="button" onClick={reset} className={secondaryClass}>Create another</button></div>}
        </section>
        <footer className="text-center text-xs text-[#4c645f]/75">A little piece of your world, made with care.</footer>
      </div>
    </main>
  );
}
