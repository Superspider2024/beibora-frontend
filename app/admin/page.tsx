"use client";
import { useState, useEffect } from 'react';

export default function AdminTerminal() {
  const [activeTab, setActiveTab] = useState('offers');
  const [data, setData] = useState<{ offers: any[]; farmers: any[] }>({ offers: [], farmers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const parseResponse = async (res: Response) => {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return res.json();
      }
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        return { error: text || `${res.status} ${res.statusText}` };
      }
    };

    const fetchData = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('beibora_token') : null;
      if (!token) {
        setError('No auth token found. Please log in again with admin credentials.');
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

        let offersData: any = [];
        let farmersData: any = [];

        if (!offersRes.ok) {
          const parsed = await parseResponse(offersRes);
          setError(parsed?.msg || parsed?.message || `Offers request failed: ${offersRes.status}`);
        } else {
          const parsed = await parseResponse(offersRes);
          offersData = Array.isArray(parsed) ? parsed : [];
        }

        if (!farmersRes.ok) {
          const parsed = await parseResponse(farmersRes);
          setError(parsed?.msg || parsed?.message || `Farmers request failed: ${farmersRes.status}`);
        } else {
          const parsed = await parseResponse(farmersRes);
          farmersData = Array.isArray(parsed) ? parsed : [];
        }

        setData({ offers: offersData, farmers: farmersData });
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