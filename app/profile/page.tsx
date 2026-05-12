"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, MapPin, Phone, Mail, LogOut } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  number: string;
  location: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile from JWT token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT to get user info
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decoded = JSON.parse(jsonPayload);
        
        // Set user data from token (limited info)
        setUser({
          name: "User",
          email: "user@beibora.app",
          number: "+254700000000",
          location: "Kenya",
          role: decoded.user.role
        });
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">Loading...</div>;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Please log in to view your profile</p>
          <Link href="/login" className="text-[#32CD32] font-bold hover:underline">
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6 pb-24">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Profile</h1>
        <p className="text-gray-300 text-lg">Your account details</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-[#1A3636] rounded-3xl flex items-center justify-center mr-6">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-300 capitalize">{user.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center p-6 bg-gray-700 rounded-3xl border border-gray-600">
              <Mail size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-300 font-medium">Email</p>
                <p className="font-bold text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-gray-700 rounded-3xl border border-gray-600">
              <Phone size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-300 font-medium">Phone Number</p>
                <p className="font-bold text-white">{user.number}</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-gray-700 rounded-3xl border border-gray-600">
              <MapPin size={20} className="text-gray-400 mr-4" />
              <div>
                <p className="text-sm text-gray-300 font-medium">Location</p>
                <p className="font-bold text-white">{user.location}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 text-white py-4 rounded-3xl font-bold hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}