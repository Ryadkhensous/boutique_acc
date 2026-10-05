import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    applyPromoCode,
    promoMessage,
    discountPercent
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  // Calcul progression livraison gratuite
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#eee7da] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du Panier */}
        <div className="p-5 border-b border-[#eee7da] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold-700" />
            <h3 className="font-serif text-lg font-semibold text-luxe-black">
              Votre Panier ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-200/60 flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barre de livraison gratuite */}
        <div className="bg-[#faf5ee] px-5 py-3 border-b border-[#eee7da]">
          <div className="flex items-center justify-between text-xs font-medium text-luxe-charcoal mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              {remainingForFreeShipping > 0
                ? `Plus que ${remainingForFreeShipping.toFixed(2)} € pour la livraison offerte`
                : 'Félicitations ! Livraison gratuite débloquée'}
            </span>
            <span className="font-bold text-gold-700">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#e8e0d2] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gold-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#faf5ee] flex items-center justify-center mx-auto text-gold-600">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-base font-semibold text-luxe-black">Votre panier est vide</h4>
              <p className="text-xs text-luxe-muted max-w-xs mx-auto">
                Laissez-vous tenter par un de nos bijoux scintillants ou une montre d'exception.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-[#2d2724] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-gold-700 transition"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            cart.map((item) => {
              let imgUrl = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f';
              try {
                const parsed = typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
                if (Array.isArray(parsed) && parsed.length) imgUrl = parsed[0];
              } catch {}

              return (
                <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-[#eee7da] bg-white hover:border-gold-300 transition-all">
                  {/* Miniature */}
                  <img
                    src={imgUrl}
                    alt={item.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                  />

                  {/* Détails */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-serif text-xs sm:text-sm font-semibold text-luxe-black line-clamp-1">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-luxe-muted mt-0.5">
                          {item.price.toFixed(2)} € l'unité
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition p-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantité & Total Ligne */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#e1d9cc] rounded-full bg-[#fbf9f6] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white text-xs font-semibold text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white text-xs font-semibold text-gray-700"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-luxe-black">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied du Panier avec Code Promo & Récapitulatif */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#eee7da] bg-[#faf8f5] space-y-4">
            
            {/* Champ Code Promo */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Code promo (ex: ECLAT10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#ded6c9] rounded-xl text-xs text-gray-900 outline-none uppercase font-medium focus:border-gold-500"
                />
              </div>
              <button
                type="submit"
                className="bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Appliquer
              </button>
            </form>

            {promoMessage && (
              <p className={`text-[11px] font-medium ${
                promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {promoMessage.text}
              </p>
            )}

            {/* Détails financiers */}
            <div className="space-y-1.5 text-xs text-luxe-charcoal pt-1">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{cartSubtotal.toFixed(2)} €</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Remise promo (-{discountPercent}%)</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">Offerte</span>
                  ) : (
                    `${shippingFee.toFixed(2)} €`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-luxe-black pt-2 border-t border-[#e8e0d2]">
                <span className="font-serif">Total TTC</span>
                <span className="font-serif text-lg">{cartTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Bouton Commander */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full gold-gradient-bg hover:opacity-95 text-white font-semibold text-sm py-3.5 rounded-full shadow-soft flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-luxe-muted flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Paiement 100% sécurisé • SSL 256 bits
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
