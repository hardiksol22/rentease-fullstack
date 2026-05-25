import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';
import ProductCard from '../components/catalog/ProductCard.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Automatically captures the global parameters coming from the updated Navbar component search form
  const [searchParams] = useSearchParams();
  const searchUrlQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchInventoryData = async () => {
      setLoading(true);
      try {
        // Invokes data layer fetching filters matching both Navbar text and sticky categories
        const data = await api.getProducts(category, searchUrlQuery);
        setProducts(data);
        setError('');
      } catch (err) {
        console.error("Catalog synchronization fault line:", err);
        setError('Failed to stream catalogue records matching search profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [category, searchUrlQuery]); // Triggers reload instantly whenever category tabs or search query variables shift

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* Short Dynamic Subnavbar Category Filters Bar */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3.5 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-3">
          {[
            { label: '✨ All items', val: '' },
            { label: '🛋️ Furniture', val: 'Furniture' },
            { label: '🔌 Appliances', val: 'Appliances' }
          ].map((btn) => (
            <button
              key={btn.val} onClick={() => setCategory(btn.val)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                category === btn.val ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Grid Layout Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {searchUrlQuery && (
          <p className="mb-6 text-xs text-gray-500 font-bold bg-white border inline-block px-3 py-1.5 rounded-xl shadow-sm">
            🔎 Showing search results for: <span className="text-blue-600">"{searchUrlQuery}"</span>
          </p>
        )}

        {loading ? (
          <div className="text-center py-24 text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Streaming Marketplace Clusters...</div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 text-red-600 rounded-2xl max-w-sm mx-auto p-4 font-bold text-sm">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl text-gray-400 font-bold text-sm max-w-md mx-auto p-8 shadow-sm">
            <span className="text-3xl block mb-2">📦</span>
            No premium products match your current keyword query search filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}