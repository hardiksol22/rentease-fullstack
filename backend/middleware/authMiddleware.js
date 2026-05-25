import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Mongoose 9 User lookup interface
      const UserCollection = mongoose.model('User');
      req.user = await UserCollection.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Unauthorized request session token verification rejected'));
    }
  }
  if (!token) {
    res.status(401);
    return next(new Error('Access blocked token signature missing'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403);
      next(new Error(`Permission mismatch permissions role hierarchy unauthorized`));
    }
  };
};