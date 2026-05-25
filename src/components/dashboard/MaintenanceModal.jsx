import React, { useState } from 'react';

export default function MaintenanceModal({ productName, onClose }) {
  const [issueType, setIssueType] = useState('Appliance Malfunction');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleTicketSubmission = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      alert(`Technical support request raised successfully for ${productName || 'Asset item'}. Tracking ID generated.`);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-100 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
        
        <h2 className="text-xl font-black text-gray-900 mb-2">Request Maintenance Support</h2>
        <p className="text-gray-400 text-xs font-semibold mb-6">Asset Item: {productName}</p>
        
        <form onSubmit={handleTicketSubmission} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Issue Classification Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
            >
              <option value="Appliance Malfunction">Appliance Malfunction</option>
              <option value="Furniture Wear/Tear">Furniture Wear/Tear</option>
              <option value="Logistics/Delivery Damage">Logistics/Delivery Damage</option>
              <option value="General Inspection Swap">General Inspection Swap</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Detailed Issue Description</label>
            <textarea
              required
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the nature of the breakdown or physical condition faults..."
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="w-1/2 bg-gray-50 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
            >
              {submitting ? 'Raising Ticket...' : 'Submit Support Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}