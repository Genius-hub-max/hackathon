import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Head>
        <title>Contact - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
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

        <main className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">support@medfinder.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">1-800-MEDFINDER</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-600">123 Healthcare Ave<br />San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-bold mb-2">For Pharmacy Partners</h3>
                <p className="text-gray-700 mb-3">Interested in partnering with MedFinder?</p>
                <a href="mailto:partners@medfinder.com" className="text-blue-600 font-semibold hover:underline">
                  partners@medfinder.com →
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-600 font-semibold hover:underline">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Partnership</option>
                      <option>Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
