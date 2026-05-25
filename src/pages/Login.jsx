import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        if (email.startsWith('admin')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid login parameters.');
      }
    } catch (err) {
      setError('Authentication execution failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md transition-all duration-300">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Rent premium items on flexible monthly plans</p>
        </header>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-8 text-sm text-center text-gray-500 font-medium">New to RentEase? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
}