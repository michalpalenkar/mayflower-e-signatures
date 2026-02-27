import { generateSignatureHTML } from '../templates/signatureTemplate'
import { minifyHTML } from '../utils/htmlMinifier'
import { doctypeWrapper } from '../utils/doctypeWrapper'

const DevSignaturePreview = () => {
  // Dummy data for development
  const dummyData = {
    name: 'Lukáš',
    surname: 'Šarközi',
    tel: '+421 911 211 050',
    mail: 'sarkozi@mayflower.sk',
    position: 'PARTNER | FINANCE & INVESTMENT',
  }

  const signatureHTML = generateSignatureHTML(dummyData)
  const minifiedSignatureHTML = minifyHTML(signatureHTML)

  const copyToClipboard = async (source) => {
    try {
      await navigator.clipboard.writeText(source)
      alert('HTML copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const saveAsHTML = () => {
    try {
      // Create a complete HTML document with the signature (same as openInNewTab)
      const minifiedFullHTML = doctypeWrapper(signatureHTML)

      const filename = 'signature.html'
      // Create a Blob from the minified HTML content
      const blob = new Blob([minifiedFullHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element and trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Clean up the URL
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (err) {
      console.error('Failed to save HTML:', err)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-red-600">
              🔧 DEV MODE - Signature preview
            </h2>
            <div className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-800">
              Development Only
            </div>
          </div>
          <p className="text-gray-600">
            This component is only visible in development mode (pnpm dev)
          </p>
        </div>

        {/* Dummy Data Info */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">Test Data:</h3>
          <pre className="font-mono text-sm text-blue-800">
            {JSON.stringify(dummyData, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => copyToClipboard(minifiedSignatureHTML)}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            📋 Copy table HTML to Clipboard
          </button>
          <button
            onClick={() => copyToClipboard(doctypeWrapper(signatureHTML))}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            📋 Copy full HTML to Clipboard
          </button>
          <button
            onClick={saveAsHTML}
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            💾 Download full HTML
          </button>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            Visual Preview:
          </h3>
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
            <div
              dangerouslySetInnerHTML={{ __html: signatureHTML }}
              style={{ maxWidth: '454px' }}
            />
          </div>
        </div>

        {/* Width Indicator */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-4">
            <h3 className="text-lg font-bold text-gray-800">Width Test:</h3>
            <span className="text-sm text-gray-600">
              (Should be exactly 454px)
            </span>
          </div>
          <div
            style={{ width: '486px' }}
            className="rounded-lg border-2 border-purple-500 bg-purple-50 p-4"
          >
            <div className="text-center font-mono text-sm text-purple-700">
              ← 454px wide container →
            </div>
            <div dangerouslySetInnerHTML={{ __html: signatureHTML }} />
          </div>
        </div>

        {/* HTML Source */}
        <div className="mb-6">
          <h3 className="mb-4 text-xl font-bold text-gray-800">HTML Source:</h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
            <code>{signatureHTML}</code>
          </pre>
        </div>

        {/* Instructions */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h4 className="mb-2 font-semibold text-yellow-900">
            📝 Instructions:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-yellow-800">
            <li>
              Test the signature in different email clients (Gmail, Outlook,
              Apple Mail)
            </li>
            <li>Verify links are working (email, phone, websites)</li>
            <li>Check dark mode rendering in compatible clients</li>
            <li>Ensure width is exactly 454px across all clients</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DevSignaturePreview
