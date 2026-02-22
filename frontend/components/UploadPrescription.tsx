import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  onProcessed: (data: any) => void
}

export default function UploadPrescription({ onProcessed }: Props) {
  const [loading, setLoading] = useState(false)
  const [manualEntry, setManualEntry] = useState(false)
  const [drugName, setDrugName] = useState('')
  const [strength, setStrength] = useState('')
  const [dosage, setDosage] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    
    setLoading(true)
    const file = acceptedFiles[0]
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
    } finally {
      setLoading(false)
    }
  }, [onProcessed])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'], 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      }
    } catch (error) {
      console.error('Manual entry failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (manualEntry) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Enter Prescription Details</h3>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drug Name *
              </label>
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Lisinopril"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strength
              </label>
              <input
                type="text"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 10mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Once daily"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="btn-primary flex-1" disabled={loading}>
                {loading ? 'Processing...' : 'Find Prices'}
              </button>
              <button
                type="button"
                onClick={() => setManualEntry(false)}
                className="btn-secondary"
              >
                Back to Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-6xl mb-4">📄</div>
          {loading ? (
            <div>
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600">Processing prescription...</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">Upload Prescription</h3>
              <p className="text-gray-600 mb-4">
                {isDragActive ? 'Drop your prescription here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-sm text-gray-500">Supports: JPG, PNG, PDF</p>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setManualEntry(true)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Or enter drug details manually →
          </button>
        </div>
      </div>
    </div>
  )
}
