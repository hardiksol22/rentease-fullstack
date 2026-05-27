import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// 📂 Core Microservices Route Imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; // 🤖 Added: New AI Chatbot Gateway

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 🛰️ Main Resource Routing Mappings
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/chat', chatRoutes); // 🤖 Added: Chatbot Engine Mounted Safely

// 🩺 Global API Gateway Health Check Router (Helps verify Render is alive)
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "RentEase Enterprise Full-Stack API Node Running Smoothly 📦 Engine Status: Live" 
  });
});

// 🔒 Shared Error Handler Pipeline (Production Safe) - Kept at the absolute bottom
app.use((err, req, res, next) => {
  const code = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(code).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 RentEase Server running securely on port ${PORT}`));