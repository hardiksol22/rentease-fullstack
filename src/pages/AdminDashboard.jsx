import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  
  // State management for tabs and live data arrays
  const [activeTab, setActiveTab] = useState('overview'); // overview, customers, orders
  const [allRentals, setAllRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Metrics state calculations
  const [metrics, setMetrics] = useState({
    mrr: 0,
    escrowDeposit: 0,
    totalLeases: 0,
    uniqueCustomersCount: 0
  });

  useEffect(() => {
    const fetchAdminMetricsData = async () => {
      const savedUser = JSON.parse(localStorage.getItem('rentease_user'));
      if (!savedUser || !savedUser.token) {
        setError('Unauthorized access. Admin session token token missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Hits the protected rentals endpoint (Backend returns ALL rows if role is Admin)
        const response = await axios.get('http://localhost:5000/api/rentals/my-rentals', {
          headers: { Authorization: `Bearer ${savedUser.token}` }
        });

        const data = response.data;
        setAllRentals(data);

        // 📊 Calculating real-time financial metrics from database values
        const computedMrr = data.reduce((acc, row) => acc + (row.monthlyRentApplied || 0), 0);
        const computedDeposits = data.reduce((acc, row) => acc + (row.securityDepositPaid || 0), 0);
        
        // Extracting unique customer instances from the orders pool
        const exactCustomerEmails = [...new Set(data.map(row => row.userId?.email || row.userId))];

        setMetrics({
          mrr: computedMrr,
          escrowDeposit: computedDeposits,
          totalLeases: data.length,
          uniqueCustomersCount: exactCustomerEmails.length || 0
        });

        setError('');
      } catch (err) {
        console.error("🚨 Admin Metrics pipeline crash:", err);
        setError('Failed to fetch platform metrics from database nodes.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminMetricsData();
  }, []);

  // Safety gate: Restrict display if the logged-in session user is not an admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 border rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
          <span className="text-4xl block">🛑</span>
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Access Restricted</h2>
          <p className="text-xs text-gray-400 font-medium">Your current member clearance level does not permit viewing executive operational matrices.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-32 text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing Admin Command Feeds...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-gray-50/20">
      
      {/* Executive Header Canvas */}
      <header className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-black tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-md uppercase">Executive Control Center</span>
          <h1 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">RentEase Central Command</h1>
          <p className="text-gray-400 font-semibold text-xs mt-0.5">Welcome Back, Chief Admin. System metrics are fully operational.</p>
        </div>
        
        {/* Navigation Tabs Switcher */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl border gap-1 self-stretch md:self-auto">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'customers', label: '👥 Customers' },
            { id: 'orders', label: '📦 Live Orders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all duration-200 flex-1 md:flex-none ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50 scale-102'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {error && <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">❌ {error}</div>}

      {/* ==================== TAB 1: OVERVIEW METRICS ==================== */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Key Metric Scorecards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl flex items-center gap-4">
              <div className="text-3xl p-3.5 bg-blue-50 text-blue-600 rounded-xl">💰</div>
              <div>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Platform Monthly MRR</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">₹{metrics.mrr}</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl flex items-center gap-4">
              <div className="text-3xl p-3.5 bg-green-50 text-green-600 rounded-xl">🛡️</div>
              <div>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Escrow Deposit Reserves</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">₹{metrics.escrowDeposit}</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl flex items-center gap-4">
              <div className="text-3xl p-3.5 bg-purple-50 text-purple-600 rounded-xl">📦</div>
              <div>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Active Contract Leases</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">{metrics.totalLeases} Orders</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl flex items-center gap-4">
              <div className="text-3xl p-3.5 bg-amber-50 text-amber-600 rounded-xl">👥</div>
              <div>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Acquired Tenants</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">{metrics.uniqueCustomersCount} Users</p>
              </div>
            </div>
          </section>

          {/* Quick Snapshot Insights */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-black text-sm text-gray-900 uppercase tracking-tight mb-4">📢 Admin Quick Diagnostics</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              RentEase platform parameters are safe. Out of total <span className="text-blue-600 font-bold">{metrics.totalLeases} active lease agreements</span>, the escrow system is safely holding <span className="text-green-600 font-bold">₹{metrics.escrowDeposit} refundable security cash reserves</span>. Real-time platform system MRR is locked at <span className="text-gray-900 font-bold">₹{metrics.mrr}/month</span>. Use tabs above to filter detailed breakdown logs.
            </p>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: CUSTOMERS DATABASE ==================== */}
      {activeTab === 'customers' && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="p-5 font-black text-sm text-gray-900 border-b border-gray-50 bg-gray-50/40">Verified Consumer User Directory</h3>
          
          {allRentals.length === 0 ? (
            <div className="text-center py-16 text-xs font-bold text-gray-400 uppercase tracking-wider">No active clients logged in transactions records.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 border-b font-black text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Registered Email</th>
                    <th className="p-4">Operational Hub City</th>
                    <th className="p-4 text-center">Identity Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium text-gray-700">
                  {/* Extract unique customers dynamically and render directory rows safely */}
                  {Array.from(new Map(allRentals.filter(r => r.userId).map(r => [r.userId._id || r.userId.email, r.userId])).values()).map((customer) => (
                    <tr key={customer._id || customer.email} className="hover:bg-gray-50/40 transition-colors">
                      <td className="p-4 font-bold text-gray-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-black text-[11px] uppercase">
                          {customer.name?.substring(0, 2) || 'US'}
                        </div>
                        {customer.name || 'Anonymous User'}
                      </td>
                      <td className="p-4 text-gray-500 font-semibold">{customer.email || 'N/A'}</td>
                      <td className="p-4 text-gray-600 font-bold">{customer.city || 'Mumbai'}</td>
                      <td className="p-4 text-center">
                        <span className="bg-blue-50 text-blue-600 font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {customer.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ==================== TAB 3: LIVE ORDERS LEDGER ==================== */}
      {activeTab === 'orders' && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="p-5 font-black text-sm text-gray-900 border-b border-gray-50 bg-gray-50/40">Global Logistics & Fulfillment Agreement Feed</h3>
          
          {allRentals.length === 0 ? (
            <div className="text-center py-16 text-xs font-bold text-gray-400 uppercase tracking-wider">No active lease agreements found inside system nodes.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 border-b font-black text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Agreement ID Reference</th>
                    <th className="p-4">Leased Product Model</th>
                    <th className="p-4">Tenant Identity</th>
                    <th className="p-4">Billing MRR Rate</th>
                    <th className="p-4">Shipping Destination</th>
                    <th className="p-4 text-right">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium text-gray-700">
                  {allRentals.map((row) => (
                    <tr key={row._id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="p-4 font-bold text-gray-900 text-[10px] tracking-tight font-mono select-all">#{row._id}</td>
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={row.productId?.image} alt="" 
                          className="w-8 h-8 rounded-lg bg-gray-50 border object-cover shrink-0" 
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'; }}
                        />
                        <span className="font-bold text-gray-800 line-clamp-1 max-w-[150px]">{row.productId?.name || 'Platform Leased Asset'}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900 leading-none">{row.userId?.name || 'Tenant'}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 max-w-[120px] truncate">{row.userId?.email}</p>
                      </td>
                      <td className="p-4 font-black text-gray-900 text-sm">₹{row.monthlyRentApplied}<span className="text-[10px] text-gray-400 font-medium">/mo</span></td>
                      <td className="p-4 text-gray-400 font-medium max-w-xs truncate">{row.deliveryLocation}</td>
                      <td className="p-4 text-right">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md inline-block ${
                          row.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {row.deliveryStatus || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

    </div>
  );
}