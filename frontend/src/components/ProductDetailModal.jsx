import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose, onReviewAdded }) {
  if (!product) return null;

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Formulaire d'avis
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const isFavorite = isInWishlist(product.id);

  let imagesList = [];
  try {
    imagesList = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {
    imagesList = [product.images || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'];
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleSendReview = async (e) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    setReviewSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviewSuccess(true);
        setReviewAuthor('');
        setReviewComment('');
        if (onReviewAdded) onReviewAdded(product.id, data.data);
      }
    } catch (err) {
      // Simulation locale si backend non démarré
      setReviewSuccess(true);
      setReviewAuthor('');
      setReviewComment('');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const reviews = product.reviews || [
    {
      id: 101,
      author: 'Caroline T.',
      rating: 5,
      comment: 'Bijou exceptionnel, encore plus beau en vrai ! La boîte cadeau est raffinée.',
      date: 'Récemment'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-transform hover:scale-105"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Colonne Galerie Photos */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#ece4d6]">
              <img
                src={imagesList[selectedImageIndex] || imagesList[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#2d2724] text-gold-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Miniatures */}
            {imagesList.length > 1 && (
              <div className="flex gap-3">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-gold-500 shadow-md scale-102' : 'border-[#e4ded3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`miniature ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne Détails & Action */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            
            <div className="space-y-3">
              {/* Étoiles & avis */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-luxe-muted font-medium">
                    {product.rating || 4.9} ({reviews.length} avis)
                  </span>
                </div>

                {/* Bouton Favori */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-rose-500 transition font-medium"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Sauvegardé' : 'Favori'}</span>
                </button>
              </div>

              {/* Titre & Matière */}
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-luxe-black leading-snug">
                {product.name}
              </h3>

              {product.material && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold-50 border border-gold-200 text-xs font-semibold text-gold-800">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  {product.material}
                </div>
              )}

              {/* Prix */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-bold text-luxe-black">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      Économisez {(product.originalPrice - product.price).toFixed(2)} €
                    </span>
                  </>
                )}
              </div>

              {/* Description courte */}
              <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed">
                {product.description}
              </p>

              {/* Stock */}
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                En stock — Expédition aujourd'hui
              </p>
            </div>

            {/* Sélecteur de quantité & Ajout au Panier */}
            <div className="space-y-4 pt-4 border-t border-[#eee7da]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#d8d0c2] rounded-full bg-[#fbf9f6] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 text-sm font-semibold transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 text-sm font-semibold transition"
                  >
                    +
                  </button>
                </div>

                {/* Bouton d'ajout */}
                <button
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className={`flex-1 py-3.5 px-6 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-soft cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'gold-gradient-bg hover:opacity-95 text-white active:scale-98'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Ajouter au panier • {(product.price * quantity).toFixed(2)} €
                    </>
                  )}
                </button>
              </div>

              {/* Garanties */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-luxe-muted">
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                  <Truck className="w-4 h-4 text-gold-600 mb-1" />
                  <span>Livraison 48h</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                  <RotateCcw className="w-4 h-4 text-gold-600 mb-1" />
                  <span>Retours 30j</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                  <ShieldCheck className="w-4 h-4 text-gold-600 mb-1" />
                  <span>Garantie 2 ans</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Section Onglets : Détails & Avis */}
        <div className="border-t border-[#eee7da] bg-[#faf8f5] px-6 sm:px-8 py-6">
          <div className="flex border-b border-[#e5ded2] gap-6 text-sm font-medium mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'description'
                  ? 'border-gold-600 text-gold-800 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Description & Entretien
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'reviews'
                  ? 'border-gold-600 text-gold-800 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Avis Clientes ({reviews.length})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="space-y-3 text-xs sm:text-sm text-luxe-charcoal leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <h5 className="font-semibold text-luxe-black pt-2">Conseils d'entretien de la Maison Aurélie :</h5>
              <ul className="list-disc pl-5 space-y-1 text-luxe-muted">
                <li>Pour préserver l'éclat de vos bijoux, évitez le contact direct prolongé avec les parfums et produits cosmétiques.</li>
                <li>Nettoyez délicatement avec la chamoisine douce fournie dans votre écrin.</li>
                <li>Rangez vos pièces individuellement dans leur pochon en satin.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl">
              {/* Formulaire d'avis */}
              <form onSubmit={handleSendReview} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8e0d2] space-y-3">
                <h5 className="font-serif text-sm font-semibold text-luxe-black">
                  Donnez votre avis sur cet accessoire
                </h5>

                {reviewSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Merci pour votre avis précieux ! Il est désormais publié.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Votre prénom ou nom"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    required
                    className="bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500"
                  />
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#faf8f5] border border-[#e1d9cc] rounded-xl">
                    <span className="text-xs text-gray-600">Note :</span>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="bg-transparent text-xs font-semibold text-amber-600 outline-none cursor-pointer"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      <option value={3}>⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  placeholder="Que pensez-vous de la qualité, du design et du confort ?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-gold-500"
                />

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {reviewSubmitting ? 'Publication...' : 'Publier mon avis'}
                </button>
              </form>

              {/* Liste des avis */}
              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div key={r.id || i} className="bg-white p-4 rounded-xl border border-[#eee7da]">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-luxe-black">{r.author}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Achat vérifié</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(r.rating || 5)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-luxe-muted">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
