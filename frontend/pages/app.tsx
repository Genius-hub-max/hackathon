import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import UploadPrescription from '../components/UploadPrescription'
import PriceComparison from '../components/PriceComparison'
import PharmacyMap from '../components/PharmacyMap'

export default function App() {
  const router = useRouter()
  const [drugData, setDrugData] = useState<any>(null)
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState('Delhi')
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [totalSavings, setTotalSavings] = useState(0)

  useEffect(() => {
    const loggedUser = localStorage.getItem('medfinder_user')
    const userRole = localStorage.getItem('medfinder_role')
    
    if (!loggedUser) {
      router.push('/login')
    } else if (userRole === 'admin') {
      router.push('/admin')
    } else {
      setUser(loggedUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('medfinder_user')
    localStorage.removeItem('medfinder_role')
    localStorage.removeItem('medfinder_name')
    router.push('/login')
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handlePrescriptionProcessed = async (data: any) => {
    setDrugData(data)
    setShowLocationInput(true)
  }

  const handleLocationSearch = async () => {
    if (!location.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/prices/compare?drug_name=${drugData.generic_name}&location=${encodeURIComponent(location)}`)
      const result = await response.json()
      setPrices(result.data.prices)
      
      // Calculate total savings
      const maxSavings = Math.max(...result.data.prices.map((p: any) => p.savings_inr || 0))
      setTotalSavings(maxSavings)
      
      setShowLocationInput(false)
    } catch (error) {
      console.error('Price fetch failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>MedFinder - Compare Prescription Prices</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl">💊</span>
                <h1 className="text-2xl font-bold text-blue-600">MedFinder</h1>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/savings" className="text-gray-600 hover:text-blue-600">My Savings</Link>
                <span className="text-sm text-gray-600">{user}</span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Prescription Prices
            </h2>
            <p className="text-xl text-gray-600">
              Find the best price in under 2 minutes
            </p>
          </div>

          {!drugData ? (
            <UploadPrescription onProcessed={handlePrescriptionProcessed} />
          ) : showLocationInput ? (
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <h3 className="text-2xl font-bold mb-4">Enter Your Location</h3>
                <p className="text-gray-600 mb-6">Search by city or area to find nearby pharmacies with best prices</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City or Area
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Delhi, Mumbai, Bangalore, Koramangala, Andheri"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleLocationSearch}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                      Find Pharmacies
                    </button>
                    <button
                      onClick={() => { setDrugData(null); setShowLocationInput(false) }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
                    >
                      Back
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Popular cities:</strong> Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">Prescription Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Drug:</span>
                    <span className="ml-2 font-semibold">{drugData.generic_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Brand:</span>
                    <span className="ml-2 font-semibold">{drugData.brand_name}</span>
                  </div>
                  {drugData.strength && (
                    <div>
                      <span className="text-gray-600">Strength:</span>
                      <span className="ml-2 font-semibold">{drugData.strength}</span>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => { setDrugData(null); setPrices([]); setShowLocationInput(false); setLocation('Delhi') }}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  ← Upload New Prescription
                </button>
                <button 
                  onClick={() => { setPrices([]); setShowLocationInput(true) }}
                  className="mt-4 ml-4 text-blue-600 hover:text-blue-700"
                >
                  🔄 Change Location
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Finding best prices in {location}...</p>
                </div>
              ) : prices.length > 0 ? (
                <>
                  {totalSavings > 0 && (
                    <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">💰 Your Potential Savings</h3>
                          <p className="text-sm text-gray-600 mt-1">By choosing generic over brand medicine</p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-green-600">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSavings)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">per prescription</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedPharmacy && (
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✅ <strong>Saved to your account!</strong> You selected {selectedPharmacy.pharmacy_name} - Check your <Link href="/savings" className="underline font-semibold">Savings Dashboard</Link>
                      </p>
                    </div>
                  )}
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Found <strong>{prices.length} pharmacies</strong> in <strong>{location}</strong> with prices from <strong>₹{Math.min(...prices.map(p => p.generic_price)).toFixed(2)}</strong> to <strong>₹{Math.max(...prices.map(p => p.generic_price)).toFixed(2)}</strong>
                    </p>
                  </div>
                  <PriceComparison 
                    prices={prices} 
                    drugName={drugData.generic_name}
                    onPharmacySelect={(pharmacy: any) => {
                      setSelectedPharmacy(pharmacy)
                      const saved = localStorage.getItem('medfinder_savings')
                      const history = saved ? JSON.parse(saved) : []
                      const newEntry = {
                        id: Date.now(),
                        drug: drugData.generic_name,
                        date: new Date().toISOString().split('T')[0],
                        brand_price: pharmacy.brand_price || 0,
                        generic_price: pharmacy.generic_price,
                        savings: pharmacy.savings_inr || 0,
                        pharmacy: `${pharmacy.pharmacy_name}, ${pharmacy.city}`
                      }
                      const updated = [newEntry, ...history]
                      localStorage.setItem('medfinder_savings', JSON.stringify(updated))
                    }}
                  />
                  <PharmacyMap pharmacies={prices} />
                </>
              ) : null}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
