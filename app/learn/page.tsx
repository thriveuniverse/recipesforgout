import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookOpen, AlertCircle, Heart, Droplet, Activity, Apple } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center space-y-4">
            <BookOpen className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Understanding Gout</h1>
            <p className="text-xl text-blue-100">
              Learn about gout management, purines, and how diet can help
            </p>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 border-y border-amber-200 py-6">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-1">Medical Disclaimer</p>
                <p>
                  This content is for informational purposes only and is NOT medical advice.
                  Gout triggers vary by individual. Always consult with a healthcare
                  professional before making dietary changes, especially if you have kidney
                  disease, diabetes, or are taking medications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
          {/* What is Gout */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Gout?</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Gout is a form of inflammatory arthritis caused by high levels of uric acid
                in the blood (hyperuricemia). When uric acid levels become too high, sharp
                crystals can form in joints, leading to sudden, severe pain, swelling, and
                redness.
              </p>
              <p>
                Gout attacks often affect the big toe but can occur in other joints like
                ankles, knees, elbows, and fingers. Without management, gout can lead to
                chronic joint damage and other health complications.
              </p>
            </div>
          </section>

          {/* Understanding Purines */}
          <section className="bg-teal-50 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <Activity className="h-8 w-8 text-teal-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Understanding Purines</h2>
                <p className="text-gray-700 text-lg">
                  Purines are natural compounds found in many foods. When your body breaks
                  down purines, it produces uric acid as a byproduct.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  🟢 Low-Purine Foods (&lt;150mg per serving)
                </h3>
                <p className="text-gray-700">
                  Most vegetables, fruits, whole grains, eggs, low-fat dairy, nuts, and seeds.
                  These can be consumed regularly and form the foundation of a gout-friendly diet.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 mb-2">
                  🟡 Moderate-Purine Foods (150-300mg per serving)
                </h3>
                <p className="text-gray-700">
                  Some meats (chicken, turkey), certain fish, and legumes. These should be
                  consumed in moderation and with portion control.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">
                  🔴 High-Purine Foods (&gt;300mg per serving)
                </h3>
                <p className="text-gray-700">
                  Organ meats, shellfish, certain fish (anchovies, sardines), and beer. These
                  should be avoided or consumed very rarely.
                </p>
              </div>
            </div>
          </section>

          {/* Diet Tips */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <Apple className="h-8 w-8 text-teal-600 flex-shrink-0" />
              <h2 className="text-3xl font-bold text-gray-900">Dietary Strategies for Gout Management</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Emphasize Low-Purine Foods</h3>
                    <p className="text-gray-700 text-sm">
                      Build meals around vegetables, fruits, whole grains, and low-fat dairy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplet className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Stay Hydrated</h3>
                    <p className="text-gray-700 text-sm">
                      Drink 8-12 cups of water daily to help flush uric acid from your system.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Maintain Healthy Weight</h3>
                    <p className="text-gray-700 text-sm">
                      Gradual weight loss can help reduce uric acid levels. Avoid crash diets.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Foods to Limit or Avoid</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Organ meats (liver, kidney, sweetbreads)</li>
                    <li>• Shellfish (shrimp, lobster, crab)</li>
                    <li>• Certain fish (anchovies, sardines, mackerel)</li>
                    <li>• Beer and spirits</li>
                    <li>• High-fructose corn syrup</li>
                    <li>• Sugary beverages</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-900 mb-2">Beneficial Foods</h3>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• Cherries and berries</li>
                    <li>• Vitamin C-rich foods</li>
                    <li>• Low-fat dairy products</li>
                    <li>• Complex carbohydrates</li>
                    <li>• Coffee (in moderation)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How Our Recipes Help */}
          <section className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Recipes Help</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Every recipe on RecipesForGout.com has been designed with gout management in mind:
              </p>
              <ul className="space-y-2 mt-4">
                <li>
                  <strong>Purine Calculations:</strong> Each recipe includes precise purine
                  content per serving, calculated from ingredient-level data.
                </li>
                <li>
                  <strong>Low-Purine Focus:</strong> Most recipes contain less than 150mg of
                  purines per serving, making them safe for regular consumption.
                </li>
                <li>
                  <strong>Nutritional Balance:</strong> Recipes provide adequate protein,
                  fiber, and essential nutrients while managing purine intake.
                </li>
                <li>
                  <strong>Clear Labeling:</strong> Color-coded badges and detailed
                  nutritional information help you make informed choices.
                </li>
                <li>
                  <strong>Flexible Options:</strong> Ingredient swap suggestions allow you to
                  adapt recipes to your preferences and triggers.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
