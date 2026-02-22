import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Admin() {
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [userEmail, setUserEmail] = useState('')
  const [showAddMedicine, setShowAddMedicine] = useState(false)
  const [newMedicine, setNewMedicine] = useState({
    drug_name: '',
    generic_name: '',
    brand_name: '',
    rxnorm_id: '',
    atc_code: ''
  })

  useEffect(() => {
    const email = localStorage.getItem('medfinder_user')
    const role = localStorage.getItem('medfinder_role')
    
    if (!email || role !== 'admin') {
      router.push('/login')
      return
    }
    
    setUserEmail(email)
    loadStats(email)
  }, [router])

  const loadStats = (email: string) => {
    fetch('http://localhost:8000/api/admin/stats', {
      headers: { 'X-User-Email': email }
    })
      .then(res => res.json())
      .then(data => setStats(data.data))
      .catch(err => console.error(err))
  }

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault()
    
    fetch('http://localhost:8000/api/admin/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': userEmail
      },
      body: JSON.stringify(newMedicine)
    })
      .then(res => res.json())
      .then(() => {
        alert('Medicine added successfully!')
        setShowAddMedicine(false)
        setNewMedicine({ drug_name: '', generic_name: '', brand_name: '', rxnorm_id: '', atc_code: '' })
      })
      .catch(err => alert('Failed to add medicine'))
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  if (!stats) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - MedFinder</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
              <h3 className="text-gray-600 text-sm font-medium">Total Searches</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total_searches.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </div>
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-gray-600 text-sm font-medium">Active Users</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.active_users.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">+8% from last month</p>
            </div>
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-gray-600 text-sm font-medium">Pharmacy Partners</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.pharmacy_partners}</p>
              <p className="text-xs text-gray-500 mt-1">Across 6 cities</p>
            </div>
            <div className="card bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
              <h3 className="text-gray-600 text-sm font-medium">Avg Response Time</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">1.2s</p>
              <p className="text-xs text-gray-500 mt-1">API performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">📊 Platform Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Medicines in Database</span>
                  <span className="font-bold text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Cities Covered</span>
                  <span className="font-bold text-blue-600">6</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Avg Pharmacies per City</span>
                  <span className="font-bold text-blue-600">4.3</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">User Satisfaction Rate</span>
                  <span className="font-bold text-green-600">94%</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4">🏙️ Top Cities by Usage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                    <span className="font-medium">Delhi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">4,250</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                    <span className="font-medium">Mumbai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">3,620</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">3</div>
                    <span className="font-medium">Bangalore</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">3,410</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">4</div>
                    <span className="font-medium">Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '55%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">2,750</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Medicine Management</h2>
              <button 
                onClick={() => setShowAddMedicine(!showAddMedicine)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {showAddMedicine ? 'Cancel' : '+ Add Medicine'}
              </button>
            </div>

            {showAddMedicine && (
              <form onSubmit={handleAddMedicine} className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Drug Name"
                    value={newMedicine.drug_name}
                    onChange={(e) => setNewMedicine({...newMedicine, drug_name: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Generic Name"
                    value={newMedicine.generic_name}
                    onChange={(e) => setNewMedicine({...newMedicine, generic_name: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Brand Name"
                    value={newMedicine.brand_name}
                    onChange={(e) => setNewMedicine({...newMedicine, brand_name: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="RxNorm ID"
                    value={newMedicine.rxnorm_id}
                    onChange={(e) => setNewMedicine({...newMedicine, rxnorm_id: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ATC Code"
                    value={newMedicine.atc_code}
                    onChange={(e) => setNewMedicine({...newMedicine, atc_code: e.target.value})}
                    className="px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Medicine
                </button>
              </form>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Most Searched Drugs</h2>
            <div className="space-y-3">
              {stats.most_searched.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{item.drug}</span>
                  <div className="text-gray-600">{item.count.toLocaleString()} searches</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <a href="/" className="text-primary-600 hover:text-primary-700">← Back to Home</a>
          </div>
        </main>
      </div>
    </>
  )
}
