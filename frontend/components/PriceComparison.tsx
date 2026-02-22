import { useState } from 'react'

interface Price {
  pharmacy_id: number
  pharmacy_name: string
  city: string
  area: string
  distance: number
  generic_price: number
  brand_price?: number
  savings_inr: number
  stock_status: string
  open_now: boolean
  lat: number
  lng: number
  rating?: number
  review_count?: number
  ai_prediction?: {
    predicted_price: number
    price_trend: string
    best_time_to_buy: string
    confidence: number
  }
}

interface Props {
  prices: Price[]
  drugName: string
  onPharmacySelect?: (pharmacy: Price) => void
}

export default function PriceComparison({ prices, drugName, onPharmacySelect }: Props) {
  const [sortBy, setSortBy] = useState<'price' | 'distance'>('price')
  const [selectedInsurer, setSelectedInsurer] = useState('')

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const sortedPrices = [...prices].sort((a, b) => {
    if (sortBy === 'price') return a.generic_price - b.generic_price
    return a.distance - b.distance
  })

  const maxSavings = Math.max(...prices.map(p => p.savings_inr))

  const handleNavigate = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Price Comparison</h2>
          <p className="text-gray-600 mt-1">
            Save up to {formatINR(maxSavings)} with generic {drugName}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('price')}
            className={`px-4 py-2 rounded-lg font-medium ${
              sortBy === 'price' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Lowest Price
          </button>
          <button
            onClick={() => setSortBy('distance')}
            className={`px-4 py-2 rounded-lg font-medium ${
              sortBy === 'distance' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Nearest
          </button>
        </div>
      </div>

      {selectedInsurer && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Estimated copay with {selectedInsurer}: <span className="font-bold">{formatINR(50)}</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {sortedPrices.map((price, idx) => (
          <div
            key={price.pharmacy_id}
            className={`p-4 rounded-lg border-2 transition-all ${
              idx === 0 ? 'border-success-500 bg-success-50' : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{price.pharmacy_name}</h3>
                  {idx === 0 && (
                    <span className="px-2 py-1 bg-success-500 text-white text-xs font-bold rounded">
                      BEST PRICE
                    </span>
                  )}
                  {!price.open_now && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                      CLOSED
                    </span>
                  )}
                  {price.ai_prediction?.price_trend === 'dropping' && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded animate-pulse">
                      🤖 PRICE DROPPING
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📍 {price.area}, {price.city}</span>
                  <span>
                    📦 {price.stock_status === 'in_stock' ? '✓ In Stock' : '⚠ Low Stock'}
                  </span>
                </div>
                {price.rating && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold ml-1">{price.rating}</span>
                    </div>
                    <span className="text-gray-500">({price.review_count} reviews)</span>
                  </div>
                )}
                {price.ai_prediction && (
                  <div className="mt-2 text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block">
                    🤖 AI: Best time to buy - {price.ai_prediction.best_time_to_buy}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-success-600">
                  {formatINR(price.generic_price)}
                </div>
                {price.brand_price && (
                  <div className="text-sm text-gray-500 line-through">
                    Brand: {formatINR(price.brand_price)}
                  </div>
                )}
                <div className="text-sm font-medium text-success-600 mt-1">
                  Save {formatINR(price.savings_inr)}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                handleNavigate(price.lat, price.lng, price.pharmacy_name)
                if (onPharmacySelect) {
                  onPharmacySelect(price)
                }
              }}
              className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Navigate to Pharmacy →
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have insurance? Select your provider:
        </label>
        <select
          value={selectedInsurer}
          onChange={(e) => setSelectedInsurer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select insurer...</option>
          <option value="Star Health">Star Health</option>
          <option value="HDFC Ergo">HDFC Ergo</option>
          <option value="ICICI Lombard">ICICI Lombard</option>
          <option value="Max Bupa">Max Bupa</option>
          <option value="Ayushman Bharat">Ayushman Bharat</option>
          <option value="CGHS/ESI">CGHS/ESI</option>
        </select>
      </div>
    </div>
  )
}
