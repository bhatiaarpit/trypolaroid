import React from "react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Header */}
      <div className="max-w-3xl mb-20 space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          Our Story
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Bringing the magic of tangible photographs back to the digital era.
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
          TryPolaroid was founded by a collective of analog photographers and web engineers who missed the weight, texture, and surprise of instant development film.
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">The Nostalgia Gap</h2>
          <p className="text-zinc-400 leading-relaxed">
            In our modern archives, we accumulate thousands of photos on our phones, yet we rarely look back at them. The tangible photo represents a moment captured in time—something you can pin to a wall, slip into a wallet, or gift to a friend.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Our goal is to make physical photographic art as easy to generate, layout, and share as a standard social post, while keeping the high-fidelity chemical exposure processes that give film its life.
          </p>
        </div>
        <div className="relative aspect-[4/3] bg-zinc-900/30 rounded-2xl border border-zinc-900 overflow-hidden flex items-center justify-center p-8">
          <div className="absolute w-[200px] aspect-[4/5] bg-stone-100 p-3.5 pb-12 rounded shadow-2xl border border-stone-200/50 -rotate-3 animate-float">
            <div className="w-full aspect-square bg-stone-300 overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80" alt="Instant film print" className="w-full h-full object-cover saturate-[0.85] contrast-[1.1]" />
            </div>
            <p className="font-handwriting text-zinc-800 text-lg text-center mt-3">tangible art.</p>
          </div>
        </div>
      </div>

      {/* Core Values Columns */}
      <div className="border-t border-zinc-900 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">1. True Chemical Emulsion</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We avoid standard digital ink prints. We develop our physical cards using direct laser exposure on authentic Fujifilm Instax chemistry to guarantee rich texture and contrast.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">2. Open Customization</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We believe you should have full control over your layout. Rotate pictures, pick custom text colors, adjust vintage grain, and download digital copies for free.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">3. Eco-Conscious Keepsakes</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Our cardstock, boxes, and transit cases are sourced from certified FSC-managed forests and printed with water-based compostable inks.
          </p>
        </div>

      </div>

      {/* Team Section */}
      <div className="border-t border-zinc-900 pt-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Meet the Creators</h2>
          <p className="text-zinc-400">The developers, darkroom operators, and designers behind TryPolaroid.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Team 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto overflow-hidden border-2 border-orange-500/20 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Elena Rostova</h4>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">Founder & Darkroom Lead</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Photochemist with 12 years of experience rebuilding retro instant printers and calibrating darkroom laser arrays.
            </p>
          </div>

          {/* Team 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto overflow-hidden border-2 border-orange-500/20 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Marcus Vance</h4>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">CTO & Core Engineer</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Full-stack engineer, canvas compiler expert, and vintage camera collector. Oversees the API and editor pipeline.
            </p>
          </div>

          {/* Team 3 */}
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto overflow-hidden border-2 border-orange-500/20 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Aiko Tanaka</h4>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">Design & Brand Lead</p>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Visual designer focused on layout systems and typography pairing. Curates preset themes and ink textures.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
