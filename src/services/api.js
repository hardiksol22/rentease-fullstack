const mockProducts = [
  { id: 1, title: 'Luxury 3-Seater Velvet Sofa', monthlyRent: 900, deposit: 3000, category: 'Furniture', image: '/sofa.jpg', desc: 'Premium luxury plush velvet finish sofa set built with seasoned wood blocks and high density foam layers.' },
  { id: 2, title: 'Smart Double Door Refrigerator', monthlyRent: 1200, deposit: 4000, category: 'Appliances', image: '/fridge.jpg', desc: 'Energy saver frost free double door refrigerator with smart inverter controls and convertible cooling zones.' },
  { id: 3, title: 'Ergonomic High-Back Office Chair', monthlyRent: 350, deposit: 1000, category: 'Furniture', image: '/chair.jpg', desc: 'Fully adjustable office executive chair with mesh support and multi-directional armrests.' },
  { id: 4, title: 'Inverter Front Load Washing Machine', monthlyRent: 1400, deposit: 4500, category: 'Appliances', image: '/washing-machine.jpg', desc: 'Fully automatic front loader with direct drive technology and built-in hot water heaters.' },
  { id: 5, title: 'Queen Size Solid Wood Bed', monthlyRent: 1100, deposit: 3500, category: 'Furniture', image: '/bed.jpg', desc: 'Queen size wood bed frame with integrated under-bed hydraulic storage chambers.' },
  { id: 6, title: '4K Ultra HD Smart LED TV (55")', monthlyRent: 1650, deposit: 5000, category: 'Appliances', image: '/tv.jpg', desc: 'Cinematic 55-inch theater display with intelligent picture processing and Dolby sound arrays.' },
  { id: 7, title: '6-Seater Glass Top Dining Table', monthlyRent: 850, deposit: 2500, category: 'Furniture', image: '/dining-table.jpg', desc: 'Tempered glass top dining arrangement supported by a sleek metallic cross framework architecture.' },
  { id: 8, title: 'Convection Microwave Oven 28L', monthlyRent: 450, deposit: 1500, category: 'Appliances', image: '/microwave.jpg', desc: 'Multi-mode baking, cooking, grill, and rapid defrost configurations microwave oven.' },
  { id: 9, title: 'Minimalist Study Desk & Drawer Set', monthlyRent: 300, deposit: 900, category: 'Furniture', image: '/desk.jpg', desc: 'Space-saving desk workstation featuring built-out slider trays and cable organization slots.' },
  { id: 10, title: 'Split Air Conditioner 1.5 Ton', monthlyRent: 1800, deposit: 6000, category: 'Appliances', image: '/ac.jpg', desc: 'High capacity split air conditioning system with comprehensive clean dust filters.' },
  { id: 11, title: 'Premium RO Water Purifier', monthlyRent: 499, deposit: 1200, category: 'Appliances', image: '/purifier.jpg', desc: 'Advanced multi-stage RO water purification layout ensuring safe alkaline mineralization logs.' },
  { id: 12, title: 'Modular Wooden Wardrobe', monthlyRent: 750, deposit: 2000, category: 'Furniture', image: '/wardrobe.jpg', desc: 'Spacious double door vertical locker cabinet complete with built-in grooming configurations.' }
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