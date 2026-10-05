import express from 'express';
import { getProducts, getProductById, getCategories, addReview } from '../controllers/productController.js';
import { createOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Produits
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);
router.post('/reviews', addReview);

// Commandes
router.post('/orders', createOrder);
router.get('/orders', getOrders);

// Health check pour Render
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'boutique-accessoires-api'
  });
});

export default router;
