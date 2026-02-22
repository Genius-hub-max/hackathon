import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Landing() {
  const [savingsCounter, setSavingsCounter] = useState(0)
  const targetSavings = 28500000 // ₹2.85 Cr

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetSavings / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetSavings) {
        setSavingsCounter(targetSavings)
        clearInterval(timer)
      } else {
        setSavingsCounter(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const formatINR = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <>
      <Head>
        <title>MedFinder - Save Up to 70% on Prescriptions</title>
      </Head>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>

      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💊</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MedFinder</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#impact" className="text-gray-600 hover:text-blue-600 transition">Impact</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
            </nav>
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105">
              Sign In
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-3xl animate-bounce">💊</span>
                <span className="text-sm font-semibold">Trusted by 10,000+ Families</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Save Up to <span className="text-yellow-300">70%</span><br />
                on Your Prescriptions
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Compare prices across 100+ pharmacies in seconds. Find the cheapest generic alternatives instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-2xl">
                  Start Saving Now →
                </Link>
                <Link href="/about" className="bg-blue-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500/40 transform hover:scale-105 transition-all border-2 border-white/30">
                  Learn More
                </Link>
              </div>

              {/* Live Savings Counter */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
                <p className="text-sm text-blue-200 mb-2">Total Savings Generated</p>
                <p className="text-5xl font-bold text-yellow-300 mb-2">{formatINR(savingsCounter)}</p>
                <p className="text-sm text-blue-200">Helping families afford better healthcare 💚</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Impact Section */}
        <section id="impact" className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Social Impact 🌟</h2>
              <p className="text-xl text-gray-600">Making healthcare affordable for every Indian family</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600 font-semibold">Families Helped</div>
                <div className="text-sm text-gray-500 mt-2">Across 6 major cities</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div className="text-5xl mb-4">💰</div>
                <div className="text-4xl font-bold text-green-600 mb-2">₹2.85 Cr</div>
                <div className="text-gray-600 font-semibold">Total Savings</div>
                <div className="text-sm text-gray-500 mt-2">In the last 6 months</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div className="text-5xl mb-4">📊</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">68%</div>
                <div className="text-gray-600 font-semibold">Average Savings</div>
                <div className="text-sm text-gray-500 mt-2">Per prescription</div>
              </div>
            </div>

            {/* Real Impact Stories */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Real Stories, Real Savings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">👨</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Rajesh Kumar, Delhi</p>
                      <p className="text-gray-700 mb-3">"Saved ₹730 on my diabetes medication. That's my weekly grocery budget!"</p>
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        Saved ₹730/month
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">👩</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Priya Sharma, Mumbai</p>
                      <p className="text-gray-700 mb-3">"Found generic alternative for my mother's heart medication. Saved ₹920!"</p>
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        Saved ₹920/month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-gray-600 mb-12">Everything you need to save on prescriptions</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Scan Prescriptions</h3>
              <p className="text-gray-600">Upload or scan with OCR technology for instant extraction</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Compare Prices</h3>
              <p className="text-gray-600">Real-time prices from Apollo, MedPlus, Netmeds, 1mg</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Price Prediction</h3>
              <p className="text-gray-600">Know when prices will drop with ML-powered forecasts</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2">Navigate Instantly</h3>
              <p className="text-gray-600">One-tap navigation to your chosen pharmacy</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-2">Price Alerts</h3>
              <p className="text-gray-600">Get notified when medicine prices drop</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Pharmacy Ratings</h3>
              <p className="text-gray-600">Community-verified ratings and reviews</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl mb-8 text-blue-100">Join 10,000+ families saving on prescriptions</p>
            <Link href="/login" className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-2xl">
              Get Started Free →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">💊</span>
              <span className="text-xl font-bold">MedFinder</span>
            </div>
            <p className="text-gray-400 mb-4">Making healthcare affordable and accessible for every Indian</p>
            <p className="text-gray-500 text-sm">© 2024 MedFinder. Built with ❤️ for healthcare accessibility.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
