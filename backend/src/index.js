import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration CORS permissive pour développement et déploiement
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logger de requêtes simple
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Routes API
app.use('/api', apiRoutes);

// Route d'accueil API
app.get('/', (req, res) => {
  res.json({
    name: 'Boutique Accessoires Féminins API',
    description: 'API Node.js + Prisma pour Bijoux, Montres et Casquettes',
    documentation: {
      products: '/api/products',
      categories: '/api/categories',
      orders: '/api/orders',
      health: '/api/health'
    },
    status: 'en ligne'
  });
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error('Erreur non interceptée:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`✨ Serveur API démarré sur http://localhost:${PORT}`);
  console.log(`📦 Prêt pour déploiement sur Render (Port ${PORT})`);
});
