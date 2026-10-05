import { PrismaClient } from '@prisma/client';
import { initialProducts, mockReviews } from '../src/data/mockProducts.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du peuplement de la base de données (Prisma Seed)...');

  // Nettoyage préalable
  try {
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    console.log(' Anciennes données purgées avec succès.');
  } catch (e) {
    console.log(' Table vierge ou première initialisation.');
  }

  // Insertion des produits
  for (const prod of initialProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        originalPrice: prod.originalPrice,
        category: prod.category,
        subCategory: prod.subCategory,
        images: prod.images,
        inStock: prod.inStock,
        stockCount: prod.stockCount,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        badge: prod.badge,
        material: prod.material,
        featured: prod.featured
      }
    });
    console.log(` Produit inséré : ${createdProduct.name}`);
  }

  // Insertion des avis
  for (const review of mockReviews) {
    await prisma.review.create({
      data: {
        id: review.id,
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        verified: review.verified,
        productId: review.productId
      }
    });
  }

  console.log('✅ Base de données initialisée avec succès avec tous les bijoux, montres et casquettes !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed Prisma:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
