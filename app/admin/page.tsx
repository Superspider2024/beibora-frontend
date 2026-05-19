"use client";
import { useState, useEffect } from 'react';

export default function AdminTerminal() {
  const [activeTab, setActiveTab] = useState('offers');
  const [data, setData] = useState({ offers: [], farmers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your Railway backend
    const fetchData = async () => {
      try {
        const [offersRes, farmersRes] = await Promise.all([
          fetch('https://beibora-production.up.railway.app/api/products'),
          fetch('https://beibora-production.up.railway.app/api/user/farmers')
        ]);
        const offers = await offersRes.json();
        const farmers = await farmersRes.json();
        setData({ offers, farmers });
      } catch (err) {
        console.error("Failed to sync with terminal backend");
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

      {/* Content Area */}
      <div className="bg-[#171717] border border-gray-800 p-6 shadow-2xl min-h-[400px]">
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
                // Map your offers data here
                <tr><td className="py-4 text-gray-400">#001</td><td className="py-4">Tomatoes</td><td className="py-4 text-lime-400">LIVE</td><td className="py-4 text-right"><button className="hover:text-lime-400">Edit</button></td></tr>
              ) : (
                // Map your farmers data here
                <tr><td className="py-4 text-gray-400">SF-99</td><td className="py-4">Murang'a Sacco</td><td className="py-4 text-lime-400">VERIFIED</td><td className="py-4 text-right"><button className="hover:text-lime-400">Audit</button></td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}