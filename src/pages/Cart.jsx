import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

export default function Cart() {
  const { cartItems, removeFromCart, calculateSubtotal, calculateTotalDeposit } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <span className="text-5xl">🛒</span>
        <h2 className="text-2xl font-black text-gray-900 mt-4">Your Rental Cart is Empty</h2>
        <p className="text-gray-500 text-sm mt-2">Explore our premium catalog to add products and configure lease terms.</p>
        <Link to="/" className="inline-block mt-6 bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Rental Configuration Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            let discountFactor = 1.0;
            if (item.tenure === 6) discountFactor = 0.95;
            if (item.tenure === 12) discountFactor = 0.90;
            const itemRent = Math.round(item.monthlyRent * discountFactor);

            return (
              <div key={item.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex gap-5 items-center justify-between">
                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/placeholder.jpg'; }} />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-gray-500">
                    <p>Tenure: <span className="text-blue-600 font-bold">{item.tenure} Months</span></p>
                    <p>Deposit: ₹{item.deposit}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">₹{itemRent}/mo</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:underline font-bold mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-fit space-y-5">
          <h2 className="text-lg font-black text-gray-900 tracking-tight pb-3 border-b border-gray-100">Order Summary</h2>
          
          <div className="space-y-3 text-sm font-medium text-gray-600">
            <div className="flex justify-between">
              <span>Aggregate Monthly Rental</span>
              <span className="text-gray-900 font-bold">₹{Math.round(calculateSubtotal())}/mo</span>
            </div>
            <div className="flex justify-between">
              <span>Refundable Security Deposit</span>
              <span className="text-gray-900 font-bold">₹{calculateTotalDeposit()}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-baseline">
            <span className="text-sm font-black text-gray-900">Total Upfront Payment</span>
            <span className="text-2xl font-black text-blue-600">₹{Math.round(calculateSubtotal() + calculateTotalDeposit())}</span>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            Proceed To Delivery Scheduling
          </button>
        </div>
      </div>
    </div>
  );
}