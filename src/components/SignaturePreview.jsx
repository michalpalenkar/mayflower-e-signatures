import { useState } from 'react';
import { generateSignatureHTML } from '../templates/signatureTemplate';
import { minifyHTML } from '../utils/htmlMinifier';

const SignaturePreview = ({ formData, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [useMinified, setUseMinified] = useState(false);

  const signatureHTML = generateSignatureHTML(formData);
  const minifiedHTML = minifyHTML(signatureHTML);

  const copyToClipboard = async () => {
    try {
      // Copy HTML version (minified or regular based on toggle)
      await navigator.clipboard.writeText(minifiedHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyPreview = async () => {
    try {
      // Create a temporary container with the signature HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = minifiedHTML;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      // Select all content in the temporary div
      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy the selected content (includes formatting)
      document.execCommand('copy');

      // Clean up
      selection.removeAllRanges();
      document.body.removeChild(tempDiv);

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy preview:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Váš e-mailový podpis</h2>
          <p className="text-gray-600">Skopírujte kód a vložte ho do nastavení vášho e-mailového klienta</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Náhľad
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 font-medium transition border-b-2 ${
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
            <div className="border border-gray-200 rounded-lg p-6">
              <div dangerouslySetInnerHTML={{ __html: minifiedHTML }} />
            </div>
          ) : (
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{minifiedHTML}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Copy Buttons */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-4">
            <button
              onClick={copyPreview}
              className="flex-1 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:opacity-90"
              style={{ backgroundColor: '#ED7402' }}
            >
              {copied ? '✓ Skopírované!' : 'Kopírovať náhľad (odporúčané)'}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 border-2 font-semibold py-4 px-6 rounded-lg transition duration-200 hover:bg-orange-50"
              style={{ borderColor: '#ED7402', color: '#ED7402' }}
            >
              Kopírovať HTML kód
            </button>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
          >
            ← Späť
          </button>
        </div>

        {/* Email Client Integration Guide */}
        <div className="border-t pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ako pridať podpis do e-mailového klienta</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Gmail */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                  G
                </div>
                <h4 className="font-semibold text-gray-800">Gmail</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Settings → See all settings</li>
                <li>General tab</li>
                <li>Signature → Create new</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Outlook Desktop */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  O
                </div>
                <h4 className="font-semibold text-gray-800">Outlook (Desktop)</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>File → Options</li>
                <li>Mail → Signatures</li>
                <li>New → Enter name</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Outlook Web */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  O
                </div>
                <h4 className="font-semibold text-gray-800">Outlook (Web)</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Settings ⚙️ → View all settings</li>
                <li>Mail → Compose and reply</li>
                <li>Email signature</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Apple Mail */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <h4 className="font-semibold text-gray-800">Apple Mail</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Mail → Settings</li>
                <li>Signatures tab</li>
                <li>Click on "+"</li>
                <li>Paste the copied HTML code</li>
              </ol>
            </div>

            {/* Thunderbird */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  T
                </div>
                <h4 className="font-semibold text-gray-800">Thunderbird</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Tools → Account Settings</li>
                <li>Select account</li>
                <li>Check "Attach signature"</li>
                <li>Use HTML → Paste code</li>
              </ol>
            </div>

            {/* Mobile (iOS/Android) */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  📱
                </div>
                <h4 className="font-semibold text-gray-800">Mobile (iOS/Android)</h4>
              </div>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Use web version of client</li>
                <li>Or send HTML to yourself via email</li>
                <li>Set up via desktop application</li>
                <li>Syncs automatically</li>
              </ol>
            </div>
          </div>

          {/* General Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Tipy:</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Niektoré e-mailové klienty vyžadujú formátovanie cez web rozhranie</li>
              <li>Pre najlepší výsledok použite HTML verziu podpisu</li>
              <li>Otestujte podpis odoslaním testovacieho e-mailu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;
