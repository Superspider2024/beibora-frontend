"use client";
import { useState, useEffect } from 'react';

export default function TerminalCommandCenter() {
  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync with production backend
    const fetchData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('https://beibora-production.up.railway.app/api/products'),
          fetch('https://beibora-production.up.railway.app/api/orders', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('beibora_token')}` }
          })
        ]);
        setProducts(await prodRes.json());
        setOrders(await orderRes.json());
      } catch (err) {
        console.error("Terminal Sync Error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOrder = async (productId: string) => {
    // Smooth M-Pesa Flow
    const res = await fetch('https://beibora-production.up.railway.app/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('beibora_token')}` },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    if (res.ok) alert("M-Pesa prompt sent to mobile device.");
  };

  return (
    <div className="min-h-screen bg-[#202124] p-6 text-white font-mono pb-24">
      {/* Tab Header */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('market')}
          className={`text-xs font-black uppercase px-6 py-2 border ${activeTab === 'market' ? 'bg-lime-400 text-black border-lime-400' : 'bg-transparent text-gray-500 border-gray-700'}`}
        >
          Marketplace
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`text-xs font-black uppercase px-6 py-2 border ${activeTab === 'orders' ? 'bg-lime-400 text-black border-lime-400' : 'bg-transparent text-gray-500 border-gray-700'}`}
        >
          Dispatch Logs
        </button>
      </div>

      {/* Conditional View */}
      {activeTab === 'market' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p: any) => (
            <div key={p._id} className="bg-[#171717] border border-gray-800 p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white mb-1">{p.name}</h3>
                <p className="text-lime-400 text-sm font-bold mb-4">{p.price} Ksh</p>
              </div>
              <button 
                onClick={() => handleOrder(p._id)}
                className="w-full bg-lime-400 text-black font-black uppercase text-xs py-3 hover:bg-lime-500 transition-colors"
              >
                Order (STK Push)
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#171717] border border-gray-800 p-6">
          <table className="w-full text-left text-[10px] uppercase">
            <thead className="text-gray-500 border-b border-gray-800">
              <tr><th className="pb-4">Route ID</th><th className="pb-4">Status</th><th className="pb-4 text-right">Value</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((o: any) => (
                <tr key={o._id}>
                  <td className="py-4 text-gray-300">{o._id.slice(-6)}</td>
                  <td className={`py-4 ${o.status === 'delivered' ? 'text-lime-400' : 'text-yellow-500'}`}>{o.status}</td>
                  <td className="py-4 text-right font-bold">{o.total} Ksh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}