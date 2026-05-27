import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useCart } from '../hooks/useCart.js';
import { AuthContext } from '../context/AuthContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [tenure, setTenure] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getCleanProductionImage = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
    if (imagePath.includes('localhost:5000')) {
      return `https://via.placeholder.com/800x600/f3f4f6/2563eb?text=${encodeURIComponent(product.name)}`;
    }
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return imagePath;
  };

  useEffect(() => {
    api.getProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Details Loading Error:", err);
        setError('Product configurations profile fetching failed.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-24 text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Item Spec Profile Sheet...</div>;
  if (error || !product) return <div className="text-center py-12 text-red-500 font-bold">{error || 'Product not found.'}</div>;

  let discountFactor = 1.0;
  if (tenure === 6) discountFactor = 0.95;
  if (tenure === 12) discountFactor = 0.90;
  const currentCalculatedRent = Math.round(product.monthlyRent * discountFactor);

  const handleAddToCart = () => {
    addToCart({ ...product, tenure, calculatedRent: currentCalculatedRent });
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
          <img 
            src={getCleanProductionImage(product.image)} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <span className="absolute top-4 left-4 bg-gray-950 text-white font-black text-[10px] tracking-widest px-3 py-1.5 rounded-xl uppercase">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">{product.name}</h1>
            <p className="text-xs text-gray-400 mt-2 font-semibold">Refundable Security Deposit: <span className="text-gray-800 font-bold">₹{product.securityDeposit}</span></p>
            <p className="text-gray-500 text-sm mt-5 leading-relaxed font-medium">{product.description}</p>

            <div className="mt-8">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Choose Lease Commitment Duration</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { months: 3, perk: 'Standard' },
                  { months: 6, perk: '5% Disc.' },
                  { months: 12, perk: '10% Disc.' }
                ].map((plan) => (
                  <button
                    key={plan.months} type="button" onClick={() => setTenure(plan.months)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      tenure === plan.months
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/10 font-bold'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="text-sm font-black">{plan.months} Months</div>
                    <div className="text-[9px] text-gray-400 tracking-wide mt-0.5 uppercase font-bold">{plan.perk}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Adjusted Billing Plan</span>
              <p className="text-3xl font-black text-blue-600 tracking-tight mt-0.5">
                ₹{currentCalculatedRent}<span className="text-xs text-gray-400 font-bold tracking-normal">/mo</span>
              </p>
            </div>
            <button onClick={handleAddToCart} className="bg-gray-900 hover:bg-blue-600 text-white font-black py-4 px-8 rounded-2xl shadow-md text-xs uppercase tracking-wider transition-all duration-200">
              Add to Rental Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}