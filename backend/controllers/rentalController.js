import Rental from '../models/Rental.js';
import Product from '../models/Product.js';

export const createRental = async (req, res, next) => {
  try {
    const { productId, tenureSelected, monthlyRentApplied, securityDepositPaid, deliveryLocation } = req.body;

    const productExists = await Product.findById(productId);
    if (!productExists) return res.status(404).json({ message: 'Target inventory asset not found' });

    const startDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(startDate.getDate() + 3); // 3-day buffer window

    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + Number(tenureSelected));

    const rental = await Rental.create({
      userId: req.user._id,
      productId,
      tenureSelected,
      monthlyRentApplied,
      securityDepositPaid,
      deliveryLocation,
      deliveryDate,
      endDate
    });

    res.status(201).json({ success: true, rental });
  } catch (error) { next(error); }
};

export const getUserRentals = async (req, res, next) => {
  try {
    // Fetches all matching rentals; for admins, it exposes the holistic pool for metrics tracking
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const rentals = await Rental.find(filter)
      .populate('productId', 'name image category')
      .sort('-createdAt');
    res.status(200).json(rentals);
  } catch (error) { next(error); }
};