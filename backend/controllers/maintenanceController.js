import Maintenance from '../models/Maintenance.js';

export const createTicket = async (req, res, next) => {
  const { rentalId, issueType, description } = req.body;
  try {
    const ticket = await Maintenance.create({
      rentalId,
      userId: req.user._id,
      issueType,
      description
    });
    res.status(201).json(ticket);
  } catch (error) { next(error); }
};

export const updateTicketStatus = async (req, res, next) => {
  const { ticketId } = req.params;
  const { status, resolutionTimeMinutes } = req.body;
  try {
    const updatedTicket = await Maintenance.findByIdAndUpdate(
      ticketId, 
      { status, resolutionTimeMinutes }, 
      { new: true }
    );
    res.json(updatedTicket);
  } catch (error) { next(error); }
};