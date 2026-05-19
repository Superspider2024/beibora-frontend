"use client";

export default function ProfileTerminal() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans pb-24">
      <header className="mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">OPERATOR METRICS</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Identity & Protocol Stats</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-300 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black bg-gray-100 p-4 border-b border-gray-300">Clearance Credentials</h2>
            <div className="p-6 space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Operator ID:</span> <span>SGN-8942</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Classification:</span> <span>Sargonne Node</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Primary Zone:</span> <span>Nairobi CBD</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Status:</span> <span className="text-green-600">Active / Verified</span></div>
            </div>
        </div>
        
        <div className="bg-white border border-gray-300 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black bg-gray-100 p-4 border-b border-gray-300">Aggregated Performance</h2>
            <div className="p-6 space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Units Bundled (MTD):</span> <span>42</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Total GMV Cleared:</span> <span>420,000 Ksh</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Node Comm. Earned:</span> <span className="text-green-600">21,000 Ksh</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Drop-off Dispute Rate:</span> <span className="text-red-600">2.1%</span></div>
            </div>
        </div>
      </div>
    </div>
  )
}