import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ ADDED: Checks URL parameters to show customized success flash banner
  const [searchParams] = useSearchParams();
  const showRegSuccessMsg = searchParams.get('registered') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Handshake validation complete, routing directly into personalized interface
        navigate('/dashboard');
      } else {
        setError('Invalid email address or secure password matching records.');
      }
    } catch (err) {
      setError('Network handshake error connecting gateway services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50/50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Log into your portal to manage active subscriptions</p>
        </header>

        {/* ✅ Dynamic Welcome Notification Card after successful DB write */}
        {showRegSuccessMsg && !error && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-black tracking-wide">
            🎉 Account created successfully! Please enter your credentials below to authorize session.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email" required placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Password</label>
            <input
              type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider mt-2"
          >
            {loading ? 'Verifying Credentials...' : 'Secure Sign In'}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500 font-bold uppercase tracking-wide">
          New to the platform? <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
        </p>

      </div>
    </div>
  );
}