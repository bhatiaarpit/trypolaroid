"use client";

import React, { useState } from "react";
import Link from "next/link";

const TEMPLATES = [
  {
    id: "birthday-surprise",
    name: "Birthday Surprise",
    category: "Celebration",
    emoji: "🎂",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=500&q=80",
    desc: "A joyful, animated page with photo galleries, a countdown, and a personal message reveal.",
    accentColor: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/20",
    textColor: "text-pink-400",
  },
  {
    id: "anniversary-story",
    name: "Anniversary Story",
    category: "Love",
    emoji: "❤️",
    img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=500&q=80",
    desc: "A romantic timeline walking through your journey together, with music and memorable photos.",
    accentColor: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/20",
    textColor: "text-red-400",
  },
  {
    id: "wedding-invite",
    name: "Wedding Invitation",
    category: "Wedding",
    emoji: "💒",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
    desc: "An elegant, immersive wedding invite with RSVP, venue map, and a love story section.",
    accentColor: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/20",
    textColor: "text-amber-400",
  },
  {
    id: "proposal",
    name: "Proposal Experience",
    category: "Love",
    emoji: "💍",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=80",
    desc: "Build up to the big question with a story, photos, and the perfect moment to pop the question.",
    accentColor: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    textColor: "text-violet-400",
  },
  {
    id: "travel-journal",
    name: "Travel Journal",
    category: "Adventure",
    emoji: "🌍",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500&q=80",
    desc: "A scrollable, photo-rich travel story with map highlights and city-by-city breakdowns.",
    accentColor: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/20",
    textColor: "text-teal-400",
  },
  {
    id: "graduation",
    name: "Graduation Celebration",
    category: "Milestone",
    emoji: "🎓",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80",
    desc: "Celebrate the achievement with a proud tribute page full of memories, milestones, and messages.",
    accentColor: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-400",
  },
  {
    id: "baby-announcement",
    name: "Baby Announcement",
    category: "Family",
    emoji: "👶",
    img: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=500&q=80",
    desc: "Share the news in the sweetest way possible — a page with the due date, gender reveal, and more.",
    accentColor: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/20",
    textColor: "text-orange-400",
  },
  {
    id: "farewell",
    name: "Farewell Message",
    category: "Milestone",
    emoji: "✈️",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
    desc: "A heartfelt goodbye page with team photos, memories, and a message wall from everyone.",
    accentColor: "from-sky-500/20 to-blue-500/20",
    borderColor: "border-sky-500/20",
    textColor: "text-sky-400",
  },
  {
    id: "memory-book",
    name: "Memory Book",
    category: "Personal",
    emoji: "📖",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    desc: "A rich, scrapbook-style page to collect and celebrate years of shared memories and photographs.",
    accentColor: "from-fuchsia-500/20 to-pink-500/20",
    borderColor: "border-fuchsia-500/20",
    textColor: "text-fuchsia-400",
  },
];

const CATEGORIES = ["All", "Celebration", "Love", "Wedding", "Milestone", "Adventure", "Family", "Personal"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          Ready-Made Templates
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Start with the perfect template
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Every template is designed for a specific moment. Pick one, personalize it, and share something truly beautiful.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-white text-black"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
          <svg className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="flex flex-col rounded-2xl bg-zinc-900/30 border border-zinc-900 overflow-hidden hover:border-zinc-800 transition-all group hover:-translate-y-1 duration-200"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tpl.img}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                {/* Category + Emoji badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-lg">{tpl.emoji}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-zinc-950/70 border ${tpl.borderColor} ${tpl.textColor}`}>
                    {tpl.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">{tpl.name}</h3>
                  <p className="text-sm text-zinc-400 leading-normal">{tpl.desc}</p>
                </div>

                <div className="pt-2 mt-auto">
                  <Link
                    href={`/dashboard?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 active:scale-95 rounded-xl text-sm font-bold text-white transition-all"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-900 rounded-3xl">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-white mb-1">No templates found</h3>
          <p className="text-sm text-zinc-500">Try refining your search or changing the category.</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center mt-16 pt-16 border-t border-zinc-900">
        <p className="text-zinc-400 mb-4">Don&apos;t see what you need? Start from scratch.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-white font-semibold rounded-full transition-all text-sm"
        >
          Create a Custom Page
        </Link>
      </div>

    </div>
  );
}
