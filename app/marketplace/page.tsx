"use client";
import { useState } from "react";

interface InventoryItem {
  id: number;
  sacco: string;
  item: string;
  qty: string;
  price: number;
  image: string;
  description: string;
  unit: string;
}

export default function Marketplace() {
  const [stock] = useState<InventoryItem[]>([
    {
      id: 1,
      sacco: "Murang'a Alpha",
      item: "Hass Avocados",
      qty: "50 Crates",
      price: 3200,
      unit: "crate",
      image: "https://images.unsplash.com/photo-1519923043675-9b298c32d4f9?auto=format&fit=crop&w=900&q=80",
      description: "Creamy, farm-fresh Hass avocados direct from Murang'a.",
    },
    {
      id: 2,
      sacco: "Kiambu Central",
      item: "Red Onions",
      qty: "120 Nets",
      price: 1800,
      unit: "net",
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=900&q=80",
      description: "Crisp red onions from certified growers around Kiambu.",
    },
    {
      id: 3,
      sacco: "Mwea Valley",
      item: "Broken Rice",
      qty: "80 Bags",
      price: 2400,
      unit: "bag",
      image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&w=900&q=80",
      description: "Clean, ready-to-sell rice from Mwea irrigation farms.",
    },
  ]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleQuantity = (id: number, value: string) => {
    const number = Math.max(1, Number(value) || 1);
    setQuantities((current) => ({ ...current, [id]: number }));
  };

  const placeOrder = (item: InventoryItem) => {
    const qty = quantities[item.id] || 1;
    const orderNumber = `AT-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = {
      id: `${Date.now()}-${item.id}`,
      orderNumber,
      item: item.item,
      qty,
      total: item.price * qty,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("beiboraOrders") || "[]");
    localStorage.setItem("beiboraOrders", JSON.stringify([order, ...existing]));
    setMessage(`Order ${orderNumber} placed for ${qty} ${item.item}.`);
    setQuantities((current) => ({ ...current, [item.id]: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      <header className="bg-white border-b border-gray-200 px-6 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Marketplace</h1>
            <p className="text-gray-600 mt-1">Direct from farm. Good quality, cheaper.</p>
          </div>
          <div className="rounded-full bg-[#e8f8f0] px-4 py-2 text-sm font-semibold text-[#15803d]">
            Order direct from producer
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {message && (
          <div className="mb-6 rounded-3xl bg-[#e6fffa] border border-[#bde5d7] px-6 py-4 text-[#065f46] shadow-sm">
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {stock.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img src={item.image} alt={item.item} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#16a34a] bg-[#dcfce7] px-3 py-1 rounded-full">Verified</span>
                  <span className="text-sm text-gray-500">{item.sacco}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">{item.item}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-3xl font-black text-[#16a34a]">KES {item.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.qty} available</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">{item.unit}</div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantity(item.id, e.target.value)}
                    className="w-full sm:w-32 rounded-3xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#32CD32] transition-colors"
                  />
                  <button
                    onClick={() => placeOrder(item)}
                    className="w-full sm:w-auto rounded-3xl bg-[#32CD32] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}