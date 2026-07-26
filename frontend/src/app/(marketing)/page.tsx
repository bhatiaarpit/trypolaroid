export default function ComingSoon() {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-10
      text-[#dfeeeb] [font-family:'JetBrains_Mono',ui-monospace,monospace]
      [background-image:radial-gradient(circle_at_50%_0%,#12161a,#0a0d10_65%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
      [background-size:auto,28px_28px,28px_28px]"
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#64726f]">
        <span className="h-1.5 w-1.5 animate-[blink_1.6s_ease-in-out_infinite] rounded-full bg-[#3ddc84] shadow-[0_0_6px_1px_#3ddc84]" />
        status: building
      </div>

      <div className="w-[300px] animate-[rise_700ms_ease-out] overflow-hidden rounded-md border border-[#4ce0c0]/25 bg-[#14181c] shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_24px_40px_-20px_rgba(0,0,0,0.6),0_0_30px_-8px_rgba(76,224,192,0.15)]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/[0.18]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/[0.18]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/[0.18]" />
          <span className="ml-1.5 text-[11px] tracking-[0.04em] text-[#64726f]">
            trypolariod..
          </span>
        </div>

        {/* panel */}
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#0c0f11]
          [background-image:linear-gradient(rgba(76,224,192,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(76,224,192,0.09)_1px,transparent_1px)]
          [background-size:18px_18px]"
        >
          <svg
            className="relative z-10 text-[#4ce0c0] opacity-85"
            width="200"
            height="200"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="14" y="10" width="92" height="112" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="24" y="20" width="72" height="72" rx="2" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
            <line x1="60" y1="20" x2="60" y2="28" stroke="currentColor" strokeWidth="1.4" />
            <line x1="60" y1="84" x2="60" y2="92" stroke="currentColor" strokeWidth="1.4" />
            <line x1="24" y1="56" x2="32" y2="56" stroke="currentColor" strokeWidth="1.4" />
            <line x1="88" y1="56" x2="96" y2="56" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="60" cy="56" r="3" stroke="currentColor" strokeWidth="1.4" />
            <line x1="34" y1="104" x2="86" y2="104" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
            <line x1="42" y1="112" x2="78" y2="112" stroke="currentColor" strokeWidth="1.6" opacity="0.3" />
          </svg>

          <span className="absolute left-2.5 top-2 z-10 text-[10px] tracking-[0.06em] text-[#64726f]">
            X:042
          </span>
          <span className="absolute bottom-2 right-2.5 z-10 text-[10px] tracking-[0.06em] text-[#64726f]">
            Y:118
          </span>

          <div className="absolute inset-x-0 top-0 h-0.5 animate-[sweep_3.2s_linear_infinite] bg-[linear-gradient(90deg,transparent,#4ce0c0,transparent)] shadow-[0_0_10px_1px_#4ce0c0]" />
        </div>

        {/* caption */}
        <div className="border-t border-white/[0.06] px-4 pb-[22px] pt-5">
          <div className="text-xl font-bold tracking-[0.02em]">
            coming soon
            <span className="ml-1 inline-block h-[18px] w-[9px] translate-y-[3px] animate-[blink_1s_step-end_infinite] bg-[#4ce0c0]" />
          </div>
          <div className="mt-2 text-xs leading-relaxed text-[#64726f]">
            // compiling something worth the wait
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sweep {
          0%   { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}