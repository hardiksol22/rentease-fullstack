import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Vadodara'); // Defaulting to Vadodara
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await register(name, email, password, city);
      if (success) {
        navigate('/login?registered=true');
      } else {
        setError('Registration rejected. This email might already be in use.');
      }
    } catch (err) {
      setError('System engine connection mismatch error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50/50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Join RentEase to rent premium assets in your city</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
            <input
              type="text" required placeholder="Alex Morgan" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
            <input
              type="email" required placeholder="alex@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          {/* 📍 EXPANDED CITY SELECTOR */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Operations Location City</label>
            <select
              value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none font-bold text-gray-700 cursor-pointer"
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
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider mt-4"
          >
            {loading ? 'Registering Account...' : 'Complete Onboarding'}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500 font-bold uppercase tracking-wide">
          Already registered? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </p>

      </div>
    </div>
  );
}