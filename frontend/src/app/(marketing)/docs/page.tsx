"use client";

import React, { useState } from "react";

const DOCS_SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { id: "intro", title: "Introduction" },
      { id: "workspace", title: "Using the Workspace" },
      { id: "resolutions", title: "Optimal Resolutions" },
    ],
  },
  {
    id: "customization",
    title: "Customization Guides",
    items: [
      { id: "filters", title: "Analog Filter Grades" },
      { id: "captions", title: "Caption Typography" },
      { id: "borders", title: "Paper & Border Types" },
    ],
  },
  {
    id: "printing-shipping",
    title: "Physical Printing",
    items: [
      { id: "exposure", title: "How Exposing Works" },
      { id: "shipping", title: "Packaging & Shipping" },
    ],
  },
  {
    id: "developer-api",
    title: "Developer API",
    items: [
      { id: "auth", title: "Authentication" },
      { id: "endpoint", title: "Generate Polaroid Endpoint" },
    ],
  },
];

export default function DocsPage() {
  const [activeItem, setActiveItem] = useState("intro");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sidebar Menu (3 cols) */}
        <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-28">
          {DOCS_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        activeItem === item.id
                          ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Right Content Area (9 cols) */}
        <main className="lg:col-span-9 p-8 rounded-3xl bg-zinc-900/20 border border-zinc-900 min-h-[500px]">
          
          {activeItem === "intro" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Introduction</h1>
              <p className="text-zinc-300 leading-relaxed">
                Welcome to the TryPolaroid Documentation. TryPolaroid is a premium digital-analog platform that helps creators, designers, and curators convert standard digital photos into authentic Polaroid prints.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                You can configure custom borders, write handwritten messages using ink-simulated fonts, apply vintage grain filters, and download high-resolution copies for free or order boxed physical sets.
              </p>
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15 text-orange-400 text-sm leading-relaxed">
                <strong>Looking to build?</strong> Head over to the <button onClick={() => setActiveItem("endpoint")} className="underline font-bold text-orange-400 cursor-pointer">Generate Endpoint</button> section to programmatically create Polaroids via our API.
              </div>
            </div>
          )}

          {activeItem === "workspace" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Using the Workspace</h1>
              <p className="text-zinc-300 leading-relaxed">
                The TryPolaroid workspace contains a real-time vector canvas. Once you create a project, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm">
                <li>Drag and drop images onto the canvas center.</li>
                <li>Zoom, pan, and rotate photos inside the square viewport.</li>
                <li>Write captions on the classic white border strip.</li>
                <li>Save drafts to your personal workspace to edit later.</li>
              </ul>
            </div>
          )}

          {activeItem === "resolutions" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Optimal Resolutions</h1>
              <p className="text-zinc-300 leading-relaxed">
                For both digital exports and physical Fujifilm exposures, image quality depends on input resolution.
              </p>
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="py-3 font-semibold">Format</th>
                    <th className="py-3 font-semibold">Target Size</th>
                    <th className="py-3 font-semibold">Recommended DPI</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-850">
                    <td className="py-3.5">Digital Web Export</td>
                    <td className="py-3.5">600 × 720 px</td>
                    <td className="py-3.5">72 DPI</td>
                  </tr>
                  <tr className="border-b border-zinc-850">
                    <td className="py-3.5">High-Res Print Export</td>
                    <td className="py-3.5">1800 × 2160 px</td>
                    <td className="py-3.5">300 DPI</td>
                  </tr>
                  <tr>
                    <td className="py-3.5">Physical Chemical Instax</td>
                    <td className="py-3.5">2400 × 2880 px</td>
                    <td className="py-3.5">320 DPI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeItem === "filters" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Analog Filter Grades</h1>
              <p className="text-zinc-300 leading-relaxed">
                We provide five default color grades mapped to historical instant camera models:
              </p>
              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li><strong>70s Vintage:</strong> Soft sepia tints, reduced midtone contrast, and warm yellow highlights.</li>
                <li><strong>B&W Chrome:</strong> Deep obsidian blacks, silver halide grain emulation, and bright white points.</li>
                <li><strong>Warm Chrome:</strong> Mild orange hue rotation and increased saturation for sunset/beach captures.</li>
                <li><strong>Cool Indigo:</strong> Boosted cyan shadows, soft highlights, and retro low exposure.</li>
              </ul>
            </div>
          )}

          {activeItem === "captions" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Caption Typography</h1>
              <p className="text-zinc-300 leading-relaxed">
                The classic Polaroid relies on handwriting to tell its story. Our canvas supports:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm">
                <li>Ink thickness adjustment (Fine pen vs. Bold permanent marker).</li>
                <li>Ink color variations (Obsidian black, Indigo blue, Retro red).</li>
                <li>Rotation variables to emulate natural human writing slants.</li>
              </ul>
            </div>
          )}

          {activeItem === "borders" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Paper & Border Types</h1>
              <p className="text-zinc-300 leading-relaxed">
                Choose the frame style that matches your photo's energy:
              </p>
              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li><strong>Classic White:</strong> Genuine crisp cardstock border with a matte texture.</li>
                <li><strong>Vintage Distressed:</strong> Worn edges, light water-stains, and retro chemical burns.</li>
                <li><strong>Dark Matte:</strong> Deep charcoal paper that highlights neon and starry night frames.</li>
              </ul>
            </div>
          )}

          {activeItem === "exposure" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">How Exposing Works</h1>
              <p className="text-zinc-300 leading-relaxed">
                Unlike consumer photo labs that print ink onto sheets, TryPolaroid uses vintage chemical-exposing procedures.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                When you order physical prints, we use specialized laser exposure units to write light directly onto genuine Fujifilm Instax chemical emulsion sheets. The sheets are then crushed through mechanical rollers, breaking development reagent pods to organically develop the dye layers over 3 minutes.
              </p>
            </div>
          )}

          {activeItem === "shipping" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Packaging & Shipping</h1>
              <p className="text-zinc-300 leading-relaxed">
                Physical cards are highly delicate. To ensure they reach you in museum condition, each pack is shipped in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm">
                <li>UV-blocking dark paper foil sleeves to prevent exposure fading.</li>
                <li>Rigid retro kraft keepsake boxes with magnetic snaps.</li>
                <li>Waterproof padded transit envelopes.</li>
              </ul>
            </div>
          )}

          {activeItem === "auth" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Authentication</h1>
              <p className="text-zinc-300 leading-relaxed">
                To run API calls, retrieve your token from your project settings dashboard under <strong>Settings &gt; Developer API</strong>. All headers should be passed as standard Bearer tokens:
              </p>
              <pre className="p-4 rounded-xl bg-zinc-950 text-orange-400 text-xs font-mono overflow-x-auto border border-zinc-900">
                Authorization: Bearer tp_prod_sk_xxxxxx...
              </pre>
            </div>
          )}

          {activeItem === "endpoint" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-white">Generate Polaroid Endpoint</h1>
              <p className="text-zinc-300 leading-relaxed">
                Make a `POST` request to programmatically generate framed polaroid images:
              </p>
              <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900 space-y-2">
                <div><span className="text-emerald-400">POST</span> https://api.trypolaroid.com/v1/polaroid</div>
              </pre>
              <p className="text-sm text-zinc-400">Request Body JSON payload:</p>
              <pre className="p-4 rounded-xl bg-zinc-950 text-orange-300 text-xs font-mono overflow-x-auto border border-zinc-900">
{`{
  "imageUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  "caption": "Golden Hour 🌅",
  "filter": "vintage_70s",
  "border": "classic_white",
  "resolution": "300dpi"
}`}
              </pre>
              <p className="text-sm text-zinc-400">Example Request via curl:</p>
              <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 text-xs font-mono overflow-x-auto border border-zinc-900">
{`curl -X POST https://api.trypolaroid.com/v1/polaroid \\
  -H "Authorization: Bearer tp_prod_sk_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "imageUrl": "https://images.unsplash.com/...jpg",
    "caption": "Summer Trip",
    "filter": "vintage_70s"
  }'`}
              </pre>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
