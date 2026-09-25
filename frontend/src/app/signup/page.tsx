"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const optionClass = "flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#17302b]/20 bg-white/65 px-5 text-sm font-medium text-[#17302b] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Account creation is not connected yet. You can still try the experience as a guest.");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbf1e3] px-5 py-12 text-[#17302b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,#f6ddbe_0%,transparent_38%),radial-gradient(circle_at_88%_85%,#e3efec_0%,transparent_42%)]" />
      <section className="relative w-full max-w-110 text-center">
        <Link href="/" className="font-serif text-2xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Polaroid</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.16em] text-[#e2734f]">Keep your little piece</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold">Come on in.</h1>
        <p className="mt-3 text-sm leading-6 text-[#4c645f]">Sign in or create an account to keep your Polaroids together.</p>

        <div className="mt-8 space-y-3">
          <button type="button" onClick={() => setMessage("Google sign-in will be available in a later milestone.")} className={optionClass}><span aria-hidden="true" className="font-semibold text-base">G</span>Continue with Google</button>
          <button type="button" onClick={() => setMessage("Apple sign-in will be available in a later milestone.")} className={optionClass}><span aria-hidden="true" className="text-lg">●</span>Continue with Apple</button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-[#4c645f]/75"><span className="h-px flex-1 bg-[#17302b]/15" />or with email<span className="h-px flex-1 bg-[#17302b]/15" /></div>
        <form onSubmit={submitEmail} className="text-left">
          <label htmlFor="signup-email" className="text-sm text-[#4c645f]">Email address</label>
          <input id="signup-email" type="email" autoComplete="email" required placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-[#17302b]/15 bg-white/60 px-4 text-sm outline-none transition placeholder:text-[#4c645f]/45 focus:border-[#e2734f] focus:ring-2 focus:ring-[#e2734f]/15" />
          <button type="submit" className="mt-4 min-h-12 w-full rounded-full bg-[#1d3a35] px-6 text-sm font-semibold text-[#fbf1e3] transition hover:bg-[#284b44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2734f]">Continue with email</button>
        </form>

        {message && <p role="status" className="mt-4 rounded-lg bg-white/60 px-4 py-3 text-sm leading-5 text-[#4c645f]">{message}</p>}
        <p className="mt-7 text-sm text-[#4c645f]">Just looking? <Link href="/create" className="font-semibold text-[#17302b] underline decoration-[#e2734f] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#e2734f]">Continue as a guest</Link></p>
        <Link href="/" className="mt-8 inline-block text-xs text-[#4c645f]/75 transition hover:text-[#17302b]">Back to Polaroid</Link>
      </section>
    </main>
  );
}