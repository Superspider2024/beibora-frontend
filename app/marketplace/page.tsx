"use client";
import { useState, useEffect } from 'react';

export default function TerminalCommandCenter() {
  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'orders'
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('beibora_token') : null;
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('https://beibora-production.up.railway.app/api/products'),
          fetch('https://beibora-production.up.railway.app/api/orders', {
            headers: authHeaders,
          }),
        ]);

        const prodData = await prodRes.json();
        if (prodRes.ok && Array.isArray(prodData)) {
          setProducts(prodData);
        } else {
          setProducts([]);
          setError('Unable to load marketplace products.');
        }

        const orderData = await orderRes.json();
        if (orderRes.ok && Array.isArray(orderData)) {
          setOrders(orderData);
        } else {
          setOrders([]);
          if (!orderRes.ok) {
            setError(orderData.msg || orderData.message || 'Unable to load your orders.');
          }
        }
      } catch (err) {
        console.error('Terminal Sync Error', err);
        setError('Connection failed while loading marketplace data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOrder = async (productId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('beibora_token') : null;
    if (!token) {
      alert('Please log in before placing an order.');
      return;
    }

    try {
      const res = await fetch('https://beibora-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('M-Pesa prompt sent to mobile device.');
      } else {
        alert(data.msg || data.message || 'Order failed.');
      }
    } catch (err) {
      console.error('Order error', err);
      alert('Unable to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 font-sans pb-24">
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

      {error && (
        <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/70 dark:text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">Loading marketplace data…</div>
      ) : activeTab === 'market' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.length > 0 ? products.map((p: any) => (
            <div key={p._id} className="card p-6 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{p.name}</h3>
                <p className="text-lime-600 text-sm font-semibold mb-4">{p.price} Ksh</p>
              </div>
              <button 
                onClick={() => handleOrder(p._id)}
                className="w-full bg-lime-500 text-black font-semibold uppercase text-sm py-3 rounded-2xl hover:bg-lime-600 transition"
              >
                Order
              </button>
            </div>
          )) : (
            <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white/80 dark:bg-gray-800/80 p-8 text-center text-sm text-gray-600 dark:text-gray-300">
              No marketplace offers available yet.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#171717] border border-gray-800 p-6 rounded-3xl">
          {orders.length > 0 ? (
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
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-600 bg-black/60 p-8 text-center text-sm text-gray-300">
              No order history available yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}