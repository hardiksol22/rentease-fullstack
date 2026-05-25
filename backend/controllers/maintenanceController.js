import Maintenance from '../models/Maintenance.js';
import Rental from '../models/Rental.js';

export const raiseTicket = async (req, res, next) => {
  try {
    const { rentalId, issueCategory, description } = req.body;

    const validRental = await Rental.findOne({ _id: rentalId, userId: req.user._id });
    if (!validRental) return res.status(403).json({ message: 'Invalid contract ownership verification' });

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 2); // 48-hour technician visit window

    const ticket = await Maintenance.create({
      userId: req.user._id,
      rentalId,
      issueCategory,
      description,
      scheduledDate
    });

    res.status(201).json({ success: true, ticket });
  } catch (error) { next(error); }
};

export const getUserTickets = async (req, res, next) => {
  try {
    const tickets = await Maintenance.find({ userId: req.user._id })
      .populate({
        path: 'rentalId',
        populate: { path: 'productId', select: 'name image' }
      })
      .sort('-createdAt');
    res.status(200).json(tickets);
  } catch (error) { next(error); }
};