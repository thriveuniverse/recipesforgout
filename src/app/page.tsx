import { Calculator } from "@/components/calculator";
import { RecipeList } from "@/components/recipe-list";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/data/recipes";     
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Delicious Recipes That<br />
          <span className="text-amber-400">Actually Lower Uric Acid</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-4xl mx-auto">
          I’m Jonathan Kelly. After my first brutal gout flare in November 2025<br />
          I <strong className="text-amber-300">refused to live on boiled chicken and sadness</strong>
          .<br />
          These are the exact meals that keep me <strong className="text-amber-300">100 % flare-free</strong> — and still taste incredible.
        </p>
      </section>

      {/* Interactive Calculator – the new hero feature */}
      <section className="bg-white/5 backdrop-blur-lg py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Find Your Perfect Gout-Safe Meal in 10 Seconds
          </h2>
          <Calculator />
        </div>
      </section>

      {/* Quick preview of recipes */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Some of the 50+ Recipes You’ll Unlock
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(0, 6).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/recipes"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl px-12 py-6 rounded-full transition"
          >
            Browse All 50+ Recipes
          </Link>
        </div>
      </section>

      {/* Original sales box – lower down the page */}
      <section className="bg-white/10 backdrop-blur py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-12">
            <p className="text-4xl font-bold mb-6">50 Gout-Safe Recipes Pack</p>
            <ul className="text-left text-lg space-y-3 mb-8 max-w-2xl mx-auto">
              <li>50 restaurant-quality recipes (steak, pasta, curries, desserts)</li>
              <li>All under 300 mg purines per serving</li>
              <li>Shopping lists + 20-minute quick versions</li>
              <li>Cherry Bomb desserts that drop inflammation overnight</li>
              <li>Lifetime updates • Instant PDF download</li>
            </ul>
            <p className="text-5xl font-black text-amber-400 mb-8">£37</p>
            <a
              href="https://buy.stripe.com/your-stripe-link-here"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl px-12 py-6 rounded-full transition"
            >
              Download Instantly – Lifetime Access
            </a>
            <p className="text-sm text-slate-400 mt-6">
              127+ gout sufferers already flare-free • 60-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}