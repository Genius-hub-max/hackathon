import Link from 'next/link'
import Head from 'next/head'

export default function Landing() {
  return (
    <>
      <Head>
        <title>MedFinder - Save Up to 67% on Prescriptions</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💊</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">MedFinder</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition">FAQ</Link>
            </nav>
            <Link href="/app" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            ✨ Save up to 70% on medicines across India
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the Best Price for<br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Your Medicines</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare prices across pharmacies in India, get insurance estimates, and navigate to the cheapest option — all in under 2 minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl">
              Sign In
            </Link>
            <Link href="/signup" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition border-2 border-gray-200">
              Sign Up Free
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-600">
            <div>✓ FDA-Verified Data</div>
            <div>✓ Free to Use</div>
            <div>✓ No Sign-Up Required</div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">70%</div>
              <div className="text-gray-600 mt-2">Average Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">2 min</div>
              <div className="text-gray-600 mt-2">Time to Compare</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-2">Pharmacies in India</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 mt-2">Free Forever</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Everything You Need to Save</h2>
          <p className="text-center text-gray-600 mb-12">Powerful features to help you find affordable prescriptions</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Scan Prescriptions</h3>
              <p className="text-gray-600">Upload or scan your prescription with your phone camera. Our OCR extracts details instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Compare Prices</h3>
              <p className="text-gray-600">See real-time prices from Apollo, MedPlus, Netmeds, 1mg and more pharmacies near you.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2">Insurance Estimates</h3>
              <p className="text-gray-600">Get copay estimates for Star Health, HDFC Ergo, ICICI Lombard, and government schemes like Ayushman Bharat.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2">Navigate Instantly</h3>
              <p className="text-gray-600">One-tap navigation to your chosen pharmacy with turn-by-turn directions.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">FDA-Verified</h3>
              <p className="text-gray-600">Real drug safety data, warnings, and information from the FDA database.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Stock Availability</h3>
              <p className="text-gray-600">Community-verified stock status so you know before you go.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gradient-to-br from-blue-600 to-green-600 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-white mb-2">Scan</h3>
                <p className="text-blue-100">Upload your prescription or enter drug details manually</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-white mb-2">Compare</h3>
                <p className="text-blue-100">View prices from nearby pharmacies sorted by cost</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-white mb-2">Choose</h3>
                <p className="text-blue-100">Select the best option based on price and location</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">4</div>
                <h3 className="text-xl font-bold text-white mb-2">Navigate</h3>
                <p className="text-blue-100">Get directions and save money on your prescription</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of patients saving on prescriptions every day</p>
          <Link href="/app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl">
            Get Started Free →
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💊</span>
                <span className="text-xl font-bold">MedFinder</span>
              </div>
              <p className="text-gray-400">Making healthcare affordable and accessible.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div><a href="#features" className="hover:text-white transition">Features</a></div>
                <div><a href="#how-it-works" className="hover:text-white transition">How It Works</a></div>
                <div><Link href="/app" className="hover:text-white transition">Get Started</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div><Link href="/about" className="hover:text-white transition">About</Link></div>
                <div><Link href="/faq" className="hover:text-white transition">FAQ</Link></div>
                <div><Link href="/contact" className="hover:text-white transition">Contact</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <div><Link href="/pricing" className="hover:text-white transition">Pricing</Link></div>
                <div><Link href="/faq" className="hover:text-white transition">FAQ</Link></div>
                <div><Link href="/contact" className="hover:text-white transition">Support</Link></div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 MedFinder. Built with ❤️ for healthcare accessibility.
          </div>
        </footer>
      </div>
    </>
  )
}
