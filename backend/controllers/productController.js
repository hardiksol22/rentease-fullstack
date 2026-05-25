import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' }; // Case-insensitive matching filter

    const products = await Product.find(query).sort('-createdAt');
    res.status(200).json(products);
  } catch (error) { next(error); }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Inventory item entry not found' });
    res.status(200).json(product);
  } catch (error) { next(error); }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) { next(error); }
};