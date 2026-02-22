import { useState } from 'react'

interface Props {
  onProcessed: (data: any) => void
}

export default function UploadPrescription({ onProcessed }: Props) {
  const [loading, setLoading] = useState(false)
  const [manualEntry, setManualEntry] = useState(true) // Start with manual entry
  const [drugName, setDrugName] = useState('')
  const [strength, setStrength] = useState('')
  const [dosage, setDosage] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const ocrResponse = await fetch('http://localhost:8000/api/ocr/extract', {
        method: 'POST',
        body: formData,
      })
      const ocrResult = await ocrResponse.json()

      if (ocrResult.success) {
        const parseResponse = await fetch('http://localhost:8000/api/drugs/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ocrResult.data),
        })
        const parseResult = await parseResponse.json()
        
        if (parseResult.success) {
          onProcessed(parseResult.data)
        }
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to process prescription. Please try manual entry.')
      setManualEntry(true)
    } finally {
      setLoading(false)
    }
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!drugName.trim()) {
      alert('Please enter a drug name')
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/drugs/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drug_name: drugName, strength, dosage }),
      })
      const result = await response.json()
      
      if (result.success) {
        onProcessed(result.data)
      } else {
        alert('Failed to process drug information')
      }
    } catch (error) {
      console.error('Manual entry failed:', error)
      alert('Failed to process. Please check if backend is running.')
    } finally {
      setLoading(false)
    }
  }

  if (manualEntry) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Enter Medicine Details</h3>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name *
              </label>
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="e.g., Lisinopril, Atorvastatin, Metformin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strength (Optional)
              </label>
              <input
                type="text"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10mg, 20mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage (Optional)
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Once daily, Twice daily"
              />
            </div>
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Find Prices →'}
              </button>
              <button
                type="button"
                onClick={() => setManualEntry(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
              >
                Upload Instead
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Popular medicines:</strong> Lisinopril, Atorvastatin, Metformin, Amlodipine, Omeprazole
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h3 className="text-2xl font-bold mb-6 text-center">Upload Prescription</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition">
          <input
            type="file"
            id="prescription-upload"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={loading}
          />
          
          {loading ? (
            <div>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Processing prescription...</p>
            </div>
          ) : (
            <>
              <div className="text-6xl mb-4">📄</div>
              <h4 className="text-xl font-semibold mb-2">Upload Your Prescription</h4>
              <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mb-6">Supports: JPG, PNG, PDF</p>
              <label
                htmlFor="prescription-upload"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition"
              >
                Choose File
              </label>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setManualEntry(true)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Or enter medicine name manually →
          </button>
        </div>
      </div>
    </div>
  )
}
