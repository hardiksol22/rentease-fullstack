import Rental from '../models/Rental.js';
import Product from '../models/Product.js';

export const createRental = async (req, res, next) => {
  const { productId, tenureSelected, deliveryDate, deliveryLocation } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product || product.stock < 1) {
      return res.status(400).json({ message: 'Target inventory asset out of stock' });
    }

    let finalRentValue = product.monthlyRent;
    if (tenureSelected === 6) finalRentValue = Math.round(product.monthlyRent * 0.95);
    if (tenureSelected === 12) finalRentValue = Math.round(product.monthlyRent * 0.90);

    const leaseEnd = new Date();
    leaseEnd.setMonth(leaseEnd.getMonth() + tenureSelected);

    const rentalOrder = await Rental.create({
      userId: req.user._id,
      productId,
      tenureSelected,
      monthlyRentApplied: finalRentValue,
      securityDepositPaid: product.securityDeposit,
      deliveryDate,
      deliveryLocation,
      endDate: leaseEnd
    });

    product.stock -= 1;
    await product.save();

    res.status(201).json(rentalOrder);
  } catch (error) { next(error); }
};

export const getUserRentals = async (req, res, next) => {
  try {
    const activeAgreements = await Rental.find({ userId: req.user._id }).populate('productId');
    res.json(activeAgreements);
  } catch (error) { next(error); }
};