"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Sargonne' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://beibora-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Success: Redirect to Marketplace
        router.push('/marketplace');
      } else {
        setError(data.message || 'Registration failed. Check Node ID.');
      }
    } catch (err) {
      setError('Connection to backend failed. Check server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-sm bg-[#171717] border border-gray-800 p-8 shadow-2xl">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Initialize Node</h2>
        <p className="text-[10px] text-gray-500 mb-8 uppercase tracking-widest">Connect to Beibora Protocol</p>
        
        {error && <p className="text-[10px] text-red-500 mb-4 uppercase">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full bg-[#202124] text-white p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email / Identifier" 
            className="w-full bg-[#202124] text-white p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Passkey" 
            className="w-full bg-[#202124] text-white p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <select 
            className="w-full bg-[#202124] text-gray-400 p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option>Sargonne</option>
            <option>Mansart</option>
          </select>

          <button 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-3 uppercase tracking-widest hover:bg-lime-500 transition disabled:bg-gray-600"
          >
            {loading ? 'Initializing...' : 'Register Node'}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-gray-600 text-center uppercase tracking-widest">
          Already have access? <Link href="/login" className="text-lime-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}