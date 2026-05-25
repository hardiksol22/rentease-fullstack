import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Check your parameters.');
      }
    } catch (err) {
      setError('Onboarding validation error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md transition-all duration-300">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm">Join RentEase for premium configuration plans</p>
        </header>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" required placeholder="Alex Morgan" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" required placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm">
            {loading ? 'Registering Account...' : 'Get Started'}
          </button>
        </form>
        <p className="mt-8 text-sm text-center text-gray-500 font-medium">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
}