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
  const [tenure, setTenure] = useState(3); // Default to 3 months commitment plan   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState('');

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

  // Real-time Business Logic pricing rules   
  let discountFactor = 1.0;   
  if (tenure === 6) discountFactor = 0.95;   
  if (tenure === 12) discountFactor = 0.90;   
  const currentCalculatedRent = Math.round(product.monthlyRent * discountFactor);

  const handleAddToCart = () => {     
    // Injecting active tenure choice seamlessly into the item metadata package     
    addToCart({ ...product, tenure, calculatedRent: currentCalculatedRent });     
    navigate('/cart');   
  };

  return (     
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">       
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">         
        
        {/* Left Side: Product Image Display */}         
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">           
          <img             
            src={product.image} 
            alt={product.name}             
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"           
          />           
          <span className="absolute top-4 left-4 bg-gray-950 text-white font-black text-[10px] tracking-widest px-3 py-1.5 rounded-xl uppercase">             
            {product.category}           
          </span>         
        </div>

        {/* Right Side: Product Configuration & Business Rules */}         
        <div className="flex flex-col justify-between">           
          <div>             
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">{product.name}</h1>             
            <p className="text-xs text-gray-400 mt-2 font-semibold">Refundable Security Deposit: <span className="text-gray-800 font-bold">₹{product.securityDeposit}</span></p>             
            <p className="text-gray-500 text-sm mt-5 leading-relaxed font-medium">{product.description || "Premium verified subscription logistics catalog deployment asset model optimized for dynamic rental lifecycles."}</p>

            {/* Tenure Adjustment Buttons */}             
            <div className="mt-8">               
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Choose Lease Commitment Duration</h3>               
              <div className="grid grid-cols-3 gap-3">                 
                {[                   
                  { months: 3, perk: 'Standard' },                   
                  { months: 6, perk: '5% Disc.' },                   
                  { months: 12, perk: '10% Disc.' }                 
                ].map((plan) => (                   
                  <button                     
                    key={plan.months} 
                    type="button" 
                    onClick={() => setTenure(plan.months)}                     
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

          {/* Pricing Summary & Add to Cart Trigger */}
          <div className="mt-8 pt-6 border-t border-dashed border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Adjusted Subscription Rate</p>
                <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">
                  ₹{currentCalculatedRent}<span className="text-sm text-gray-400 font-bold">/mo</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Refundable Security Bond</p>
                <p className="text-lg font-bold text-gray-700 mt-1">₹{product.securityDeposit}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all duration-300"
            >
              Add To Rental Cart
            </button>
          </div>

        </div>       
      </div>     
    </div>   
  ); 
}