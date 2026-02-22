import Link from 'next/link'
import Head from 'next/head'

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">💊</span>
              <span className="text-2xl font-bold text-blue-600">MedFinder</span>
            </Link>
            <Link href="/app" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Get Started
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">How MedFinder Works</h1>
            <p className="text-xl text-gray-600">Save up to 67% in 4 simple steps</p>
          </div>

          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h2 className="text-3xl font-bold mb-4">Scan Your Prescription</h2>
                <p className="text-gray-700 text-lg mb-6">
                  Take a photo of your prescription with your phone camera, upload an image, or enter drug details manually. 
                  Our OCR technology extracts the information instantly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Works with any prescription format</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Automatic text extraction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Manual entry option available</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-12 text-center">
                <div className="text-8xl mb-4">📸</div>
                <div className="text-gray-700 font-semibold">Upload or Scan</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-12 text-center">
                <div className="text-8xl mb-4">💰</div>
                <div className="text-gray-700 font-semibold">Real-Time Comparison</div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h2 className="text-3xl font-bold mb-4">Compare Prices</h2>
                <p className="text-gray-700 text-lg mb-6">
                  We instantly search nearby pharmacies and show you a comparison table with prices, distances, 
                  and stock availability. Sort by lowest price or nearest location.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Compare 4+ pharmacies instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>See generic vs brand prices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Check stock availability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h2 className="text-3xl font-bold mb-4">Choose Your Pharmacy</h2>
                <p className="text-gray-700 text-lg mb-6">
                  Select the best option based on price, distance, and convenience. View insurance estimates 
                  and see exactly how much you'll save.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Insurance copay estimates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>FDA drug safety information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Open/closed status</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-12 text-center">
                <div className="text-8xl mb-4">✅</div>
                <div className="text-gray-700 font-semibold">Select Best Option</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-12 text-center">
                <div className="text-8xl mb-4">🗺️</div>
                <div className="text-gray-700 font-semibold">Navigate & Save</div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h2 className="text-3xl font-bold mb-4">Navigate & Save</h2>
                <p className="text-gray-700 text-lg mb-6">
                  Tap the navigation button to get turn-by-turn directions to your chosen pharmacy. 
                  Present your prescription and save money!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>One-tap navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Google Maps integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Save up to 67% on average</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl mb-8">The entire process takes less than 2 minutes</p>
            <Link href="/app" className="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              Compare Prices Now →
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
