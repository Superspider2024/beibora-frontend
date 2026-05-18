import Link from "next/link";

const dummyProducts = [
  { name: "Murang'a Avocados", description: "Premium Hass avocados from Murang'a County", price: "KES 150/kg" },
  { name: "Mwea Rice", description: "Long-grain rice from Mwea Irrigation Scheme", price: "KES 120/kg" },
  { name: "Kiambu Tomatoes", description: "Fresh vine-ripened tomatoes", price: "KES 80/kg" },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="min-h-screen flex items-center justify-center bg-gray-900 text-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black text-[#32CD32] mb-6">Agricultural Trade</h1>
          <p className="text-xl text-gray-300 mb-8">Connecting small-scale farmers directly to urban buyers — fair prices, verified quality.</p>

          <div className="flex gap-4 justify-center">
            <Link href="/marketplace" className="bg-[#1A3636] text-white px-8 py-4 rounded-3xl font-bold hover:bg-[#2a4a4a] transition-colors">Enter the Market</Link>
            <Link href="/about" className="border border-gray-700 text-gray-300 px-8 py-4 rounded-3xl font-bold hover:text-[#32CD32] transition-colors">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyProducts.map((p, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm">
                <div className="w-full h-40 bg-gray-700 rounded-xl mb-6 flex items-center justify-center text-5xl text-[#32CD32]">🌾</div>
                <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-gray-400 mb-4">{p.description}</p>
                <p className="text-3xl font-bold text-[#32CD32]">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#32CD32] mb-6">Who We Are</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">We partner with cooperatives and field agents to bring verified commodities directly from farms to buyers, increasing transparency and farmer earnings.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Verified Farmers</h3>
              <p className="text-gray-400">Field-verified sources and cooperative partners.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Fair Pricing</h3>
              <p className="text-gray-400">Transparent price breakdowns for buyers and farmers.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Secure Payments</h3>
              <p className="text-gray-400">Payments reconciled and verified through our protocol.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}