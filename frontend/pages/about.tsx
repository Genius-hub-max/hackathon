import Link from 'next/link'
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About - MedFinder</title>
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

        <main className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold mb-6">About MedFinder</h1>
          <p className="text-xl text-gray-600 mb-12">Making healthcare affordable and accessible for everyone</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-8">
              MedFinder was created to solve a simple problem: patients pay too much for prescriptions. 
              We believe everyone deserves access to affordable medication, and price transparency is the first step.
            </p>

            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
            <p className="text-gray-700 mb-4">
              In India, medicine prices can vary by up to 80% between pharmacies in the same area. 
              Most patients don't know this and end up paying full price at the first pharmacy they visit.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">130M</div>
                  <div className="text-sm text-gray-600">Indians on medicines</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">₹2.5L Cr</div>
                  <div className="text-sm text-gray-600">Annual spending</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">70%</div>
                  <div className="text-sm text-gray-600">Average savings</div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
            <p className="text-gray-700 mb-4">
              MedFinder compares medicine prices across pharmacies in India in real-time, showing you exactly where to get 
              the best deal. We integrate with the FDA's official database to provide verified drug information and 
              use industry-standard insurance modeling to estimate your out-of-pocket costs.
            </p>

            <h2 className="text-3xl font-bold mb-4">How We're Different</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700"><strong>100% Free:</strong> No hidden fees, no subscriptions required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700"><strong>FDA-Verified:</strong> Real drug safety data from official sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700"><strong>Mobile-First:</strong> Scan prescriptions with your phone camera</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700"><strong>Community-Driven:</strong> Crowdsourced price validation</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 mb-8">
              Built by healthcare advocates and technologists who believe in making medicines affordable for every Indian. 
              We're committed to transparency, privacy, and putting patients first.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Saving?</h3>
              <p className="mb-6">Join thousands of patients saving on prescriptions every day</p>
              <Link href="/app" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Compare Prices Now →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
