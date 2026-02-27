import { useState } from 'react'
import SignatureForm from './components/SignatureForm'
import SignaturePreview from './components/SignaturePreview'
import DevSignaturePreview from './components/DevSignaturePreview'

const isDevelopment = import.meta.env.DEV

function App() {
  const [generatedSignature, setGeneratedSignature] = useState(null)
  const [showDevPreview, setShowDevPreview] = useState(false)

  const handleGenerate = (formData) => {
    setGeneratedSignature(formData)
  }

  const handleBack = () => {
    setGeneratedSignature(null)
  }

  const toggleDevPreview = () => {
    setShowDevPreview(!showDevPreview)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Development Mode Toggle - Only visible in dev */}
      {isDevelopment && (
        <div className="fixed right-4 top-4 z-50">
          <button
            onClick={toggleDevPreview}
            className={`transform rounded-lg px-4 py-2 font-semibold shadow-lg transition hover:scale-105 ${
              showDevPreview
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {showDevPreview ? '🔧 Exit Dev Mode' : '🔧 Dev Preview'}
          </button>
        </div>
      )}

      <div className="container mx-auto">
        {isDevelopment && showDevPreview ? (
          <DevSignaturePreview />
        ) : !generatedSignature ? (
          <SignatureForm onGenerate={handleGenerate} />
        ) : (
          <SignaturePreview formData={generatedSignature} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}

export default App
