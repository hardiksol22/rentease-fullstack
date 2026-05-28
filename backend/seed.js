import mongoose from 'mongoose';
import Product from './models/Product.js';

const products = [
  // ==================== FURNITURE (20 ITEMS) ====================
  {
    name: 'Luxury 3-Seater Velvet Sofa',
    category: 'Furniture',
    monthlyRent: 900,
    securityDeposit: 3000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    description: 'Premium luxury plush velvet finish sofa set built with seasoned solid wood blocks.'
  },
  {
    name: 'Ergonomic High-Back Office Chair',
    category: 'Furniture',
    monthlyRent: 350,
    securityDeposit: 1000,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80',
    description: 'Fully adjustable office executive chair with lumbar mesh support and dynamic armrests.'
  },
  {
    name: 'Queen Size Solid Wood Bed',
    category: 'Furniture',
    monthlyRent: 1100,
    securityDeposit: 3500,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    description: 'Queen size wood bed frame with integrated under-bed storage hydraulic chambers.'
  },
  {
    name: '6-Seater Glass Top Dining Table',
    category: 'Furniture',
    monthlyRent: 850,
    securityDeposit: 2500,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
    description: 'Tempered glass top dining arrangement supported by a sleek cross metal baseline frame.'
  },
  {
    name: 'Minimalist Study Desk & Drawer Set',
    category: 'Furniture',
    monthlyRent: 300,
    securityDeposit: 900,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    description: 'Space-saving desk workstation featuring built-out slider trays for smart accessory placement.'
  },
  {
    name: 'Modular Wooden Wardrobe',
    category: 'Furniture',
    monthlyRent: 750,
    securityDeposit: 2000,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    description: 'Spacious double door vertical locker cabinet complete with internal grooming drawers and hanging rails.'
  },
  {
    name: 'Vintage Solid Oak Coffee Table',
    category: 'Furniture',
    monthlyRent: 250,
    securityDeposit: 800,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
    description: 'Classic central living room coffee table built using fine textured solid seasoned oak.'
  },
  {
    name: 'Premium Leather Recliner Armchair',
    category: 'Furniture',
    monthlyRent: 650,
    securityDeposit: 2200,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-comfortable single seat leather recliner chair with manual side recline leverage system.'
  },
  {
    name: 'Scandinavian 5-Tier Bookshelf',
    category: 'Furniture',
    monthlyRent: 280,
    securityDeposit: 1100,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    description: 'Open display rack for book organizational setups built with high grade engineered light wood.'
  },
  {
    name: 'Contemporary Wooden TV Unit',
    category: 'Furniture',
    monthlyRent: 400,
    securityDeposit: 1500,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    description: 'Sleek wall-aligned entertainment media storage console unit with specialized wire routing cuts.'
  },
  {
    name: 'Compact 3-Layer Shoe Rack',
    category: 'Furniture',
    monthlyRent: 150,
    securityDeposit: 500,
    image: 'https://images.unsplash.com/photo-1531971589569-0d93700db18f?auto=format&fit=crop&w=600&q=80',
    description: 'Ventilated entry corridor shoe organizer cabinet with premium cushion top seat setup.'
  },
  {
    name: 'Industrial Style Bar Stools (Pair)',
    category: 'Furniture',
    monthlyRent: 220,
    securityDeposit: 700,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
    description: 'High-rise metallic counter bar stools complete with distressed wood circular tops.'
  },
  {
    name: 'Luxury Velvet Dressing Table',
    category: 'Furniture',
    monthlyRent: 480,
    securityDeposit: 1600,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
    description: 'Elegant vanity console circular mirror setup featuring premium velvet padded storage drawers.'
  },
  {
    name: 'Outdoor Rattan Balcony Set',
    category: 'Furniture',
    monthlyRent: 550,
    securityDeposit: 1800,
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=600&q=80',
    description: 'Weatherproof premium rattan weave chairs paired with a compact coffee tempered glass center table.'
  },
  {
    name: 'Modern Accent Lounge Chair',
    category: 'Furniture',
    monthlyRent: 320,
    securityDeposit: 1200,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    description: 'Stylish single accent piece lounge seat matching premium minimal interior design layouts.'
  },
  {
    name: 'Premium Leatherette Bean Bag XL',
    category: 'Furniture',
    monthlyRent: 120,
    securityDeposit: 400,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80',
    description: 'Comfortable double-stitched leatherette lounge bean bag pre-filled with high-density beans.'
  },
  {
    name: 'Luxury Chesterfield King Bed',
    category: 'Furniture',
    monthlyRent: 1500,
    securityDeposit: 5000,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
    description: 'Grand master bedroom tufted chesterfield upholstery bed frame with premium header padding.'
  },
  {
    name: 'Bamboo Patio Rocking Chair',
    category: 'Furniture',
    monthlyRent: 290,
    securityDeposit: 1000,
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80',
    description: 'Relaxing outdoor balcony soothing swing rocking chair crafted with naturally treated seasoned bamboo.'
  },
  {
    name: 'Foldable Wall-Mounted Desk',
    category: 'Furniture',
    monthlyRent: 180,
    securityDeposit: 600,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80',
    description: 'Smart space-optimizing drop-leaf table desk that folds flat against the wall profile when not in use.'
  },
  {
    name: 'Full-Length LED Dresser Cabinet',
    category: 'Furniture',
    monthlyRent: 420,
    securityDeposit: 1400,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=600&q=80',
    description: 'Vertical long glass dressing mirror equipped with back-lit adjustable ambient smart LED strips.'
  },

  // ==================== APPLIANCES (20 ITEMS) ====================
  {
    name: 'Smart Double Door Refrigerator',
    category: 'Appliances',
    monthlyRent: 1200,
    securityDeposit: 4000,
    image: 'https://images.unsplash.com/photo-1571175432267-efb025859357?auto=format&fit=crop&w=600&q=80',
    description: 'Energy saver frost free double door refrigerator with smart digital inverter compressors.'
  },
  {
    name: 'Inverter Front Load Washing Machine',
    category: 'Appliances',
    monthlyRent: 1400,
    securityDeposit: 4500,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    description: 'Fully automatic commercial scale laundry washer unit equipped with deep steam wash loops.'
  },
  {
    name: '4K Ultra HD Smart LED TV (55")',
    category: 'Appliances',
    monthlyRent: 1650,
    securityDeposit: 5000,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    description: 'Cinematic theater display panel containing smart voice control AI assistant hubs.'
  },
  {
    name: 'Convection Microwave Oven 28L',
    category: 'Appliances',
    monthlyRent: 450,
    securityDeposit: 1500,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80',
    description: 'Multi-mode dynamic baking, commercial grilling, and express touch keypad configurations.'
  },
  {
    name: 'Split Air Conditioner 1.5 Ton',
    category: 'Appliances',
    monthlyRent: 1800,
    securityDeposit: 6000,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    description: 'High performance quick cooling split air conditioner with active dust PM2.5 filtering blocks.'
  },
  {
    name: 'Premium RO Water Purifier',
    category: 'Appliances',
    monthlyRent: 499,
    securityDeposit: 1200,
    image: 'https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=600&q=80',
    description: 'Advanced multi-stage taste enhancer water cleaner setup managing active mineral tracking.'
  },
  {
    name: 'HEPA Filter Air Purifier',
    category: 'Appliances',
    monthlyRent: 380,
    securityDeposit: 1300,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
    description: 'Silent operating room indoor air cleaner deals with smoke micro particles and dust counts.'
  },
  {
    name: 'Automatic 12-Place Dishwasher',
    category: 'Appliances',
    monthlyRent: 1100,
    securityDeposit: 3500,
    image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&w=600&q=80',
    description: 'High-temperature hygiene intensive dish washing layout optimized for tough oils and stains.'
  },
  {
    name: 'Digital Induction Cooktop 2100W',
    category: 'Appliances',
    monthlyRent: 180,
    securityDeposit: 600,
    image: 'https://images.unsplash.com/photo-1574269909462-74c637ef3c78?auto=format&fit=crop&w=600&q=80',
    description: 'Polished crystal touch-panel express cooktop with automatic safety shutdown metrics.'
  },
  {
    name: 'Digital Home Theater Soundbar',
    category: 'Appliances',
    monthlyRent: 390,
    securityDeposit: 1400,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description: 'Surround sound audio bar speaker layout paired with a wireless wooden subwoofer console.'
  },
  {
    name: 'Robotic Vacuum Cleaner Bot',
    category: 'Appliances',
    monthlyRent: 700,
    securityDeposit: 2500,
    image: 'https://images.unsplash.com/photo-1569698205704-58e1329ca2e4?auto=format&fit=crop&w=600&q=80',
    description: 'Smart LiDAR mapping automated floor sweeping drone tracking barrier logs effortlessly.'
  },
  {
    name: 'Instant Storage Water Geyser 15L',
    category: 'Appliances',
    monthlyRent: 260,
    securityDeposit: 1000,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    description: 'Glass-lined anti-rust protective internal chamber water geyser with high-pressure ratings.'
  },
  {
    name: '750W 4-Jar Food Processor Set',
    category: 'Appliances',
    monthlyRent: 200,
    securityDeposit: 750,
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy duty kitchen blending multi-mixer system for rapid chopping and extract workflows.'
  },
  {
    name: 'Oil-Free Air Fryer 4.5L',
    category: 'Appliances',
    monthlyRent: 310,
    securityDeposit: 1100,
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=600&q=80',
    description: 'Rapid hot-air circular convection frying appliance built for zero oil snacks creation.'
  },
  {
    name: 'Deep Chest Freezer 100L',
    category: 'Appliances',
    monthlyRent: 800,
    securityDeposit: 2800,
    image: 'https://images.unsplash.com/photo-1604335399105-a0c5e5fd81a1?auto=format&fit=crop&w=600&q=80',
    description: 'Extra thick insulation commercial cooling trunk built for ice creams and frozen assets.'
  },
  {
    name: 'Electric Barbecue Smokeless Grill',
    category: 'Appliances',
    monthlyRent: 240,
    securityDeposit: 800,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    description: 'Indoor non-stick adjustable temperature table-top grill machine for non-smoke cooking.'
  },
  {
    name: 'Vertical Stand Garment Steamer',
    category: 'Appliances',
    monthlyRent: 270,
    securityDeposit: 900,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80e0b96?auto=format&fit=crop&w=600&q=80',
    description: 'Professional high pressure continuous steam clothes straightener with expandable hangers.'
  },
  {
    name: 'Professional Espresso Coffee Station',
    category: 'Appliances',
    monthlyRent: 600,
    securityDeposit: 2000,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description: '15-Bar premium high-pressure Italian pump espresso maker machine with integrated milk frothing wand.'
  },
  {
    name: 'Smart Cold-Press Slow Juicer',
    category: 'Appliances',
    monthlyRent: 330,
    securityDeposit: 1100,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
    description: 'Nutrient retention low speed masticating juicer for high-yield fiber-free natural cold extractions.'
  },
  {
    name: 'Countertop Ice Cube Maker Box',
    category: 'Appliances',
    monthlyRent: 500,
    securityDeposit: 1800,
    image: 'https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?auto=format&fit=crop&w=600&q=80',
    description: 'Express rapid countertop automatic bullet-shaped ice cube maker unit delivering drops in 8 minutes.'
  }
];

const seedDatabase = async () => {
  try {
    // ⚡ AAPKI ASLI MONGO URI STRING DIRECT MESH HO GAYI HAI
    const databaseURI = 'mongodb+srv://rentease_db_user:RentEase2026@cluster0.wwxqnja.mongodb.net/rentease?appName=Cluster0'; 

    await mongoose.connect(databaseURI);
    console.log('🔋 Connected SECURELY and DIRECTLY to your Atlas Cloud Database!');

    await Product.deleteMany();
    console.log('🗑️ Flushed out old catalogue rows cleanly...');

    await Product.insertMany(products);
    console.log('🏆 SUCCESS: 40 Enterprise-grade items successfully pushed into RentEase storage collections!');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Execution Crashed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();