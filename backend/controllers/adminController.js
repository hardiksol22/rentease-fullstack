import Rental from '../models/Rental.js';
import Maintenance from '../models/Maintenance.js';
import Product from '../models/Product.js';

export const getDashboardKPIs = async (req, res, next) => {
  try {
    const totalActiveAgreements = await Rental.find({ isActive: true });
    
    // Sum active rent prices to produce platform MRR metric
    const mrrCalculated = totalActiveAgreements.reduce((sum, item) => sum + item.monthlyRentApplied, 0);

    // Compute Product Utilization index parameters
    const totalInventoryCount = await Product.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]);
    const availableStockCount = totalInventoryCount[0]?.total || 0;
    const activeContractsCount = totalActiveAgreements.length;
    const utilizationRateIndex = (activeContractsCount + availableStockCount) > 0
      ? (activeContractsCount / (activeContractsCount + availableStockCount)) * 100
      : 0;

    const remainingTickets = await Maintenance.countDocuments({ status: { $ne: 'Resolved' } });

    res.json({
      numberOfActiveRentals: activeContractsCount,
      monthlyRecurringRevenue: mrrCalculated,
      productUtilizationRate: `${utilizationRateIndex.toFixed(1)}%`,
      pendingTicketsCount: remainingTickets
    });
  } catch (error) { next(error); }
};