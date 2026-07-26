import React from "react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-100 selection:bg-orange-500 selection:text-white">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
