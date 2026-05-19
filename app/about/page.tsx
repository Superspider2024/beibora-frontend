export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 p-10 shadow-sm">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-6 border-b border-gray-200 pb-4">Infrastructure Overview</h1>
        <p className="text-sm leading-relaxed mb-6 font-mono text-gray-600">
          Beibora operates a two-sided logistics network designed to eliminate informal brokerage inefficiency. 
          By utilizing centralized unit-drops and enforcing strict platform take-rates, we guarantee optimized landed costs for urban buyers and protected farm-gate pricing for cooperatives.
        </p>
        <h2 className="text-sm font-bold uppercase tracking-wider mt-8 mb-4">Node Classifications</h2>
        <ul className="list-inside space-y-4 text-sm text-gray-700 font-mono">
          <li><strong className="text-black uppercase">Mansart:</strong> Supply-side acquisition. Manages cooperative onboarding and initial payload verification.</li>
          <li><strong className="text-black uppercase">Sargonne:</strong> Demand-side aggregation. Bundles informal market buyers into guaranteed 10,000 Ksh physical drop units.</li>
        </ul>
      </div>
    </div>
  );
}