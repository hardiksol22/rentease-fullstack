import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Concurrent resolution executing multiple cloud operations simultaneously
    Promise.all([api.getMyRentals(), api.getMyTickets()])
      .then(([rentalData, ticketData]) => {
        setRentals(rentalData);
        setTickets(ticketData);
      })
      .catch((err) => console.error("Dashboard profile loader fault line:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="text-center py-24 text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Secured Profile Ecosystem...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-gray-50/20">
      
      {/* Profile Header Canvas */}
      <header className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">Account Member</span>
          <h1 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">Hello, {user?.name}</h1>
          <p className="text-gray-400 text-xs mt-0.5">Primary Session Email: {user?.email} | Target Operations: {user?.city}</p>
        </div>
        <div className="bg-gray-900 text-white rounded-xl px-5 py-3 text-center">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Active Commitments</p>
          <p className="text-xl font-black mt-0.5">{rentals.length} Orders</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Double-Column Section: Rental Contracts */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>📋</span> Active Rental Subscriptions
          </h2>
          
          {rentals.length === 0 ? (
            <div className="bg-white border border-dashed rounded-2xl text-center py-16 text-gray-400 text-xs font-bold uppercase tracking-wider">No active rental agreements logged into account records.</div>
          ) : (
            <div className="space-y-4">
              {rentals.map((lease) => (
                <div key={lease._id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4 items-center">
                    <img 
                      src={lease.productId?.image} alt="" 
                      className="w-14 h-14 object-cover rounded-xl bg-gray-50 border"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'; }}
                    />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{lease.productId?.name || 'Leased Inventory Asset'}</h4>
                      <p className="text-[11px] font-semibold text-blue-600 mt-0.5">Tenure: {lease.tenureSelected} Months contract plan</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">Destination: {lease.deliveryLocation}</p>
                    </div>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-dashed">
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Rate Applied</p>
                      <p className="font-black text-gray-900 text-base">₹{lease.monthlyRentApplied}<span className="text-[10px] text-gray-400 font-medium">/mo</span></p>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1.5 ${
                      lease.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {lease.deliveryStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Single Column: Registered Support Tickets */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>🛠️</span> Support Tickets
          </h2>

          {tickets.length === 0 ? (
            <div className="bg-white border border-dashed rounded-2xl text-center py-16 text-gray-400 text-xs font-bold uppercase tracking-wider">Clear history desk. No support issues found.</div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-black uppercase bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {ticket.issueCategory}
                      </span>
                      <h5 className="font-bold text-xs text-gray-900 mt-2 line-clamp-1">
                        Ref: {ticket.rentalId?.productId?.name || 'Lease Asset'}
                      </h5>
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      ticket.status === 'Open' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2 bg-gray-50 p-2 rounded-lg">
                    "{ticket.description}"
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">
                    📅 Scheduled Visit: {new Date(ticket.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}