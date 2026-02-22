import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "How does MedFinder work?",
      a: "Simply upload your prescription or enter drug details manually. We'll instantly compare prices across nearby pharmacies and show you where to get the best deal. The entire process takes under 2 minutes."
    },
    {
      q: "Is MedFinder really free?",
      a: "Yes! MedFinder is 100% free for patients. We make money through pharmacy partnerships and optional premium features for caregivers, but price comparison is always free."
    },
    {
      q: "How accurate are the prices?",
      a: "We use a combination of pharmacy partner data, crowdsourced reports, and public price information. Prices are updated regularly and include timestamps. We recommend verifying with the pharmacy before purchase."
    },
    {
      q: "Do I need insurance to use MedFinder?",
      a: "No! MedFinder works with or without insurance. We show both cash prices and insurance estimates. Often, the cash price with a discount is cheaper than your insurance copay."
    },
    {
      q: "Is my prescription information secure?",
      a: "Absolutely. We're HIPAA compliant and use bank-level encryption. We don't store prescription images long-term and never share your personal information."
    },
    {
      q: "Which pharmacies do you compare?",
      a: "We compare prices from major chains (CVS, Walgreens, Rite Aid, Walmart) and independent pharmacies. Coverage varies by location."
    },
    {
      q: "Can I use this for my family members?",
      a: "Yes! Our Pro plan lets you manage prescriptions for up to 5 family members with reminders and price alerts."
    },
    {
      q: "What if my drug isn't listed?",
      a: "We cover 95% of commonly prescribed medications. If your drug isn't found, contact us and we'll add it to our database."
    },
    {
      q: "How do I know if a generic is safe?",
      a: "All generics shown are FDA-approved and clinically equivalent to brand-name drugs. We also display FDA safety information and warnings."
    },
    {
      q: "Can pharmacies see my searches?",
      a: "No. Your searches are private. Pharmacies only see you when you present your prescription in person."
    }
  ]

  return (
    <>
      <Head>
        <title>FAQ - MedFinder</title>
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Everything you need to know about MedFinder</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <span className="text-2xl text-blue-600">{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-6">Our support team is here to help</p>
            <Link href="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Contact Support
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
