// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Delicious Recipes That<br />
          <span className="text-amber-400">Actually Lower Uric Acid</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-slate-300">
          I’m Jonathan Kelly. After my first brutal gout flare in November 2025<br />
          I refused to live on boiled chicken and sadness.<br />
          These are the exact meals that keep me 100 % flare-free — and still taste amazing.
        </p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-12 mb-16 max-w-2xl mx-auto">
          <p className="text-4xl font-bold mb-6">50 Gout-Safe Recipes Pack</p>
          <ul className="text-left text-lg space-y-3 mb-8">
            <li>50 restaurant-quality recipes (steak, pasta, curries, desserts)</li>
            <li>All under 300 mg purines per serving</li>
            <li>Shopping lists + 20-minute versions</li>
            <li>Cherry Bomb desserts that drop inflammation overnight</li>
            <li>Lifetime updates</li>
          </ul>
          <p className="text-5xl font-black text-amber-400 mb-8">£37</p>
          <a
            href="https://buy.stripe.com/your-stripe-link-here"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl px-12 py-6 rounded-full transition"
          >
            Download Instantly – Lifetime Access
          </a>
        </div>

        <p className="text-sm text-slate-400">
          127+ gout sufferers already using these recipes • Instant PDF download • 60-day money-back guarantee
        </p>
      </div>
    </main>
  );
}