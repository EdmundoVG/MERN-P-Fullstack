import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js';

// @desc    Registrar nuevo producto
// @route   POST /api/products
// @access  Público
const registerProduct = asyncHandler(async (req, res) => {
  const { 
    name, 
    description, 
    price, 
    category, 
    stock, 
    brand,
    rating,
    discountPercentage 
  } = req.body;

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error('Producto ya existe');
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    brand,
    rating,
    discountPercentage
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      brand: product.brand,
      rating: product.rating,
      discountPercentage: product.discountPercentage
    });
  } else {
    res.status(400);
    throw new Error('Información de Producto inválida');
  }
});

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Público
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    Obtener producto por nombre
// @route   GET /api/products/name/:name
// @access  Público
const getProductByName = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

// @desc    Actualizar producto
// @route   PUT /api/products/:id
// @access  Público
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;
    product.brand = req.body.brand || product.brand;
    product.rating = req.body.rating || product.rating;
    product.discountPercentage = req.body.discountPercentage || product.discountPercentage;

    const updatedProduct = await product.save();

    res.status(200).json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      stock: updatedProduct.stock,
      brand: updatedProduct.brand,
      rating: updatedProduct.rating,
      discountPercentage: updatedProduct.discountPercentage
    });
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

// @desc    Eliminar producto
// @route   DELETE /api/products/:id
// @access  Público
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).json({ message: 'Producto eliminado' });
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

export {
  registerProduct,
  getProducts,
  getProductByName,
  updateProduct,
  deleteProduct,
  getProductById
};