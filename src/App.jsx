import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Shell Mappings
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx'; // ⚡ UI FIX: Footer imported safely

// Core Platform Pages
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

// Core Accounts & Dashboard Architectures
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminRegister from './pages/AdminRegister.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

// Global Artificial Intelligence Addon Widget
import AIChatbot from './components/common/AIChatbot.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50/30 text-gray-900 font-sans antialiased">
      <div>
        {/* Top Header Floating Navigation Shell */}
        <Navbar />
        
        {/* Main Routed Viewport Pipeline */}
        <main className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </main>
      </div>

      {/* 🟢 GLOBAL FIX: Footer mounted perfectly at the absolute base of DOM tree */}
      <Footer />

      {/* Persistent AI Float Agent Layer */}
      <AIChatbot />
    </div>
  );
}