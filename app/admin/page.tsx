"use client";
import { useState, useEffect } from 'react';

export default function AdminTerminal() {
  const [activeTab, setActiveTab] = useState('offers');
  const [data, setData] = useState({ offers: [], farmers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('beibora_token') : null;
      if (!token) {
        setError('Please log in to view admin data.');
        setLoading(false);
        return;
      }

      try {
        const [offersRes, farmersRes] = await Promise.all([
          fetch('https://beibora-production.up.railway.app/api/products'),
          fetch('https://beibora-production.up.railway.app/api/user/farmers', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const offersData = await offersRes.json();
        const farmersData = await farmersRes.json();

        setData({
          offers: offersRes.ok && Array.isArray(offersData) ? offersData : [],
          farmers: farmersRes.ok && Array.isArray(farmersData) ? farmersData : [],
        });

        if (!offersRes.ok) {
          setError(offersData.msg || offersData.message || 'Unable to load offer data.');
        }
        if (!farmersRes.ok) {
          setError(farmersData.msg || farmersData.message || 'Unable to load farmer data.');
        }
      } catch (err) {
        console.error('Failed to sync with terminal backend', err);
        setError('Connection failed while loading admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#202124] p-6 text-white font-mono pb-24">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-xl font-black uppercase tracking-tighter text-white">System Admin</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Centralized Node Administration</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('offers')} 
          className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 border ${activeTab === 'offers' ? 'bg-lime-400 text-black border-lime-400' : 'bg-transparent text-gray-500 border-gray-700 hover:text-white'}`}
        >
          Commodity Offers
        </button>
        <button 
          onClick={() => setActiveTab('farmers')} 
          className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 border ${activeTab === 'farmers' ? 'bg-lime-400 text-black border-lime-400' : 'bg-transparent text-gray-500 border-gray-700 hover:text-white'}`}
        >
          Co-op Nodes
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-950/70 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Content Area */}
      <div className="bg-[#171717] border border-gray-800 p-6 shadow-2xl min-h-[400px] rounded-3xl">
        {loading ? (
          <p className="text-xs text-lime-400 animate-pulse uppercase">Syncing with Protocol...</p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="text-gray-500 border-b border-gray-800 uppercase tracking-widest">
              <tr>
                <th className="pb-4">ID</th>
                <th className="pb-4">{activeTab === 'offers' ? 'Item' : 'Sacco Name'}</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {activeTab === 'offers' ? (
                data.offers.length > 0 ? (
                  data.offers.map((offer: any) => (
                    <tr key={offer._id}>
                      <td className="py-4 text-gray-400">{offer._id.slice(-6)}</td>
                      <td className="py-4">{offer.name || offer.title || 'Item'}</td>
                      <td className="py-4 text-lime-400">LIVE</td>
                      <td className="py-4 text-right"><button className="hover:text-lime-400">Edit</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">No offers available yet.</td>
                  </tr>
                )
              ) : (
                data.farmers.length > 0 ? (
                  data.farmers.map((farmer: any) => (
                    <tr key={farmer._id}>
                      <td className="py-4 text-gray-400">{farmer._id.slice(-6)}</td>
                      <td className="py-4">{farmer.name}</td>
                      <td className="py-4 text-lime-400">VERIFIED</td>
                      <td className="py-4 text-right"><button className="hover:text-lime-400">Audit</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">No farmers found yet.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}