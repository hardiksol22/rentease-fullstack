import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, enum: ['Appliance Malfunction', 'Furniture Wear/Tear', 'Delivery Damage'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Raised', 'In-Progress', 'Resolved'], default: 'Raised' },
  resolutionTimeMinutes: { type: Number, default: null }
}, { timestamps: true });

// FIXED: Changed module.exports to export default
export default mongoose.model('Maintenance', maintenanceSchema);