import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  tenureSelected: { type: Number, required: true },
  monthlyRentApplied: { type: Number, required: true },
  securityDepositPaid: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  deliveryLocation: { type: String, required: true },
  deliveryStatus: { type: String, enum: ['Pending', 'In Transit', 'Delivered', 'Returned'], default: 'Pending' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// FIXED: Changed module.exports to export default
export default mongoose.model('Rental', rentalSchema);