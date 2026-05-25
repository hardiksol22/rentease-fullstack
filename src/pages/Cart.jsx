import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 bg-white max-w-md mx-auto rounded-3xl mt-16 border border-gray-100 shadow-sm p-8">
        <span className="text-5xl block mb-4">🛒</span>
        <h2 className="text-lg font-black text-gray-900">Your Basket is Empty</h2>
        <p className="text-xs text-gray-400 font-medium mt-1">Add items from the marketplace catalogue to initiate contracts.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white text-xs font-black px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md uppercase tracking-wider">Explore Catalog</button>
      </div>
    );
  }

  // Calculating aggregate cost summaries dynamically
  const totalMonthlyRent = cartItems.reduce((acc, item) => acc + item.calculatedRent, 0);
  const totalSecurityDeposit = cartItems.reduce((acc, item) => acc + item.securityDeposit, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Review Rental Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Cart Items Layout List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div key={`${item._id}-${index}`} className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt="" className="w-16 h-16 object-cover bg-gray-50 border rounded-xl" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-wider">Lease Term: <span className="text-blue-600">{item.tenure} Months</span></p>
                  <p className="text-[11px] text-gray-400 mt-1 font-medium">Refundable Security Bond: ₹{item.securityDeposit}</p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1.5">
                <p className="text-base font-black text-gray-900">₹{item.calculatedRent}<span className="text-xs text-gray-400 font-medium">/mo</span></p>
                <button 
                  type="button" onClick={() => removeFromCart(item._id)}
                  className="text-[10px] font-black uppercase text-red-500 hover:underline tracking-wider"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Total Subscription Ledger Check */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2">Subscription Summary</h3>
          
          <div className="space-y-2 text-xs font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Combined Monthly Rental Rate</span>
              <span className="text-gray-900 font-bold">₹{totalMonthlyRent}/mo</span>
            </div>
            <div className="flex justify-between">
              <span>Total Refundable Security Deposits</span>
              <span className="text-gray-900 font-bold">₹{totalSecurityDeposit}</span>
            </div>
            <div className="border-t border-dashed my-2 pt-2 flex justify-between text-sm font-black text-gray-900">
              <span>Initial Payment Due Today</span>
              <span className="text-blue-600 text-lg">₹{totalMonthlyRent + totalSecurityDeposit}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gray-900 hover:bg-blue-600 text-white font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all mt-4 shadow-md"
          >
            Proceed to Secure Checkout
          </button>
        </div>

      </div>
    </div>
  );
}