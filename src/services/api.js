const mockProducts = [
  { 
    id: 1, 
    title: 'Luxury 3-Seater Velvet Sofa', 
    monthlyRent: 900, 
    deposit: 3000, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', 
    desc: 'Premium luxury plush velvet finish sofa set built with seasoned wood blocks and high density foam layers.' 
  },
  { 
    id: 2, 
    title: 'Smart Double Door Refrigerator', 
    monthlyRent: 1200, 
    deposit: 4000, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1571175432267-efb025859357?auto=format&fit=crop&w=600&q=80', 
    desc: 'Energy saver frost free double door refrigerator with smart inverter controls and convertible cooling zones.' 
  },
  { 
    id: 3, 
    title: 'Ergonomic High-Back Office Chair', 
    monthlyRent: 350, 
    deposit: 1000, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80', 
    desc: 'Fully adjustable office executive chair with mesh support and multi-directional armrests.' 
  },
  { 
    id: 4, 
    title: 'Inverter Front Load Washing Machine', 
    monthlyRent: 1400, 
    deposit: 4500, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80', 
    desc: 'Fully automatic front loader with direct drive technology and built-in hot water heaters.' 
  },
  { 
    id: 5, 
    title: 'Queen Size Solid Wood Bed', 
    monthlyRent: 1100, 
    deposit: 3500, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80', 
    desc: 'Queen size wood bed frame with integrated under-bed hydraulic storage chambers.' 
  },
  { 
    id: 6, 
    title: '4K Ultra HD Smart LED TV (55")', 
    monthlyRent: 1650, 
    deposit: 5000, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80', 
    desc: 'Cinematic 55-inch theater display with intelligent picture processing and Dolby sound arrays.' 
  },
  { 
    id: 7, 
    title: '6-Seater Glass Top Dining Table', 
    monthlyRent: 850, 
    deposit: 2500, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80', 
    desc: 'Tempered glass top dining arrangement supported by a sleek metallic cross framework architecture.' 
  },
  { 
    id: 8, 
    title: 'Convection Microwave Oven 28L', 
    monthlyRent: 450, 
    deposit: 1500, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80', 
    desc: 'Multi-mode baking, cooking, grill, and rapid defrost configurations microwave oven.' 
  },
  { 
    id: 9, 
    title: 'Minimalist Study Desk & Drawer Set', 
    monthlyRent: 300, 
    deposit: 900, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80', 
    desc: 'Space-saving desk workstation featuring built-out slider trays and cable organization slots.' 
  },
  { 
    id: 10, 
    title: 'Split Air Conditioner 1.5 Ton', 
    monthlyRent: 1800, 
    deposit: 6000, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', 
    desc: 'High capacity split air conditioning system with comprehensive clean dust filters.' 
  },
  { 
    id: 11, 
    title: 'Premium RO Water Purifier', 
    monthlyRent: 499, 
    deposit: 1200, 
    category: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=600&q=80', 
    desc: 'Advanced multi-stage RO water purification layout ensuring safe alkaline mineralization logs.' 
  },
  { 
    id: 12, 
    title: 'Modular Wooden Wardrobe', 
    monthlyRent: 750, 
    deposit: 2000, 
    category: 'Furniture', 
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80', 
    desc: 'Spacious double door vertical locker cabinet complete with built-in grooming configurations.' 
  }
];

export const api = {
  getProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 80));
    return mockProducts;
  },
  getProductById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 40));
    return mockProducts.find(p => p.id === parseInt(id));
  }
};