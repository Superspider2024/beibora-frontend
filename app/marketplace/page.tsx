// app/marketplace/page.tsx
"use client";
import { useState } from "react";

// Mock Data structured for the operational reality
const initialListings = [
  { id: "L-001", coop: "Murang'a Farmers Sacco", commodity: "Tomatoes", available_kg: 500, farm_price: 40, transport_kg: 5 },
  { id: "L-002", coop: "Naivasha Green Coop", commodity: "Cabbage", available_kg: 800, farm_price: 25, transport_kg: 6 },
  { id: "L-003", coop: "Kinangop Harvest", commodity: "Onions", available_kg: 1200, farm_price: 60, transport_kg: 4 },
];

export default function SargonneTerminal() {
  const [unitTotal, setUnitTotal] = useState(0);
  const PLATFORM_TAKE_RATE = 0.08; 

  const calculateLandedPrice = (farmPrice: number, transport: number) => {
    // Incorporating the compound pricing logic
    const baseSubtotal = farmPrice + transport; 
    return Math.ceil(baseSubtotal * (1 + PLATFORM_TAKE_RATE));
  };

  const addToUnit = (price: number, kg: number) => {
    setUnitTotal(prev => prev + (price * kg));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans">
      <header className="mb-8 border-b border-gray-300 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">BEIBORA EXCHANGE</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Sargonne Routing Terminal</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Active Unit Bundle</p>
          <p className={`text-3xl font-mono font-bold ${unitTotal >= 10000 ? 'text-green-600' : 'text-red-600'}`}>
            Ksh {unitTotal.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 font-mono">Floor: 10,000 Ksh</p>
        </div>
      </header>

      <main>
        <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 uppercase tracking-wider text-xs font-semibold text-gray-600 border-b border-gray-300">
              <tr>
                <th className="p-4">Dispatch ID</th>
                <th className="p-4">Co-Operative</th>
                <th className="p-4">Commodity</th>
                <th className="p-4 text-right">Avail (KG)</th>
                <th className="p-4 text-right bg-gray-50 border-l border-gray-200">Farm/KG</th>
                <th className="p-4 text-right bg-gray-50">LTL/KG</th>
                <th className="p-4 text-right bg-yellow-50 border-l border-gray-200 font-bold">Landed/KG</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {initialListings.map((item) => {
                const landedPrice = calculateLandedPrice(item.farm_price, item.transport_kg);
                return (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">{item.id}</td>
                    <td className="p-4 font-medium">{item.coop}</td>
                    <td className="p-4 font-medium">{item.commodity}</td>
                    <td className="p-4 font-mono text-right">{item.available_kg}</td>
                    <td className="p-4 text-right bg-gray-50 border-l border-gray-200 font-mono">Ksh {item.farm_price}</td>
                    <td className="p-4 text-right bg-gray-50 font-mono text-red-600">Ksh {item.transport_kg}</td>
                    <td className="p-4 text-right bg-yellow-50 border-l border-gray-200 font-mono font-bold text-black">
                      Ksh {landedPrice}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => addToUnit(landedPrice, 50)} 
                        className="bg-black text-white text-xs px-4 py-2 uppercase font-bold tracking-wide hover:bg-gray-800 transition-colors"
                      >
                        Add 50 KG
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            disabled={unitTotal < 10000}
            className={`px-8 py-4 text-sm uppercase tracking-widest font-bold text-white transition-colors ${
              unitTotal >= 10000 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {unitTotal >= 10000 ? 'Lock Unit & Dispatch Lorry' : 'Unit Floor Not Met'}
          </button>
        </div>
      </main>
    </div>
  );
}