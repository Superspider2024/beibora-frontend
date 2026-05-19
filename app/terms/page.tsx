export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto bg-white border border-gray-300 p-8 shadow-sm h-96 overflow-y-auto">
        <h1 className="text-xl font-black tracking-tighter uppercase mb-4 sticky top-0 bg-white pb-2 border-b">Operating Agreement & Liability</h1>
        <div className="text-xs font-mono text-gray-600 space-y-4">
          <p><strong className="text-black">1. ESCROW & PAYMENTS:</strong> Funds are locked in escrow upon Unit dispatch. Platform releases funds to cooperative strictly upon Sargonne validation of physical delivery at the centralized drop-off point.</p>
          <p><strong className="text-black">2. LTL LOGISTICS:</strong> Third-party logistics (3PL) liability terminates at the drop-off point. Last-mile physical distribution is the sole responsibility of the Sargonne and bundled buyers.</p>
          <p><strong className="text-black">3. TAKE RATE:</strong> The platform applies a compounded transaction fee strictly on the total landed cost (Farm + 3PL + S-Comm). Attempting to bypass the terminal for direct trade results in immediate node termination.</p>
          <p><strong className="text-black">4. SPOILAGE:</strong> Disputes regarding transit damage must include geotagged photographic evidence within 30 minutes of drop-off. Failure to do so defaults payment to the cooperative.</p>
        </div>
      </div>
    </div>
  );
}