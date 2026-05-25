import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, city } = req.query;
    let queryFilter = {};
    if (category && category !== 'All') queryFilter.category = category;
    if (city) queryFilter.cities = city;

    const products = await Product.find(queryFilter);
    res.json(products);
  } catch (error) { next(error); }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) { next(error); }
};