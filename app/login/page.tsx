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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 sm:p-10 lg:p-12 bg-white dark:bg-gray-900">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">Sign in to Beibora</h2>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Enter your credentials and choose your role to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm placeholder:text-gray-400"
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm placeholder:text-gray-400"
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role</label>
                <select
                  value={credentials.role}
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                >
                  <option value="buyer">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-medium py-3.5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Log in'
                )}
              </button>
            </form>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
              Don't have an account? <Link href="/signup" className="font-semibold text-black dark:text-white hover:underline">Sign up for free</Link>
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-center bg-black dark:bg-lime-600 p-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Welcome back</h3>
              <p className="text-gray-200 text-base leading-relaxed">
                Secure access for buyers and admins in a sleek, consistent interface.
              </p>
              <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15">
                Black, white, and lime green for a clean market experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}