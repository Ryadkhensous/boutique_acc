import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import FeaturesSection from './components/FeaturesSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';
import { CartProvider, useCart } from './context/CartContext';
import { defaultProducts } from './data/fallbackProducts';

function BoutiqueMain() {
  const [products, setProducts] = useState(defaultProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const {
    selectedProduct,
    setSelectedProduct,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  // Chargement depuis l'API Node.js backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'all') queryParams.append('category', activeCategory);
        if (searchQuery) queryParams.append('search', searchQuery);

        const res = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setProducts(json.data);
            return;
          }
        }
      } catch (err) {
        // En cas d'indisponibilité du backend local, conserve la source enrichie par défaut
      }
    }
    fetchProducts();
  }, [activeCategory, searchQuery]);

  // Filtrage et Tri en mémoire
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // Filtre catégorie
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filtre sous-catégorie
    if (activeSubCategory !== 'all') {
      result = result.filter(p => p.subCategory && p.subCategory.toLowerCase() === activeSubCategory.toLowerCase());
    }

    // Filtre recherche texte
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // Tri
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, activeSubCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveSubCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleReviewAdded = (productId, newReview) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          return {
            ...p,
            reviews: [newReview, ...currentReviews],
            reviewCount: (p.reviewCount || 0) + 1
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Header avec Navigation, Recherche et Panier */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('all');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1">
        {/* Bannière Hero Visuelle */}
        <HeroBanner
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setActiveSubCategory('all');
            const el = document.getElementById('catalogue-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section Principale Boutique & Catalogue */}
        <section id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Cartes de catégories interactives */}
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            activeSubCategory={activeSubCategory}
            onSelectSubCategory={setActiveSubCategory}
            productsCount={displayedProducts.length}
          />

          {/* Grille des articles avec tri */}
          <ProductGrid
            products={displayedProducts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onQuickView={(p) => setSelectedProduct(p)}
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
          />

        </section>

        {/* Engagements & Savoir-faire */}
        <FeaturesSection />

        {/* Inscription Club Privé & -10% */}
        <NewsletterSection />
      </main>

      {/* Pied de Page */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Modale Détails & Avis Produit */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onReviewAdded={handleReviewAdded}
      />

      {/* Tiroir Panier coulissant */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Modale de Paiement & Commande */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Modale Liste de Favoris */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        allProducts={products}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          setSelectedProduct(p);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BoutiqueMain />
    </CartProvider>
  );
}
