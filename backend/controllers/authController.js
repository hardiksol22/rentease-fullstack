import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// FIXED: Swapped 'exports.registerUser' for proper ES Module 'export const'
export const registerUser = async (req, res, next) => {
  const { name, email, password, role, city } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User identity email is already registered' });

    const user = await User.create({ name, email, password, role, city });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      city: user.city,
      token: generateToken(user._id)
    });
  } catch (error) { next(error); }
};

// FIXED: Swapped 'exports.loginUser' for proper ES Module 'export const'
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        city: user.city,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid authentication credentials matching records' });
    }
  } catch (error) { next(error); }
};