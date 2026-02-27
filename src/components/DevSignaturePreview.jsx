import { generateSignatureHTML } from '../templates/signatureTemplate';

const DevSignaturePreview = () => {
  // Dummy data for development
  const dummyData = {
    name: 'Lukáš',
    surname: 'Šarközi',
    tel: '+421 911 211 050',
    mail: 'sarkozi@mayflower.sk',
    position: 'PARTNER | FINANCE & INVESTMENT'
  };

  const signatureHTML = generateSignatureHTML(dummyData);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(signatureHTML);
      alert('HTML copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-red-600">
              🔧 DEV MODE - Signature preview
            </h2>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold text-sm">
              Development Only
            </div>
          </div>
          <p className="text-gray-600">
            This component is only visible in development mode (pnpm dev)
          </p>
        </div>

        {/* Dummy Data Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Test Data:</h3>
          <pre className="text-sm text-blue-800 font-mono">
            {JSON.stringify(dummyData, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            📋 Copy HTML to Clipboard
          </button>
          <button
            onClick={() => {
              const blob = new Blob([signatureHTML], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'signature.html';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            💾 Download HTML
          </button>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Visual Preview:</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div
              dangerouslySetInnerHTML={{ __html: signatureHTML }}
              style={{ maxWidth: '454px' }}
            />
          </div>
        </div>

        {/* Width Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-bold text-gray-800">Width Test:</h3>
            <span className="text-sm text-gray-600">(Should be exactly 454px)</span>
          </div>
          <div
            style={{ width: '486px' }}
            className="border-2 border-purple-500 bg-purple-50 p-4 rounded-lg"
          >
            <div className="text-center text-purple-700 font-mono text-sm">
              ← 454px wide container →
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: signatureHTML }}
            />
          </div>
        </div>

        {/* HTML Source */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">HTML Source:</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
            <code>{signatureHTML}</code>
          </pre>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">📝 Instructions:</h4>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>Test the signature in different email clients (Gmail, Outlook, Apple Mail)</li>
            <li>Verify links are working (email, phone, websites)</li>
            <li>Check dark mode rendering in compatible clients</li>
            <li>Ensure width is exactly 454px across all clients</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DevSignaturePreview;
