"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'buyer' });
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
        localStorage.setItem('beibora_token', data.token);
        if (data.role) localStorage.setItem('beibora_role', data.role);

        const userRole = data.role || data.user?.role || 'buyer';
        if (userRole.toLowerCase() === 'admin') {
          router.push('/admin');
        } else {
          router.push('/marketplace');
        }
      } else {
        setError(data.msg || data.message || (data.errors ? JSON.stringify(data.errors) : 'Authentication failed.'));
      }
    } catch (err) {
      setError('Connection to server failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
    
    {/* Left Side: Form */}
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500">Please enter your details to sign in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm placeholder-gray-400"
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm placeholder-gray-400"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <select
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
            >
              <option value="buyer">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-all mt-6 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Don't have an account? <a href="#signup" className="font-semibold text-black hover:underline">Sign up for free</a>
        </p>
      </div>
    </div>

    {/* Right Side: Visual/Branding (Hidden on mobile, visible on desktop) */}
    <div className="hidden lg:flex flex-1 bg-[#f8f9fa] relative overflow-hidden items-center justify-center p-12">
      {/* Abstract soft background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 opacity-80"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-60"></div>
      
      <div className="relative z-10 max-w-lg text-center">
         <div className="bg-white/50 backdrop-blur-xl p-10 rounded-3xl border border-white/60 shadow-xl">
           <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your Marketplace. <br/> Elevated.</h3>
           <p className="text-gray-600 text-base leading-relaxed">
             Connect with buyers and sellers on a platform designed for simplicity, security, and growth.
           </p>
         </div>
      </div>
    </div>

  </div>
  );
}