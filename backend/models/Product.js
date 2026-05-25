import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Furniture', 'Appliances'] },
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);