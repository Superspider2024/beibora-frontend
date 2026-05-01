import Link from "next/link";
import { Leaf, Wheat, Apple } from "lucide-react";

const dummyProducts = [
  {
    name: "Murang'a Avocados",
    description: "Premium Hass avocados from Murang'a County",
    icon: Apple,
    price: "KES 150/kg"
  },
  {
    name: "Mwea Rice",
    description: "Long-grain rice from Mwea Irrigation Scheme",
    icon: Wheat,
    price: "KES 120/kg"
  },
  {
    name: "Kiambu Tomatoes",
    description: "Fresh vine-ripened tomatoes",
    icon: Leaf,
    price: "KES 80/kg"
  },
  {
    name: "Meru Tea",
    description: "High-quality CTC tea leaves",
    icon: Leaf,
    price: "KES 200/kg"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-8xl font-black text-[#32CD32] mb-8 tracking-tight">
            Beibora
          </h1>
          <p className="text-2xl text-gray-300 mb-12 font-medium max-w-2xl mx-auto">
            Connecting small-scale farmers to buyers directly
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#1A3636] text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-[#2a4a4a] transition-colors shadow-sm"
          >
            Enter the Market
          </Link>
        </div>
      </section>

      {/* Dummy Goods Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyProducts.map((product, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow hover:bg-gray-750">
                <div className="w-16 h-16 bg-[#1A3636] rounded-2xl flex items-center justify-center mb-6">
                  <product.icon size={32} className="text-[#32CD32]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-3xl font-bold text-[#32CD32]">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3636] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Beibora Direct Trade</h3>
          <p className="text-gray-300 mb-6">
            Office: Nairobi, Kenya | Number: +254 7XX XXX XXX
          </p>
          <p className="text-sm text-gray-400">
            Connecting farmers and buyers through transparent, direct trade.
          </p>
        </div>
      </footer>
    </main>
  );
}