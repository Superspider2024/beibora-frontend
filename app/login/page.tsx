"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://beibora-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        // Assume backend returns a token; store it
        localStorage.setItem('beibora_token', data.token);
        // Redirect to terminal
        router.push('/marketplace');
      } else {
        setError(data.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('Connection to protocol failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-sm bg-[#171717] border border-gray-800 p-8 shadow-2xl">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Terminal Access</h2>
        <p className="text-[10px] text-gray-500 mb-8 uppercase tracking-widest">Authorized nodes only</p>
        
        {error && <p className="text-[10px] text-red-500 mb-4 uppercase">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Node Email" 
            className="w-full bg-[#202124] text-white p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Passkey" 
            className="w-full bg-[#202124] text-white p-3 border border-gray-700 outline-none focus:border-lime-400 text-sm"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <button 
            disabled={loading}
            className="w-full bg-lime-400 text-black font-black py-3 uppercase tracking-widest hover:bg-lime-500 transition disabled:bg-gray-600 mt-4"
          >
            {loading ? 'Authenticating...' : 'Connect Node'}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-gray-600 text-center uppercase tracking-widest">
          Need access? <Link href="/signup" className="text-lime-400 hover:underline">Request Node ID</Link>
        </p>
      </div>
    </div>
  );
}