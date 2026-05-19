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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Syncing profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 font-sans pb-24">
      <header className="mb-8 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Identity & stats</p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm bg-red-100 dark:bg-red-900/20 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-200 transition"
        >
          Log out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credentials Panel */}
        <div className="card p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Credentials</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-gray-600">ID</span> 
              <span className="font-semibold">{profile?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-gray-600">Role</span> 
              <span className="text-accent font-semibold uppercase">{profile?.role || 'buyer'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-gray-600">Location</span> 
              <span>{profile?.location || 'Nairobi Central'}</span>
            </div>
          </div>
        </div>

        {/* Performance Panel */}
        <div className="card p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Performance</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-gray-600">Units (MTD)</span> 
              <span className="font-semibold">{profile?.stats?.units || 0}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-gray-600">Total GMV</span> 
              <span className="font-semibold">{profile?.stats?.gmv || 0} Ksh</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-accent">Net commission</span> 
              <span className="text-accent font-semibold">{profile?.stats?.commission || 0} Ksh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}