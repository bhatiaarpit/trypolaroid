import React from "react";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🎨",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "Thoughtfully Designed Templates",
    desc: "Every template is crafted for a specific moment — birthdays, weddings, proposals, anniversaries, and more. Start from a design that already knows your story.",
  },
  {
    icon: "📸",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    title: "Photos & Video Galleries",
    desc: "Upload unlimited photos and embed videos. Build stunning galleries, collages, or single hero images that fill the screen with your moment.",
  },
  {
    icon: "🎵",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    title: "Background Music",
    desc: "Set the emotional tone with a custom soundtrack. Upload your own audio or link from Spotify — music starts automatically when your page opens.",
  },
  {
    icon: "📅",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    title: "Interactive Timelines",
    desc: "Tell your story in order. Animated, scrollable timelines let visitors relive events step by step — perfect for anniversary stories and travel journals.",
  },
  {
    icon: "✍️",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "Personal Messages",
    desc: "Write heartfelt notes, dedications, and captions. Use rich text formatting to make every word feel as intentional as the moment itself.",
  },
  {
    icon: "🔗",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Unique Shareable Links",
    desc: "Every page gets its own beautiful, custom URL. Share via WhatsApp, email, or social media — no app download needed for viewers.",
  },
  {
    icon: "🌐",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Publish Anywhere",
    desc: "Pages are mobile-first and load instantly on any device. Your guest opens a link and is immediately immersed — no friction.",
  },
  {
    icon: "🔒",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    title: "Password Protection",
    desc: "Keep your page private with a password. Share only with the people you intend. Perfect for intimate moments like proposals and surprise parties.",
  },
  {
    icon: "✨",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    title: "No Skills Required",
    desc: "A guided, visual editor means anyone can create something stunning in minutes. If you can type a message, you can build a beautiful page.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Header */}
      <div className="max-w-3xl mb-20 space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          The Toolset
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Everything you need to make a moment unforgettable.
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
          TryPolaroid gives you powerful tools wrapped in a simple editor — so you can focus on the story, not the software.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 transition-colors space-y-4"
          >
            <div className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} ${f.color} flex items-center justify-center text-2xl`}>
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{f.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Two-Column Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-zinc-900 pt-20">

        {/* Visual */}
        <div className="relative aspect-[4/3] bg-zinc-900/30 rounded-2xl border border-zinc-900 overflow-hidden p-8 flex items-center justify-center">
          {/* Floating page cards */}
          <div className="absolute w-52 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-2xl -rotate-6 -translate-x-16 animate-float">
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80" alt="Birthday page" className="w-full h-full object-cover opacity-80" />
            </div>
            <p className="text-xs font-semibold text-white">🎂 Happy Birthday, Mia!</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">trypolaroid.com/mia25</p>
          </div>
          <div className="absolute w-52 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-500/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(249,115,22,0.12)] rotate-4 translate-x-16 translate-y-6 [animation-delay:3s] animate-float">
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" alt="Wedding" className="w-full h-full object-cover opacity-80" />
            </div>
            <p className="text-xs font-semibold text-white">💒 Our Wedding Day</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">trypolaroid.com/forever</p>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Personal, immersive, and easy to share.
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Every page you create on TryPolaroid is designed to feel like it was made just for that one person — because it was. We obsess over the details so your recipient gets an experience that feels truly special, not like a generic e-card.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Whether it&apos;s a surprise birthday reveal, a wedding invitation that plays your song, or a travel journal that takes friends through your adventure — TryPolaroid brings your vision to life.
          </p>
          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 active:scale-95 text-white font-bold rounded-full transition-all text-sm shadow-lg shadow-orange-500/20"
            >
              Start Creating for Free
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
