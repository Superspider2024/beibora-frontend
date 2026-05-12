"use client";
import { useState, useEffect } from "react";

export default function Marketplace() {
  const [stock, setStock] = useState([
    { id: 1, sacco: "Murang'a Alpha", item: "Avocados (Hass)", qty: "50 Crates", price: 3200, marketAvg: 4000, verified: true },
    { id: 2, sacco: "Kiambu Central", item: "Red Onions", qty: "120 Nets", price: 1800, marketAvg: 2200, verified: true }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Protocol Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold tracking-tight">BEIBORA <span className="font-light text-gray-400">MARKET</span></h1>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Nairobi Delivery Active
        </div>
      </header>

      {/* Main Feed */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Live Sacco Supply</h2>
          <p className="text-gray-500">Direct from farm. Prices locked 10-15% below Marikiti average.</p>
        </div>

        <div className="grid gap-4">
          {stock.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-sm">Verified Source</span>
                    <span className="text-sm font-medium text-gray-500">{item.sacco}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{item.item}</h3>
                  <p className="text-gray-500 mt-1">Available: <span className="font-semibold text-black">{item.qty}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 line-through">KES {item.marketAvg}</p>
                  <p className="text-3xl font-black tracking-tighter">KES {item.price}</p>
                </div>
              </div>

              {/* Action Zone */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                <p className="text-sm text-gray-500">Pay via M-Pesa Protocol upon delivery verification.</p>
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  PULL STOCK
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}