import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const showRegSuccess = searchParams.get('registered') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Session validation check: ensure user is an admin before routing
        const savedUser = JSON.parse(localStorage.getItem('rentease_user'));
        
        if (savedUser && savedUser.role === 'admin') {
          // ✅ SUCCESS: Send straight to executive operational cockpit
          navigate('/admin');
        } else {
          setError('❌ Access Denied: This account does not possess Admin clearance tokens.');
        }
      } else {
        setError('Invalid admin credentials matching records.');
      }
    } catch (err) {
      setError('Network handshake error connecting gateway services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-red-50/10 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-t-4 border-red-600 w-full max-w-md">
        
        <header className="mb-8 text-center">
          <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
            Secure Entry Gate
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3">Admin Login</h2>
          <p className="text-gray-500 mt-1 text-xs font-medium">Log into your executive control cockpit</p>
        </header>

        {showRegSuccess && !error && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-black">
            🎉 Admin account registered successfully! Please sign in below.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Admin Email Address</label>
            <input
              type="email" required placeholder="admin@rentease.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Password</label>
            <input
              type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider mt-2"
          >
            {loading ? 'Verifying Clearance...' : 'Secure Admin Sign In'}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500 font-bold uppercase tracking-wide">
          Need an Admin Account? <Link to="/admin-register" className="text-red-600 hover:underline">Register Here</Link>
        </p>

      </div>
    </div>
  );
}