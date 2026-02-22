import Link from 'next/link'
import Head from 'next/head'

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">💊</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">MedFinder</span>
            </Link>
            <Link href="/app" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Get Started
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">Choose the plan that works for you in India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">₹0<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Perfect for individuals</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unlimited price comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>FDA drug information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Insurance estimates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Mobile app access</span>
                </li>
              </ul>
              <Link href="/app" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 text-center py-3 rounded-lg font-semibold transition">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white transform scale-105">
              <div className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">₹699<span className="text-lg opacity-80">/month</span></div>
              <p className="opacity-90 mb-6">For caregivers & families</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Manage 5 family members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Prescription reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Price alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/app" className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">Custom</div>
              <p className="text-gray-600 mb-6">For healthcare providers</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <a href="#" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition">
                Contact Sales
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div>✓ No hidden fees</div>
              <div>✓ Cancel anytime</div>
              <div>✓ 30-day money back</div>
              <div>✓ HIPAA compliant</div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
