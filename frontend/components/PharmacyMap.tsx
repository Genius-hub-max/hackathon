import { useEffect, useRef } from 'react'

interface Pharmacy {
  pharmacy_id: number
  pharmacy_name: string
  lat: number
  lng: number
  distance: number
  generic_price: number
  open_now: boolean
}

interface Props {
  pharmacies: Pharmacy[]
}

export default function PharmacyMap({ pharmacies }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Simple static map display for demo
    // In production, integrate Google Maps SDK or Leaflet
  }, [pharmacies])

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Nearby Pharmacies</h2>
      <div 
        ref={mapRef}
        className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-700 font-medium">Interactive Map View</p>
          <p className="text-sm text-gray-600 mt-2">
            {pharmacies.length} pharmacies found nearby
          </p>
          <div className="mt-6 space-y-2">
            {pharmacies.slice(0, 3).map((p) => (
              <div key={p.pharmacy_id} className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="font-medium">{p.pharmacy_name}</span>
                <span className="text-gray-600 ml-2">• {p.distance} mi</span>
                <span className="text-success-600 ml-2 font-bold">${p.generic_price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        💡 Production: Integrate Google Maps SDK for full interactive map with navigation
      </p>
    </div>
  )
}
