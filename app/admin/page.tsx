"use client";
import { useState } from "react";

export default function AdminTerminal() {
  const [transactions, setTransactions] = useState([
    { id: "TRX-001", buyer: "Kilimani Fresh", sargonne: "Alex", amount: 32000, status: "pending_escrow" },
    { id: "TRX-002", buyer: "Westlands Hub", sargonne: "Nyakundi", amount: 18000, status: "cleared" },
  ]);

  // Operational Variables
  const COMMISSION_RATE = 0.05; // 5% Sargonne Cut
  const totalVolume = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono selection:bg-white selection:text-black">
      {/* Terminal Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest text-white">BEIBORA // OPS TERMINAL</h1>
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-green-400">● SYSTEM ONLINE</span>
          <span className="text-gray-500">GTV: KES {totalVolume.toLocaleString()}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Escrow Queue */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Manual Escrow Verification Queue</h2>
          
          <div className="grid gap-3">
            {transactions.map((trx) => (
              <div key={trx.id} className="bg-gray-900 border border-gray-800 p-5 flex justify-between items-center">
                <div>
                  <div className="flex gap-3 mb-1">
                    <span className="text-xs text-gray-500 font-mono">{trx.id}</span>
                    <span className={`text-xs px-2 py-0.5 uppercase tracking-wide font-bold ${trx.status === 'cleared' ? 'text-green-400 bg-green-900/30' : 'text-yellow-400 bg-yellow-900/30'}`}>
                      {trx.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{trx.buyer}</h3>
                  <p className="text-sm text-gray-400">Sargonne: {trx.sargonne}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-light text-white mb-2">KES {trx.amount.toLocaleString()}</p>
                  {trx.status === 'pending_escrow' && (
                    <button className="bg-white text-black text-xs font-bold px-4 py-2 hover:bg-gray-200 transition-colors">
                      VERIFY M-PESA
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Liabilities & Allowances */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Sargonne Liabilities</h2>
          
          <div className="bg-gray-900 border border-gray-800 p-5">
            <div className="mb-6 border-b border-gray-800 pb-4">
              <p className="text-xs text-gray-500 mb-1">Commission Rate</p>
              <p className="text-lg text-white">5.0% (Performance Only)</p>
            </div>
            
            {/* Auto-Calculated Payouts */}
            <div className="space-y-4">
              {transactions.filter(t => t.status === 'cleared').map(trx => (
                <div key={`payout-${trx.id}`} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{trx.sargonne} <span className="text-gray-700 text-xs">({trx.id})</span></span>
                  <span className="text-green-400 font-mono">+KES {(trx.amount * COMMISSION_RATE).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 py-3 text-xs font-bold tracking-widest transition-colors">
              DISBURSE ALLOWANCES
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}