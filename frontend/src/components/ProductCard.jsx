import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  // Parsing des images
  let imagesList = [];
  try {
    imagesList = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {
    imagesList = [product.images || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'];
  }

  const primaryImage = imagesList[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f';
  const secondaryImage = imagesList[1] || primaryImage;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Badge styling
  const getBadgeStyle = (badge) => {
    if (!badge) return null;
    if (badge.includes('-') || badge.includes('%')) {
      return 'bg-rose-500 text-white';
    }
    if (badge === 'Bestseller') {
      return 'bg-amber-600 text-white';
    }
    if (badge === 'Coup de Cœur') {
      return 'bg-blush-600 text-white';
    }
    return 'bg-[#2a2421] text-gold-200';
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#eee7da] hover:border-gold-300 shadow-sm hover:shadow-soft transition-all duration-300 flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Zone Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#faf7f2]">
        
        {/* Images avec transition au survol */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isHovered && secondaryImage !== primaryImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 group-hover:scale-105'
          }`}
          loading="lazy"
        />
        {secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} vue 2`}
            className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge en haut à gauche */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Bouton Favori en haut à droite */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Ajouter aux favoris"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-rose-500 hover:bg-white transition-all transform active:scale-90"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Bouton Aperçu Rapide (au survol sur desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-luxe-black hover:text-gold-700 text-xs font-semibold py-2.5 rounded-xl shadow-md border border-[#e8e2d5] flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Aperçu Rapide
          </button>
        </div>

      </div>

      {/* Zone Informations Produit */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Note & Avis */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-luxe-muted font-medium">
              ({product.reviewCount || 12})
            </span>
          </div>

          {/* Matière / Caractéristique */}
          {product.material && (
            <p className="text-[11px] text-gold-700 font-medium uppercase tracking-wider mb-1 line-clamp-1">
              {product.material}
            </p>
          )}

          {/* Titre */}
          <h4 className="font-serif text-sm sm:text-base font-semibold text-luxe-black line-clamp-1 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h4>
        </div>

        {/* Prix et Bouton Ajout */}
        <div className="pt-2 border-t border-[#f4f0e8] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg font-bold text-luxe-black">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">
              En stock ({product.stockCount || 10})
            </span>
          </div>

          {/* Bouton d'ajout */}
          <button
            onClick={handleAddToCart}
            disabled={justAdded}
            className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-[#2d2724] hover:bg-gold-600 text-white active:scale-95'
            }`}
            title="Ajouter au panier"
            aria-label="Ajouter au panier"
          >
            {justAdded ? (
              <Check className="w-4 h-4 animate-scale" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
