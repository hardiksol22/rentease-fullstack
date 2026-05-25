import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user from database
      req.user = await User.findById(decoded.id).select('-password');
      
      // 🔥 FIX: If the database was cleared/seeded and user is null, block right here gently
      if (!req.user) {
        res.status(401);
        return next(new Error('Your logged-in session user no longer exists in the database. Please logout and register again.'));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Session authorization failed, signature token invalid'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, session bearer token block is missing'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error(`Role (${req.user?.role || 'Guest'}) is not authorized to access this resource`));
    }
    next();
  };
};