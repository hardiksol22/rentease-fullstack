import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [city, setCity] = useState('Vadodara'); // Defaulting to Vadodara
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (secretCode.trim() !== 'RentEaseAdmin2026') {
      setError('❌ Access Denied: Invalid Secret Admin Passcode.');
      setLoading(false);
      return;
    }

    try {
      const success = await register(name, email, password, city, 'admin');
      if (success) {
        navigate('/admin-login?registered=true');
      } else {
        setError('Registration rejected. This email might already be an admin.');
      }
    } catch (err) {
      setError('System authentication engine configuration error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-red-50/10 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-t-4 border-red-600 w-full max-w-md">
        
        <header className="mb-8 text-center">
          <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
            Executive Onboarding
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3">Admin Registration</h2>
          <p className="text-gray-500 mt-1 text-xs font-medium">Create a secure central command profile</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Secret Admin Passcode</label>
            <input
              type="password" required placeholder="Enter master admin key (RentEaseAdmin2026)" value={secretCode} onChange={(e) => setSecretCode(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none font-bold text-red-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Full Admin Name</label>
            <input
              type="text" required placeholder="Chief Administrator" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Official Email ID</label>
            <input
              type="email" required placeholder="admin@rentease.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          {/* 📍 EXPANDED ADMIN HUB SELECTOR */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Operational Hub City</label>
            <select
              value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none font-bold text-gray-700 cursor-pointer"
            >
              <option value="Vadodara">Vadodara 🏙️</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Secure Password</label>
            <input
              type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider mt-4"
          >
            {loading ? 'Authorizing Profile...' : 'Create Admin Account'}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500 font-bold uppercase tracking-wide">
          Already an Admin? <Link to="/admin-login" className="text-red-600 hover:underline">Secure Sign In</Link>
        </p>

      </div>
    </div>
  );
}