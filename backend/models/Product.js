import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Furniture', 'Appliances'], required: true },
  subCategory: { type: String, enum: ['bed', 'sofa', 'table', 'fridge', 'washing machine', 'TV'], required: true },
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  tenureOptions: { type: [Number], default: [3, 6, 12] },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 5 },
  cities: { type: [String], default: ['Mumbai', 'Delhi', 'Bangalore'] },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// FIXED: Changed module.exports to export default
export default mongoose.model('Product', productSchema);