import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Savings() {
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMedicine, setNewMedicine] = useState({
    drug: '',
    pharmacy: '',
    brand_price: '',
    generic_price: ''
  })
  const [showAlertForm, setShowAlertForm] = useState(false)
  const [newAlert, setNewAlert] = useState({ drug: '', target_price: '' })
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    const loggedUser = localStorage.getItem('medfinder_user')
    const userRole = localStorage.getItem('medfinder_role')
    
    if (!loggedUser) {
      router.push('/login')
    } else if (userRole === 'admin') {
      router.push('/admin')
    } else {
      setUser(loggedUser)
      loadSearchHistory()
      loadAlerts()
    }
  }, [])

  const loadAlerts = () => {
    const mockAlerts = [
      { id: 1, drug: 'Lisinopril', target_price: 100, current_price: 120, status: 'active' },
      { id: 2, drug: 'Atorvastatin', target_price: 250, current_price: 240, status: 'triggered' },
    ]
    setAlerts(mockAlerts)
  }

  const loadSearchHistory = () => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem('medfinder_savings')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    } else {
      const mockHistory = [
        { id: 1, drug: 'Lisinopril', date: '2024-01-15', brand_price: 850, generic_price: 120, savings: 730, pharmacy: 'Apollo Pharmacy, Delhi' },
        { id: 2, drug: 'Atorvastatin', date: '2024-01-10', brand_price: 1200, generic_price: 280, savings: 920, pharmacy: 'MedPlus, Mumbai' },
        { id: 3, drug: 'Metformin', date: '2024-01-05', brand_price: 650, generic_price: 95, savings: 555, pharmacy: 'Netmeds, Bangalore' },
      ]
      setSearchHistory(mockHistory)
      localStorage.setItem('medfinder_savings', JSON.stringify(mockHistory))
    }
  }

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault()
    
    const brandPrice = parseFloat(newMedicine.brand_price)
    const genericPrice = parseFloat(newMedicine.generic_price)
    const savings = brandPrice - genericPrice
    
    const newEntry = {
      id: Date.now(),
      drug: newMedicine.drug,
      date: new Date().toISOString().split('T')[0],
      brand_price: brandPrice,
      generic_price: genericPrice,
      savings: savings,
      pharmacy: newMedicine.pharmacy
    }
    
    const updated = [newEntry, ...searchHistory]
    setSearchHistory(updated)
    localStorage.setItem('medfinder_savings', JSON.stringify(updated))
    
    setNewMedicine({ drug: '', pharmacy: '', brand_price: '', generic_price: '' })
    setShowAddForm(false)
  }

  const handleRemoveMedicine = (id: number) => {
    if (confirm('Are you sure you want to remove this entry?')) {
      const updated = searchHistory.filter(item => item.id !== id)
      setSearchHistory(updated)
      localStorage.setItem('medfinder_savings', JSON.stringify(updated))
    }
  }

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault()
    const newAlertEntry = {
      id: Date.now(),
      drug: newAlert.drug,
      target_price: parseFloat(newAlert.target_price),
      current_price: parseFloat(newAlert.target_price) + 50,
      status: 'active'
    }
    setAlerts([newAlertEntry, ...alerts])
    setNewAlert({ drug: '', target_price: '' })
    setShowAlertForm(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const totalSavings = searchHistory.reduce((sum, item) => sum + item.savings, 0)
  const avgSavings = searchHistory.length > 0 ? totalSavings / searchHistory.length : 0

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>My Savings - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/app" className="flex items-center gap-2">
                <span className="text-3xl">💊</span>
                <h1 className="text-2xl font-bold text-blue-600">MedFinder</h1>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/app" className="text-gray-600 hover:text-blue-600">Search</Link>
                <Link href="/savings" className="text-blue-600 font-semibold">My Savings</Link>
                <span className="text-sm text-gray-600">{user}</span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">💰 My Savings Dashboard</h2>
            <p className="text-xl text-gray-600">Track how much you've saved on prescriptions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total Savings</h3>
              <p className="text-4xl font-bold text-green-600">{formatINR(totalSavings)}</p>
              <p className="text-sm text-gray-600 mt-2">Lifetime savings</p>
            </div>

            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Average Savings</h3>
              <p className="text-4xl font-bold text-blue-600">{formatINR(avgSavings)}</p>
              <p className="text-sm text-gray-600 mt-2">Per prescription</p>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total Searches</h3>
              <p className="text-4xl font-bold text-purple-600">{searchHistory.length}</p>
              <p className="text-sm text-gray-600 mt-2">Prescriptions compared</p>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Search History & Savings</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                {showAddForm ? 'Cancel' : '+ Add Medicine'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddMedicine} className="bg-blue-50 p-6 rounded-lg mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                    <input
                      type="text"
                      value={newMedicine.drug}
                      onChange={(e) => setNewMedicine({...newMedicine, drug: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Lisinopril"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy</label>
                    <input
                      type="text"
                      value={newMedicine.pharmacy}
                      onChange={(e) => setNewMedicine({...newMedicine, pharmacy: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Apollo Pharmacy, Delhi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMedicine.brand_price}
                      onChange={(e) => setNewMedicine({...newMedicine, brand_price: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="850.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generic Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMedicine.generic_price}
                      onChange={(e) => setNewMedicine({...newMedicine, generic_price: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="120.00"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                    Add to Savings
                  </button>
                  {newMedicine.brand_price && newMedicine.generic_price && (
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                      Savings: {formatINR(parseFloat(newMedicine.brand_price) - parseFloat(newMedicine.generic_price))}
                    </div>
                  )}
                </div>
              </form>
            )}
            
            {searchHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No search history yet</p>
                <Link href="/app" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Start Comparing Prices →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pharmacy</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Brand Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Generic Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Savings</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {searchHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-gray-900">{item.drug}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.pharmacy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                          {formatINR(item.brand_price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-blue-600">
                          {formatINR(item.generic_price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            +{formatINR(item.savings)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleRemoveMedicine(item.id)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Price Alerts Section */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🔔 Price Alerts</h3>
              <button
                onClick={() => setShowAlertForm(!showAlertForm)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                {showAlertForm ? 'Cancel' : '+ Set Alert'}
              </button>
            </div>

            {showAlertForm && (
              <form onSubmit={handleCreateAlert} className="bg-purple-50 p-6 rounded-lg mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                    <input
                      type="text"
                      value={newAlert.drug}
                      onChange={(e) => setNewAlert({...newAlert, drug: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Metformin"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newAlert.target_price}
                      onChange={(e) => setNewAlert({...newAlert, target_price: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="100.00"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                  Create Alert
                </button>
              </form>
            )}

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No price alerts set</p>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-2 ${
                    alert.status === 'triggered' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{alert.drug}</p>
                        <p className="text-sm text-gray-600">Target: {formatINR(alert.target_price)} | Current: {formatINR(alert.current_price)}</p>
                      </div>
                      <div>
                        {alert.status === 'triggered' ? (
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                            ✅ Price Reached!
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                            🔔 Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-blue-50">
              <h3 className="text-lg font-bold mb-3">💡 Savings Tip</h3>
              <p className="text-gray-700">
                Always ask your doctor if a generic alternative is available. Generic medicines have the same active ingredients as brand-name drugs but cost 60-80% less!
              </p>
            </div>

            <div className="card bg-green-50">
              <h3 className="text-lg font-bold mb-3">🎯 Your Impact</h3>
              <p className="text-gray-700">
                You've saved <strong>{formatINR(totalSavings)}</strong> so far! That's money you can use for other healthcare needs or daily expenses.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
