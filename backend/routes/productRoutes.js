import express from 'express';
import {
  registerProduct,
  getProducts,
  getProductById,  
  updateProduct,
  deleteProduct,
  getProductByName
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(registerProduct);

router.route('/name/:name')
  .get(getProductByName);

router.route('/:id')
  .get(getProductById)  
  .put(updateProduct)
  .delete(deleteProduct);

export default router;