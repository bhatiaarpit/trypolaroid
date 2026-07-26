"use client";

import React, { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "How are the physical prints developed?",
    a: "We expose your customized photos directly onto actual Fujifilm Instax chemical film cardstock in our darkrooms, rather than just printing ink onto cheap paper. They develop organically, giving them authentic vintage contrast, soft light leaks, and a high-gloss tactile feel.",
  },
  {
    q: "What is the delivery time for physical prints?",
    a: "We package and dispatch your custom Polaroid keepsake box within 24 hours of ordering. Express shipping takes 3-5 business days globally, while standard shipping takes 7-10 business days.",
  },
  {
    q: "Can I download my digital Polaroids for free?",
    a: "Yes! The Digital Free plan allows you to download up to 5 web-quality Polaroid-framed photos per month. The Digital Pro plan unlocks unlimited downloads in high-resolution 300 DPI print-ready quality.",
  },
  {
    q: "Do you support custom captions and custom handwriting?",
    a: "Absolutely. You can choose from our library of curated handwritten and marker typefaces, change ink colors, resize text, and position captions on the classic white lower border.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400">
          Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tangible Memories, Simple Pricing.
        </h1>
        <p className="text-zinc-400">
          Download high-res digital frames for free, or order beautifully boxed packages of physical Fujifilm Polaroids shipped to your door.
        </p>

        {/* Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold transition-colors ${billingPeriod === "monthly" ? "text-white" : "text-zinc-500"}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className="w-14 h-7 rounded-full bg-zinc-900 border border-zinc-800 p-0.5 flex items-center relative transition-colors cursor-pointer"
          >
            <div 
              className={`w-6 h-6 rounded-full bg-orange-500 transition-transform ${
                billingPeriod === "yearly" ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-white" : "text-zinc-500"}`}>
            Yearly
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
        
        {/* Tier 1: Free Digital */}
        <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-900 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Digital Free</h3>
              <p className="text-xs text-zinc-400">Perfect for casual digital creators.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-sm text-zinc-500 font-semibold">/ month</span>
            </div>
            <hr className="border-zinc-800" />
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                5 digital exports / month
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Standard web resolution
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Classic 1:1 Polaroid border
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500 line-through">
                High-resolution 300 DPI exports
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500 line-through">
                Access to premium layouts & scripts
              </li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold rounded-full transition-all text-center text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Tier 2: Digital Pro (Featured) */}
        <div className="p-8 rounded-3xl bg-zinc-900/50 border-2 border-orange-500/50 relative flex flex-col justify-between space-y-8 shadow-xl shadow-orange-500/5">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-black text-[10px] font-extrabold tracking-widest uppercase rounded-full">
            Most Popular
          </span>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Digital Pro</h3>
              <p className="text-xs text-zinc-400">For serious memory keepers & creators.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">
                {billingPeriod === "monthly" ? "$9.99" : "$7.99"}
              </span>
              <span className="text-sm text-zinc-500 font-semibold">/ month</span>
            </div>
            <hr className="border-zinc-850" />
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited digital exports
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                300 DPI high-res print quality
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                All border layouts & collage grids
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Developer API Access
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                10% discount on physical print boxes
              </li>
            </ul>
          </div>
          <Link
            href="/register?plan=pro"
            className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 font-bold rounded-full transition-all text-center text-sm shadow-md"
          >
            Upgrade to Pro
          </Link>
        </div>

        {/* Tier 3: Physical Box Pack */}
        <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-900 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Physical Print Pack</h3>
              <p className="text-xs text-zinc-400">Real, boxed Fujifilm Polaroids.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$19.99</span>
              <span className="text-sm text-zinc-500 font-semibold">/ pack (one-time)</span>
            </div>
            <hr className="border-zinc-800" />
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                15 Physical Polaroid prints
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Genuine Fujifilm Instax Cardstock
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Classic keepsake cardboard box
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Global shipping (tracked)
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Includes unlimited digital saves
              </li>
            </ul>
          </div>
          <Link
            href="/dashboard?checkout=physical"
            className="w-full py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold rounded-full transition-all text-center text-sm"
          >
            Order Print Box
          </Link>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto border-t border-zinc-900 pt-20">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
          Pricing FAQ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {FAQS.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-bold text-white text-base">{faq.q}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
