"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer', number: '', location: '', adminCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        router.push('/marketplace');
      } else {
        setError(data.msg || data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection to backend failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Sign Up</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Create a new account</p>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password" className="absolute right-2 top-2 text-gray-500">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <input
            type="tel"
            placeholder="Phone number"
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Location (city/region)"
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />

          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
          >
            <option value="buyer">User</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === 'admin' && (
            <input
              type="text"
              placeholder="Admin code"
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-lime-300 outline-none"
              value={formData.adminCode}
              onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
            />
          )}

          <button
            disabled={loading}
            className="w-full bg-lime-500 text-black font-semibold py-3 rounded-md hover:bg-lime-600 transition"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Already registered? <Link href="/login" className="text-lime-500 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}