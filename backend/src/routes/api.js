import express from 'express';
import { getProducts, getProductById, getCategories, addReview } from '../controllers/productController.js';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { register, login, getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Produits
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);
router.post('/reviews', addReview);

// Commandes
router.post('/orders', createOrder);
router.get('/orders', getOrders);

// Espace Utilisateur & Authentification
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/user/profile', getProfile);
router.put('/user/profile', updateProfile);

// Health check pour Render
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'boutique-accessoires-api'
  });
});

export default router;
