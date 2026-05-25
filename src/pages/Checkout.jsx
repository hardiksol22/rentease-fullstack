import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { api } from '../services/api.js';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Standard interactive states
  const [location, setLocation] = useState('');
  const [payMethod, setPayMethod] = useState('upi'); // Defaulting to UPI for smooth testing
  const [upiInput, setUpiInput] = useState(user?.role === 'admin' ? 'hardiksol@bob' : ''); // Pre-fills only if logged-in user is Admin
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 bg-white max-w-md mx-auto rounded-3xl mt-16 border border-gray-100 shadow-sm p-8">
        <span className="text-5xl block mb-4">🛒</span>
        <h2 className="text-lg font-black text-gray-900">Your Basket is Empty</h2>
        <p className="text-xs text-gray-400 font-medium mt-1">Please add items to cart before accessing the checkout gateway.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white text-xs font-black px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md uppercase tracking-wider">Explore Catalog</button>
      </div>
    );
  }

  const totalMonthlyRent = cartItems.reduce((acc, item) => acc + (item.calculatedRent || item.monthlyRent || 0), 0);
  const totalSecurityDeposit = cartItems.reduce((acc, item) => acc + (item.securityDeposit || 0), 0);
  const totalDueAmount = totalMonthlyRent + totalSecurityDeposit;

  const executeOrderPlacements = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setFeedback('❌ Session Error: Authentication token is missing. Please sign in again.');
      return;
    }

    // 🔒 SMART ADMIN GATEKEEPER RULE: Enforce check ONLY if the logged-in user is an Admin
    if (user.role === 'admin' && payMethod === 'upi') {
      const allowedAdminVPAs = ['hardiksol@bob', 'hardiksol@22'];
      if (!allowedAdminVPAs.includes(upiInput.trim())) {
        setFeedback('❌ Admin Gate Blocked: As an admin tester, please use either "hardiksol@bob" or "hardiksol@22" to verify the database pipeline.');
        return;
      }
    }

    setLoading(true);
    setFeedback('');

    try {
      console.log(`🚀 Route cleared! Committing records via channel: [${payMethod.toUpperCase()}]`);
      
      // Loops through items and saves directly to MongoDB
      for (const item of cartItems) {
        const payload = {
          productId: item._id, 
          tenureSelected: Number(item.tenure || 3),
          monthlyRentApplied: Number(item.calculatedRent || item.monthlyRent || 0), 
          securityDepositPaid: Number(item.securityDeposit || 0),
          deliveryLocation: location.trim()
        };

        await api.bookRental(payload);
      }

      setFeedback(user.role === 'admin' 
        ? '🎉 ADMIN TEST SUCCESS: Data pipelines verified! Rental details written cleanly to MongoDB Cluster!'
        : '🎉 SUCCESS! Your order placement is authorized and saved securely!'
      );
      
      clearCart();
      setTimeout(() => navigate('/dashboard'), 2500);

    } catch (err) {
      console.error("🚨 Caught Server Error Context:", err);
      const serverErrorMessage = err.response?.data?.message || err.message || 'Database write operational failure.';
      setFeedback(`❌ Database Write Failed: ${serverErrorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Secure Gateway Payment Terminal</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">Production Standard Transaction Routing Engine</p>
        </div>
        {/* ⚡ Visual indicator that changes dynamically based on the logged-in user role */}
        {user?.role === 'admin' && (
          <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl tracking-wider self-start sm:self-center shadow-sm">
            ⚙️ Admin Sandbox Testing Active
          </span>
        )}
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-xs font-bold border transition-all ${
          feedback.includes('🎉') 
            ? 'bg-green-50 text-green-700 border-green-100' 
            : 'bg-red-50 text-red-600 border-red-100'
        }`}>
          {feedback}
        </div>
      )}

      <form onSubmit={executeOrderPlacements} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="md:col-span-2 space-y-6">
          
          {/* Shipping Address Module */}
          <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2"><span>📍</span> Logistics Shipping Destination</h3>
            <div>
              <textarea
                required rows="3" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter delivery address specifications here..."
                className="w-full bg-gray-50 border border-gray-200 p-3 text-xs rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-gray-800"
              />
            </div>
          </div>

          {/* Payment Method Selector Grid */}
          <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2"><span>💳</span> Select Payment Channel Method</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                { id: 'upi', label: 'Instant UPI ID', icon: '📱' },
                { id: 'net', label: 'Secure NetBanking', icon: '🏛️' }
              ].map((channel) => (
                <div
                  key={channel.id} 
                  onClick={() => setPayMethod(channel.id)}
                  className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all ${
                    payMethod === channel.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold ring-2 ring-blue-600/10'
                      : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mb-1 block">{channel.icon}</span>
                  <span className="text-[11px] uppercase tracking-wide font-bold">{channel.label}</span>
                </div>
              ))}
            </div>

            {/* Sub-form contextual dynamic render blocks */}
            <div className="bg-gray-50 p-4 rounded-xl mt-4 border border-dashed border-gray-200">
              {payMethod === 'card' && (
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder="Cardholder Full Name" className="col-span-3 p-2.5 text-xs rounded-lg border outline-none bg-white w-full font-medium" />
                  <input type="text" placeholder="16 Digit Card Number" className="col-span-3 p-2.5 text-xs rounded-lg border outline-none bg-white w-full font-medium" />
                  <input type="text" placeholder="MM/YY" className="p-2.5 text-xs rounded-lg border outline-none bg-white w-full text-center font-medium" />
                  <input type="password" placeholder="CVV" className="p-2.5 text-xs rounded-lg border outline-none bg-white w-full text-center font-medium" />
                </div>
              )}

              {payMethod === 'upi' && (
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Virtual Payment Address (VPA)</label>
                  <input 
                    type="text" 
                    required 
                    value={upiInput} 
                    onChange={(e) => setUpiInput(e.target.value)}
                    placeholder="e.g., username@bankname" 
                    className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-blue-600 p-2.5 text-xs rounded-lg font-bold text-gray-800 outline-none transition-all" 
                  />
                  {user?.role === 'admin' && (
                    <p className="text-[10px] text-amber-600 font-bold mt-2">
                      💡 Admin Notice: Enter "hardiksol@bob" or "hardiksol@22" to clear the admin test criteria.
                    </p>
                  )}
                </div>
              )}

              {payMethod === 'net' && (
                <select className="p-2.5 text-xs rounded-lg border outline-none bg-white w-full font-bold text-gray-700 cursor-pointer">
                  <option>State Bank of India</option>
                  <option>HDFC Core Savings Bank</option>
                  <option>ICICI Corporate Banking Portal</option>
                </select>
              )}
            </div>

          </div>
        </div>

        {/* Right Sidebar Calculation Ledger Summary */}
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl space-y-4 sticky top-24">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Checkout Totals</h3>
          <div className="space-y-2.5 text-xs font-semibold text-gray-400">
            <div className="flex justify-between"><span>Active Products Count</span><span className="text-white font-bold">{cartItems.length} Items</span></div>
            <div className="flex justify-between"><span>Combined Rental Rate</span><span className="text-white font-bold">₹{totalMonthlyRent}/mo</span></div>
            <div className="flex justify-between"><span>Security Deposits Bond</span><span className="text-white font-bold">₹{totalSecurityDeposit}</span></div>
            <div className="border-t border-gray-800 pt-3 mt-2 flex justify-between text-sm font-black text-white">
              <span>Total Remittance Due</span>
              <span className="text-green-400 text-lg font-black">₹{totalDueAmount}</span>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-black py-4 px-4 rounded-xl text-xs uppercase tracking-wider transition-all mt-4 shadow-lg shadow-blue-600/10"
          >
            {loading ? 'Processing Cloud Write Matrix...' : `Authorize Remittance ₹${totalDueAmount}`}
          </button>
        </div>

      </form>
    </div>
  );
}