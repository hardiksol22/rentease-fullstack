import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';

// 🛡️ Absolute Path Auto-Resolver for Environment Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
  // ... aapke saare 40 products ka data yahan pehle se jo hai wahi rahega ...
];

const seedDatabase = async () => {
  try {
    // Alert check if URI is missing
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables! Check your backend/.env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔋 Connected securely to your live Atlas Cloud Database Cluster...');

    await Product.deleteMany();
    console.log('🗑️ Flushed out old catalogue rows cleanly...');

    await Product.insertMany(products);
    console.log('🏆 SUCCESS: 40 Enterprise-grade items successfully pushed into RentEase storage!');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Execution Crashed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();