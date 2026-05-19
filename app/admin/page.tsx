"use client";
import { useState } from "react";

export default function AdminTerminal() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans pb-24">
      <header className="mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">NODE ADMINISTRATION</h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Network Management & Dispatch</p>
      </header>

      <div className="flex gap-2 mb-6 border-b border-gray-300 pb-2">
        <button 
          className={`text-xs font-bold uppercase tracking-wider px-6 py-2 transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('orders')}
        >
          Active Dispatches
        </button>
        <button 
          className={`text-xs font-bold uppercase tracking-wider px-6 py-2 transition-colors ${activeTab === 'accounts' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('accounts')}
        >
          Managed Nodes
        </button>
      </div>

      <main>
        {activeTab === 'orders' && (
           <div className="bg-white border border-gray-300 p-6 shadow-sm overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                  <tr><th className="p-3">Route ID</th><th className="p-3">Payload</th><th className="p-3">Value</th><th className="p-3">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-sm">
                  <tr><td className="p-3">RT-409</td><td className="p-3">Onions (100kg)</td><td className="p-3">12,500 Ksh</td><td className="p-3 text-yellow-600">In Transit</td></tr>
                </tbody>
             </table>
           </div>
        )}
        {activeTab === 'accounts' && (
           <div className="bg-white border border-gray-300 p-6 shadow-sm overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                  <tr><th className="p-3">Node Type</th><th className="p-3">Designation</th><th className="p-3">Clearance Rate</th><th className="p-3">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-sm">
                  <tr><td className="p-3">Sargonne</td><td className="p-3">Zone A (Nairobi)</td><td className="p-3 text-green-600">94%</td><td className="p-3"><button className="text-xs uppercase bg-black text-white px-3 py-1">Audit</button></td></tr>
                </tbody>
             </table>
           </div>
        )}
      </main>
    </div>
  );
}