import React from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export default function ProductGrid({
  products,
  sortBy,
  setSortBy,
  onQuickView,
  onResetFilters,
  searchQuery
}) {
  return (
    <div className="space-y-6">
      
      {/* Barre de contrôle et tri */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ece5da]">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-luxe-black">
            Notre Sélection Féminine
          </h2>
          <p className="text-xs text-luxe-muted mt-1">
            {products.length} {products.length > 1 ? 'articles disponibles' : 'article disponible'}
            {searchQuery && ` pour la recherche "${searchQuery}"`}
          </p>
        </div>

        {/* Sélecteur de tri */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs font-semibold text-luxe-muted flex items-center gap-1.5 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-600" />
            Trier par :
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#e1d9cc] text-luxe-charcoal text-xs rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition cursor-pointer shadow-sm"
          >
            <option value="featured">✨ Recommandés & Coups de Cœur</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
            <option value="rating">Mieux notés (Avis vérifiés)</option>
          </select>
        </div>
      </div>

      {/* Grille des produits */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* État vide si aucun produit ne correspond aux filtres */
        <div className="text-center py-16 bg-white rounded-3xl border border-[#eee7da] p-8 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-luxe-black">
            Aucun accessoire trouvé
          </h3>
          <p className="text-xs text-luxe-muted mt-2 max-w-xs mx-auto leading-relaxed">
            Nous n'avons trouvé aucun résultat avec vos critères actuels. Essayez d'élargir votre recherche.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

    </div>
  );
}
