// src/app/page.tsx
import Image from "next/image";
import { Calculator } from "@/components/calculator";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/data/recipes";

export default function Home() {
  return (
    <main className="min-h-screen bg-beige">
      {/* HERO */}
      <section className="bg-emerald-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Delicious Recipes That<br />
            <span className="text-coral">Actually Lower Uric Acid</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto mt-16">
            <div className="w-56 h-56 rounded-full overflow-hidden ring-8 ring-white/30 shadow-2xl">
              <Image
                src="/images/jonathan.jpg"
                alt="Jonathan Kelly"
                width={160}
                height={160}
                className="object-cover"
                priority
              />
            </div>

            <div className="text-center md:text-left max-w-lg">
              <p className="text-xl md:text-2xl leading-relaxed">
                I’m Jonathan Kelly. After my first brutal gout flare in November 2025,
                <strong className="text-coral block mt-6 text-3xl">
                  I refused to live on boiled chicken and sadness.
                </strong>
                <span className="block mt-6 text-2xl">
                  These are the exact meals that keep me <strong className="text-coral">100 % flare-free</strong> — and still taste incredible.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR — SAME WIDTH AS HERO */}
      <section className="py-20 bg-gradient-to-b from-beige to-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal mb-12">
            Find Your Perfect Gout-Safe Meal in 10 Seconds
          </h2>
          <Calculator />
        </div>
      </section>

      {/* RECIPE PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            Some of the 50+ Recipes You’ll Unlock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            {recipes.slice(0, 6).map((recipe) => (
              <div key={recipe.id} className="w-full max-w-sm">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
<section className="py-24">
  <div className="max-w-4xl mx-auto px-6">
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border-4 border-coral/20 text-center">
      <h2 className="text-5xl font-black text-charcoal mb-8">
        50 Gout-Safe Recipes Pack
      </h2>
      <p className="text-xl text-charcoal/80 mb-12 leading-relaxed max-w-2xl mx-auto">
        Restaurant-quality meals • All under 300 mg purines • Shopping lists • 20-minute versions • Cherry Bomb desserts • Lifetime updates
      </p>
      <div className="text-7xl font-black text-coral mb-10">$37</div>

      <a
        href="https://buy.stripe.com/your-link-here"
        className="inline-block w-full max-w-md mx-auto px-8 py-6 text-2xl font-bold text-white bg-coral rounded-2xl shadow-xl hover:bg-coral/90 transform hover:-translate-y-1 transition-all"
      >
        Download Instantly – Lifetime Access
      </a>

      <p className="text-sm text-charcoal/70 mt-8">
        127+ gout sufferers already flare-free • Instant PDF download • 60-day money-back guarantee
      </p>
    </div>
  </div>
</section>

      <footer className="bg-charcoal text-beige py-10 text-center">
        © 2025 RecipesForGout • Not medical advice • Made with stubborn hope in the UK
      </footer>
    </main>
  );
}