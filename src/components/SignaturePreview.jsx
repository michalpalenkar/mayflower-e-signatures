import { useState } from 'react'
import { generateSignatureHTML } from '../templates/signatureTemplate'
import { minifyHTML } from '../utils/htmlMinifier'
import slugify from 'slugify'

const SignaturePreview = ({ formData, onBack }) => {
  const [activeTab, setActiveTab] = useState('preview')

  const signatureHTML = generateSignatureHTML(formData)
  const minifiedHTML = minifyHTML(signatureHTML)

  const copyToClipboard = async () => {
    try {
      // Copy HTML version (minified or regular based on toggle)
      await navigator.clipboard.writeText(minifiedHTML)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openInNewTab = () => {
    try {
      // Create a complete HTML document with the signature
      const minifiedfullHTML = doctypeWrapper(signatureHTML)

      // Create a Blob from the HTML content
      const blob = new Blob([minifiedfullHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)

      // Open in a new tab
      window.open(url, '_blank')

      // Clean up the URL after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (err) {
      console.error('Failed to open preview:', err)
    }
  }

  const saveAsHTML = () => {
    try {
      // Create a complete HTML document with the signature (same as openInNewTab)
      const minifiedFullHTML = doctypeWrapper(signatureHTML)

      // Create filename from formData (name-surname.html)
      const firstName = formData.name?.trim() || 'podpis'
      const lastName = formData.surname?.trim() || ''
      const slugifiedName = slugify(firstName, { lower: true, strict: true })
      const slugifiedSurname = lastName
        ? slugify(lastName, { lower: true, strict: true })
        : ''
      const filename = slugifiedSurname
        ? `${slugifiedName}-${slugifiedSurname}.html`
        : `${slugifiedName}.html`

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
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="rounded-2xl bg-white p-8 shadow-xl md:p-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            Váš e-mailový podpis
          </h2>
          <p className="text-gray-600">
            Skopírujte kód a vložte ho do nastavení vášho e-mailového klienta
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('preview')}
            className={`border-b-2 px-4 py-2 font-medium transition ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Náhľad
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`border-b-2 px-4 py-2 font-medium transition ${
              activeTab === 'html'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            HTML kód
          </button>
        </div>

        {/* Preview/Code Display */}
        <div className="mb-8">
          {activeTab === 'preview' ? (
            <div className="rounded-lg border border-gray-200 p-6">
              <div dangerouslySetInnerHTML={{ __html: minifiedHTML }} />
            </div>
          ) : (
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{minifiedHTML}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Copy Buttons */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <button
              onClick={openInNewTab}
              className="flex-1 transform rounded-lg px-6 py-4 font-semibold text-white transition duration-200 hover:scale-[1.02] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              style={{ backgroundColor: '#ED7402' }}
            >
              Otvoriť v novej záložke (odporúčané)
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 rounded-lg border-2 px-6 py-4 font-semibold transition duration-200 hover:bg-orange-50"
              style={{ borderColor: '#ED7402', color: '#ED7402' }}
            >
              Kopírovať HTML kód
            </button>
          </div>
          <button
            onClick={saveAsHTML}
            className="w-full rounded-lg border-2 px-6 py-4 font-semibold transition duration-200 hover:bg-orange-50"
            style={{ borderColor: '#ED7402', color: '#ED7402' }}
          >
            💾 Stiahnuť ako HTML súbor
          </button>
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
          >
            ← Späť
          </button>
        </div>

        {/* Email Client Integration Guide */}
        <div className="border-t pt-8">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            Ako pridať podpis do e-mailového klienta
          </h3>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Gmail */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 font-bold text-white">
                  G
                </div>
                <h4 className="font-semibold text-gray-800">Gmail</h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>Settings → See all settings</li>
                <li>General tab</li>
                <li>Signature → Create new</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Outlook Desktop */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                  O
                </div>
                <h4 className="font-semibold text-gray-800">
                  Outlook (Desktop)
                </h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>File → Options</li>
                <li>Mail → Signatures</li>
                <li>New → Enter name</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Outlook Web */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 font-bold text-white">
                  O
                </div>
                <h4 className="font-semibold text-gray-800">Outlook (Web)</h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>Settings ⚙️ → View all settings</li>
                <li>Mail → Compose and reply</li>
                <li>Email signature</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Apple Mail */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 font-bold text-white">
                  A
                </div>
                <h4 className="font-semibold text-gray-800">Apple Mail</h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>Mail → Settings</li>
                <li>Signatures tab</li>
                <li>Click on "+"</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Thunderbird */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                  T
                </div>
                <h4 className="font-semibold text-gray-800">Thunderbird</h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>Tools → Account Settings</li>
                <li>Select account</li>
                <li>Check "Attach signature"</li>
                <li>Use HTML → Paste code</li>
              </ol>
            </div>

            {/* Mobile (iOS/Android) */}
            <div className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 font-bold text-white">
                  📱
                </div>
                <h4 className="font-semibold text-gray-800">
                  Mobile (iOS/Android)
                </h4>
              </div>
              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600">
                <li>Use web version of client</li>
                <li>Or send HTML to yourself via email</li>
                <li>Set up via desktop application</li>
                <li>Syncs automatically</li>
              </ol>
            </div>
          </div>

          {/* General Tips */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold text-blue-900">💡 Tipy:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-blue-800">
              <li>
                Niektoré e-mailové klienty vyžadujú formátovanie cez web
                rozhranie
              </li>
              <li>Pre najlepší výsledok použite HTML verziu podpisu</li>
              <li>Otestujte podpis odoslaním testovacieho e-mailu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignaturePreview
