import React, { useState, useEffect } from 'react';
import ProductCard from '../components/catalog/ProductCard.jsx';
import { api } from '../services/api.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getProducts().then(data => setProducts(data));
  }, []);

  const filtered = products.filter(p => 
    (category === 'All' || p.category === category) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-sans">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-6">
            ✨ Premium Living, Simplified
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 max-w-3xl mx-auto leading-[1.1]">
            Don't Buy It. <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RentEase</span> It with Flexibility.
          </h1>
          <p className="text-gray-500 mt-6 text-lg md:text-xl max-w-xl mx-auto font-medium">
            Subscribe to top-tier furniture and home appliances on customizable monthly arrangements.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 border-b border-gray-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🚚', title: 'Free 48-Hour Delivery', desc: 'Complimentary shipping and premium configuration' },
            { icon: '🛠️', title: 'Free Maintenance', desc: 'On-demand technical support over your entire lease term' },
            { icon: '🔄', title: 'Flexible Tenures', desc: 'Choose between 3, 6, or 12-month commitment models' },
            { icon: '🛡️', title: 'Damage Protection', desc: 'Covered repairs for minor standard wear and tear' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start p-2">
              <span className="text-3xl p-3 bg-gray-50 rounded-xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="catalog" className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search products, styles, sets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 outline-none transition-all"
            />
            <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">🔍</span>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {['All', 'Furniture', 'Appliances'].map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm tracking-tight transition-all duration-200 whitespace-nowrap ${
                  category === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Available Premium Collections</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Curated subscription choices for your lifestyle</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl max-w-xl mx-auto p-8 shadow-sm">
            <span className="text-4xl">📦</span>
            <h3 className="text-lg font-bold text-gray-900 mt-4">No Inventory Matches</h3>
            <p className="text-gray-500 text-sm mt-1">We couldn't find items matching "{search}".</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-5 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors">
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-600 font-bold">
          <p>© 2026 RentEase Inc. All rights specified under full-stack production protocols.</p>
        </div>
      </footer>
    </div>
  );
}