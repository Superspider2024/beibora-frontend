"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileTerminal() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch operator profile from Railway backend
    fetch('https://beibora-production.up.railway.app/api/user/profile', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('beibora_token')}` }
    })
    .then(res => res.json())
    .then(data => {
      setProfile(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('beibora_token');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen bg-[#202124] p-6 text-lime-400 font-mono">Syncing Profile...</div>;

  return (
    <div className="min-h-screen bg-[#202124] p-6 text-white font-mono pb-24">
      <header className="mb-8 border-b border-gray-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter text-white">Operator Profile</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Identity & Protocol Stats</p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-[10px] bg-red-900/20 text-red-500 px-4 py-2 border border-red-900 uppercase font-bold hover:bg-red-900/40 transition"
        >
          Terminate Session
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credentials Panel */}
        <div className="bg-[#171717] border border-gray-800 p-8">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Credentials</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-600">Operator ID:</span> 
              <span className="text-white font-bold">{profile?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-600">Classification:</span> 
              <span className="text-lime-400 font-bold uppercase">{profile?.role || 'Sargonne'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-600">Zone:</span> 
              <span className="text-white">{profile?.zone || 'Nairobi Central'}</span>
            </div>
          </div>
        </div>

        {/* Performance Panel */}
        <div className="bg-[#171717] border border-gray-800 p-8">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Aggregate Performance</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-600">Units Bundled (MTD):</span> 
              <span className="text-white font-bold">{profile?.stats?.units || 0}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-600">Total GMV Cleared:</span> 
              <span className="text-white font-bold">{profile?.stats?.gmv || 0} Ksh</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-lime-400">Net Commission:</span> 
              <span className="text-lime-400 font-bold">{profile?.stats?.commission || 0} Ksh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}