export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 w-full">
      <h1 className="text-4xl font-black tracking-tight mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="text-sm mb-8 text-gray-400">Last Updated: May 2026</p>

        <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">1. Operating Protocol</h3>
        <p>By using Beibora, you agree to adhere to the verification standards set by our platform. All weights must be verified upon delivery by an authorized Sargonne before digital escrow is cleared.</p>

        <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">2. Financial Escrow</h3>
        <p>Payments are facilitated via the Beibora Manual Protocol. Funds remain in transit until physical delivery is confirmed. Falsifying delivery states will result in immediate termination from the network.</p>

        <h3 className="text-xl font-bold text-black dark:text-white mt-6 mb-2">3. Network Access</h3>
        <p>We reserve the right to limit access to the marketplace based on supply and demand metrics to ensure operational stability.</p>
      </div>
    </div>
  );
}