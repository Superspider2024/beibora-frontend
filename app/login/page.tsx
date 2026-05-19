"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'buyer' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        router.push('/marketplace');
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Log In</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Log in to your account</p>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password" className="absolute right-2 top-2 text-gray-500">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <select
            value={credentials.role}
            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
          >
            <option value="buyer">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-lime-500 text-black font-semibold py-3 rounded-md hover:bg-lime-600 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Don't have an account? <Link href="/signup" className="text-lime-500 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}