import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Structure Component (FIXED: Aligned to your layout folder path)
import Navbar from './components/layout/Navbar.jsx'; 

// Core Marketplace & Customer Journey Pages
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

// Core Identity Access & Dashboard Systems
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
// Open frontend/src/App.jsx and append these imports at the top:
import AdminRegister from './pages/AdminRegister.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-sans antialiased">
      {/* Global Navigation Bar rendered across all routing pages */}
      <Navbar />
      
      <main>
        <Routes>
          {/* Public Marketplace Catalog Mappings */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Authentication Access Endpoints */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User & Administration Central Command Spaces */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/*Inside your <Routes> system stack, add these lines*/}
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  );
}