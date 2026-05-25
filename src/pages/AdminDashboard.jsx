import React from 'react';

export default function AdminDashboard() {
  const metrics = {
    mrr: 2100, // Aggregate parameter derived from existing active contract schemas
    utilizationRate: '94.2%',
    activeContracts: 2
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-2">
        <span>🛡️</span> Administrative Performance command
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Recurring Revenue (MRR)</p>
          <p className="text-3xl font-black text-blue-600 mt-2">₹{metrics.mrr}</p>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asset Utilization Rate</p>
          <p className="text-3xl font-black text-green-600 mt-2">{metrics.utilizationRate}</p>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Contract Pools</p>
          <p className="text-3xl font-black text-gray-900 mt-2">{metrics.activeContracts}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-black text-gray-900 mb-4 tracking-tight">Active Platform Subscription Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm divide-y divide-gray-100">
            <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-xs">
              <tr>
                <th className="p-4">User Email</th>
                <th className="p-4">Assigned Asset</th>
                <th className="p-4">Applied Monthly Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              <tr><td className="p-4 font-bold">customer_bkc@rentease.io</td><td className="p-4">Luxury 3-Seater Velvet Sofa</td><td className="p-4 font-bold text-blue-600">₹900/mo</td></tr>
              <tr><td className="p-4 font-bold">user_delhi@rentease.io</td><td className="p-4">Smart Double Door Refrigerator</td><td className="p-4 font-bold text-blue-600">₹1200/mo</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}