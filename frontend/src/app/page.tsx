import Link from "next/link";

const steps = [
  ["01", "Choose your world", "Film, bikes, tech, music, or fashion. Start where you feel at home."],
  ["02", "Add your flavor", "Pick the details, references, and little obsessions that make it yours."],
  ["03", "Say who you are", "One honest line is enough. No perfect answer needed."],
  ["04", "Watch it develop", "Your world becomes a keepsake, one frame at a time."],
];
const worlds = [
  { name: "Film", note: "Frames, stories, light", color: "from-[#e8b989] to-[#f3e2c8]", symbol: "◉" },
  { name: "Bikes", note: "Machines, roads, freedom", color: "from-[#e7a17f] to-[#f6d8bd]", symbol: "↗" },
  { name: "Tech", note: "Build, break, reinvent", color: "from-[#9ac8c2] to-[#ddeeea]", symbol: "⌘" },
  { name: "Music", note: "Sound, rhythm, feeling", color: "from-[#c2acd9] to-[#eee3f4]", symbol: "♫" },
  { name: "Fashion", note: "Style, identity, expression", color: "from-[#e7a9bc] to-[#f6dce4]", symbol: "✳" },
];
const examples = [
  { title: "THE MIDNIGHT DIRECTOR", sub: "FILM · NOIR · 2026", color: "from-[#e8b989] to-[#d99f7b]", rotation: "rotate-[4deg]" },
  { title: "SHIP IT ANYWAY", sub: "TECH · STARTUPS · 2026", color: "from-[#9ac8c2] to-[#5b9b94]", rotation: "-rotate-[3deg] translate-y-3" },
  { title: "DRESSED ON PURPOSE", sub: "FASHION · VINTAGE · 2026", color: "from-[#e7a9bc] to-[#c8879c]", rotation: "-rotate-[6deg]" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbf1e3] text-[#17302b]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 opacity-[0.035] mix-blend-multiply bg-[radial-gradient(rgba(23,48,43,0.8)_0.6px,transparent_0.6px)] bg-size-[5px_5px]" />
      <header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6">
        <nav aria-label="Main navigation" className="mx-auto flex w-full max-w-270 items-center justify-between rounded-full border border-[#17302b]/12 bg-[#fbf1e3]/85 px-5 py-2.5 shadow-[0_24px_55px_-24px_rgba(23,48,43,0.28)] backdrop-blur-md sm:pl-6 sm:pr-2.5">
          <Link href="/" className="font-serif text-[1.3rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Polaroid</Link>
          <div className="hidden items-center gap-7 text-sm text-[#4c645f] md:flex">
            <a href="#journey" className="transition-colors hover:text-[#17302b]">The journey</a><a href="#worlds" className="transition-colors hover:text-[#17302b]">Worlds</a><a href="#examples" className="transition-colors hover:text-[#17302b]">Examples</a>
          </div>
          <div className="flex items-center gap-3 sm:gap-5"><Link href="/signup" className="text-xs text-[#4c645f] transition-colors hover:text-[#17302b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f] sm:text-sm">Sign in</Link><Link href="/create" className="rounded-full bg-[#1d3a35] px-4 py-2.5 text-xs font-semibold text-[#fbf1e3] shadow-[0_14px_30px_-18px_rgba(23,48,43,0.5)] transition hover:-translate-y-0.5 hover:bg-[#284b44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f] sm:px-5 sm:text-sm">Create yours</Link></div>
        </nav>
      </header>
      <section id="experience" className="relative isolate flex min-h-[min(900px,100svh)] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_15%,#f6ddbe_0%,transparent_45%),radial-gradient(circle_at_85%_10%,#f0b79a_0%,transparent_48%),radial-gradient(circle_at_50%_100%,#e3efec_0%,transparent_55%),#fbf1e3] px-6 pb-14 pt-28 text-center">
        <div className="relative z-10 mx-auto flex max-w-270 flex-col items-center">
          <p className="mb-5 inline-flex rounded-full border border-[#f0c9ae] bg-[#fcebdd] px-4 py-1.5 text-xs uppercase tracking-[0.12em] text-[#e2734f]">A small creative experience</p>
          <h1 className="max-w-3xl font-serif text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.03em]">Tell me who you are. <em className="font-medium text-[#e2734f]">I&apos;ll show you back.</em></h1>
          <p className="mt-5 max-w-xl text-[clamp(1rem,2.2vw,1.18rem)] leading-7 text-[#4c645f]">A few honest answers become one beautiful, personal keepsake.</p>
          <Link href="/create" className="mt-8 inline-flex min-h-14 items-center rounded-full bg-[#1d3a35] px-8 text-base font-semibold text-[#fbf1e3] shadow-[0_24px_55px_-24px_rgba(23,48,43,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(23,48,43,0.38)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Experience it <span aria-hidden="true" className="ml-2 text-lg">&rarr;</span></Link>
          <p className="mt-4 text-xs text-[#4c645f]">Free · No sign-up required · Takes 2 minutes</p>
          <div className="mt-14 flex items-center justify-center gap-3 sm:gap-5" aria-label="A few Polaroid examples"><PreviewCard color="from-[#e8b989] to-[#f3e2c8]" caption="THE DREAMER" rotation="-rotate-6" /><PreviewCard color="from-[#9ac8c2] to-[#ddeeea]" caption="THE BUILDER" rotation="rotate-3 -translate-y-3" /><PreviewCard color="from-[#b9a3de] to-[#eae1f5]" caption="ON REPEAT" rotation="rotate-[8deg]" /></div>
        </div>
        <a href="#journey" aria-label="Scroll to the journey" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.18em] text-[#4c645f]/70 transition hover:text-[#17302b] sm:block">Keep looking <span aria-hidden="true">↓</span></a>
      </section>
      <section id="journey" className="px-6 py-20 sm:py-24"><div className="mx-auto max-w-270"><SectionHeading tag="The journey" title="Four steps, one keepsake" subtitle="No forms. Just a story that unfolds." /><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, description]) => <article key={number} className="border-t border-[#17302b]/15 px-1 py-5 sm:px-4 sm:py-6"><span className="font-serif text-3xl italic text-[#e2734f]">{number}</span><h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#4c645f]">{description}</p></article>)}</div></div></section>
      <section id="worlds" className="bg-white/65 px-6 py-20 sm:py-24"><div className="mx-auto max-w-270"><SectionHeading tag="Pick your world" title="Five worlds to step into" subtitle="Start with the thing you can talk about for hours." /><div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{worlds.map((world) => <Link key={world.name} href={`/create?world=${world.name.toLowerCase()}`} className={`group flex min-h-40 flex-col justify-between rounded-lg bg-linear-to-br ${world.color} p-5 shadow-[0_16px_38px_-28px_rgba(23,48,43,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_-24px_rgba(23,48,43,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]`}><span aria-hidden="true" className="font-serif text-2xl">{world.symbol}</span><span><span className="block font-serif text-xl font-semibold">{world.name}</span><span className="mt-1 block text-xs text-[#17302b]/75">{world.note}</span></span></Link>)}</div></div></section>
      <section id="examples" className="px-6 py-20 sm:py-24"><div className="mx-auto max-w-270"><SectionHeading tag="The reveal" title="A little piece of your world" subtitle="Each keepsake is a one-of-one portrait of what you love." /><div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12">{examples.map((card) => <article key={card.title} className={`w-48 rounded-md bg-[#fffdf8] p-3 pb-6 shadow-[0_24px_55px_-24px_rgba(23,48,43,0.35)] transition duration-300 hover:-translate-y-2 hover:rotate-0 ${card.rotation}`}><div className={`aspect-square rounded-sm bg-linear-to-br ${card.color} p-4`}><div aria-hidden="true" className="h-full w-full rounded-sm border border-white/25 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.42),transparent_24%),linear-gradient(145deg,rgba(23,48,43,0.02),rgba(23,48,43,0.24))]" /></div><h3 className="mt-4 text-center font-serif text-sm font-semibold">{card.title}</h3><p className="mt-1 text-center text-[0.58rem] tracking-[0.14em] text-[#8a7b64]">{card.sub}</p></article>)}</div></div></section>
      <section className="px-6 pb-20 pt-8 text-center sm:pb-24"><h2 className="font-serif text-[clamp(2rem,4.5vw,2.8rem)] font-semibold">Ready to see yours?</h2><Link href="/create" className="mt-6 inline-flex min-h-14 items-center rounded-full bg-[#1d3a35] px-8 text-base font-semibold text-[#fbf1e3] shadow-[0_24px_55px_-24px_rgba(23,48,43,0.28)] transition hover:-translate-y-1 hover:bg-[#284b44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Create yours <span aria-hidden="true" className="ml-2">&rarr;</span></Link></section>
      <footer className="border-t border-[#17302b]/10 px-6 py-8 text-center text-sm text-[#4c645f]">© 2026 Polaroid. A small creative experience.</footer>
    </main>
  );
}

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return <div className="mx-auto max-w-xl text-center"><span className="text-xs uppercase tracking-[0.15em] text-[#e2734f]">{tag}</span><h2 className="mt-3 font-serif text-[clamp(1.8rem,4vw,2.35rem)] font-semibold">{title}</h2><p className="mt-2 text-[#4c645f]">{subtitle}</p></div>;
}
function PreviewCard({ color, caption, rotation }: { color: string; caption: string; rotation: string }) {
  return <div className={`w-[clamp(6rem,22vw,7.5rem)] rounded-md bg-white p-2 pb-4 shadow-[0_24px_55px_-24px_rgba(23,48,43,0.28)] transition duration-300 hover:-translate-y-2 hover:rotate-0 ${rotation}`}><div className={`aspect-square rounded-sm bg-linear-to-br ${color}`} /><p className="mt-2 text-center font-serif text-[0.62rem] tracking-[0.04em]">{caption}</p></div>;
}
