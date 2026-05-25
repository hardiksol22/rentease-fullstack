import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import MaintenanceModal from '../components/dashboard/MaintenanceModal.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const [activeRentals] = useState([
    { id: 'RNT-9081', title: 'Luxury 3-Seater Velvet Sofa', category: 'Furniture', monthlyRent: 900, daysRemaining: 142, countdownStatus: 'Delivered', image: '/sofa.jpg' },
    { id: 'RNT-4311', title: 'Smart Double Door Refrigerator', category: 'Appliances', monthlyRent: 1200, daysRemaining: 8, countdownStatus: 'In Transit', image: '/fridge.jpg' }
  ]);

  const [rentalHistory] = useState([
    { id: 'RNT-1022', title: 'Ergonomic Office Chair', category: 'Furniture', totalPrice: 1050, completedDate: '12 Jan 2026', status: 'Returned' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hello, {user?.name || 'Customer'}</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your active subscription terms and support tickets</p>
          </div>
          <div className="bg-blue-50 text-blue-700 rounded-xl px-4 py-2 text-sm font-bold border border-blue-100">
            Account Verified
          </div>
        </header>

        <div className="flex border-b border-gray-200 mb-8 gap-6">
          <button 
            onClick={() => setActiveTab('active')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Active Rentals ({activeRentals.length})
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Rental History
          </button>
        </div>

        {activeTab === 'active' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRentals.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/placeholder.jpg'; }} />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-snug">{item.title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${item.countdownStatus === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                        {item.countdownStatus}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">Agreement ID: {item.id}</p>
                    <p className="text-blue-600 font-extrabold text-sm mt-2">₹{item.monthlyRent}/mo</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center gap-4">
                    <div className="text-xs text-gray-500 font-medium">Time Remaining: <span className="text-gray-900 font-bold">{item.daysRemaining} days</span></div>
                    <button 
                      onClick={() => { setSelectedProduct(item.title); setIsModalOpen(true); }}
                      className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold py-2 px-3.5 rounded-lg transition-colors"
                    >
                      Request Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 font-bold text-xs uppercase border-b border-gray-100">
                  <th className="p-4 pl-6">Agreement ID</th>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Return Date</th>
                  <th className="p-4">Aggregated Price</th>
                  <th className="p-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 font-medium text-gray-700">
                {rentalHistory.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs text-gray-500">{log.id}</td>
                    <td className="p-4 text-gray-900 font-bold">{log.title}</td>
                    <td className="p-4 text-gray-500">{log.completedDate}</td>
                    <td className="p-4 font-semibold">₹{log.totalPrice}</td>
                    <td className="p-4 pr-6"><span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-bold">{log.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <MaintenanceModal productName={selectedProduct} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}