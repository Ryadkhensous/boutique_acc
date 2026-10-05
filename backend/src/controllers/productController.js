import prisma from '../db.js';
import { initialProducts, mockReviews } from '../data/mockProducts.js';

let isPrismaAvailable = null;

async function checkPrisma() {
  if (isPrismaAvailable !== null) return isPrismaAvailable;
  try {
    if (!prisma) {
      isPrismaAvailable = false;
      return false;
    }
    await prisma.$queryRaw`SELECT 1`;
    isPrismaAvailable = true;
    return true;
  } catch (err) {
    isPrismaAvailable = false;
    console.warn('⚠️ Note: PostgreSQL non disponible localement. Utilisation du mode démonstration avec données en mémoire.');
    return false;
  }
}

// Obtenir la liste des produits avec filtres
export async function getProducts(req, res) {
  try {
    const { category, search, minPrice, maxPrice, sort, featured } = req.query;
    const hasDb = await checkPrisma();

    if (hasDb) {
      const where = {};
      if (category && category !== 'all') {
        where.category = category;
      }
      if (featured === 'true') {
        where.featured = true;
      }
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { material: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      let orderBy = { id: 'asc' };
      if (sort === 'price-asc') orderBy = { price: 'asc' };
      else if (sort === 'price-desc') orderBy = { price: 'desc' };
      else if (sort === 'rating') orderBy = { rating: 'desc' };
      else if (sort === 'newest') orderBy = { createdAt: 'desc' };

      const products = await prisma.product.findMany({
        where,
        orderBy,
        include: { reviews: true }
      });

      return res.json({ success: true, data: products, source: 'database' });
    }

    // Mode repli (fallback en mémoire)
    let filtered = [...initialProducts];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        (p.material && p.material.toLowerCase().includes(s))
      );
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Associer les avis
    const enriched = filtered.map(p => ({
      ...p,
      reviews: mockReviews.filter(r => r.productId === p.id)
    }));

    return res.json({ success: true, data: enriched, source: 'mock' });
  } catch (error) {
    console.error('Erreur getProducts:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des produits' });
  }
}

// Obtenir un produit spécifique par ID ou slug
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const numId = parseInt(id, 10);
    const hasDb = await checkPrisma();

    if (hasDb && !isNaN(numId)) {
      const product = await prisma.product.findUnique({
        where: { id: numId },
        include: { reviews: true }
      });
      if (product) return res.json({ success: true, data: product });
    }

    // Fallback
    const product = initialProducts.find(p => p.id === numId || p.slug === id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }

    const reviews = mockReviews.filter(r => r.productId === product.id);
    return res.json({ success: true, data: { ...product, reviews } });
  } catch (error) {
    console.error('Erreur getProductById:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}

// Obtenir les catégories avec compteurs
export async function getCategories(req, res) {
  const categories = [
    {
      id: 'bijoux',
      name: 'Bijoux Précieux',
      description: 'Colliers, bagues raffinées, bracelets jonc et créoles dorées.',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      count: 4
    },
    {
      id: 'montres',
      name: 'Montres & Horlogerie',
      description: 'Cadrans marbre, mailles milanaises dorées et cuirs nude italiens.',
      icon: 'Clock',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      count: 4
    },
    {
      id: 'casquettes',
      name: 'Casquettes & Chapeaux',
      description: 'Velours côtelé, coton peigné lavé et broderies féminines.',
      icon: 'Smile',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      count: 3
    }
  ];

  return res.json({ success: true, data: categories });
}

// Ajouter un avis
export async function addReview(req, res) {
  try {
    const { productId, author, rating, comment } = req.body;
    if (!productId || !author || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Champs requis manquants' });
    }

    const hasDb = await checkPrisma();
    if (hasDb) {
      const review = await prisma.review.create({
        data: {
          productId: parseInt(productId, 10),
          author,
          rating: parseInt(rating, 10),
          comment
        }
      });
      return res.status(201).json({ success: true, data: review });
    }

    // Fallback
    const newReview = {
      id: Date.now(),
      productId: parseInt(productId, 10),
      author,
      rating: parseInt(rating, 10),
      comment,
      verified: true,
      date: 'À l\'instant'
    };
    mockReviews.unshift(newReview);
    return res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error('Erreur addReview:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout de l\'avis' });
  }
}
