import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
  issueCategory: { type: String, required: true, enum: ['Breakage', 'Functional Fault', 'Delivery Damage', 'General Service'] },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  scheduledDate: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);