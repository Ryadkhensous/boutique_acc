import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistModal({ isOpen, onClose, allProducts }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const favoriteProducts = allProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in text-right">
      <div
        className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#eee7da] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-serif text-lg font-bold text-luxe-black">
              قائمتي المفضلة ({favoriteProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200/60 flex items-center justify-center text-gray-500 transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-rose-200 mx-auto" />
              <p className="font-serif text-base font-bold text-gray-800">قائمة رغباتكِ فارغة</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                اضغطي على رمز القلب في القطع التي تنال إعجابكِ لتجديها محفوظة هنا في أي وقت.
              </p>
            </div>
          ) : (
            favoriteProducts.map((p) => {
              let imgUrl = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f';
              try {
                const parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                if (Array.isArray(parsed) && parsed.length) imgUrl = parsed[0];
              } catch {}

              return (
                <div key={p.id} className="flex items-center gap-4 p-3 rounded-2xl border border-[#eee7da] hover:border-gold-300 transition">
                  <img src={imgUrl} alt={p.name} className="w-16 h-16 object-cover rounded-xl bg-gray-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <h5 className="font-serif text-sm font-bold text-gray-900 truncate">{p.name}</h5>
                    <p className="text-xs font-bold text-gold-800 mt-0.5">{p.price.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(p, 1);
                      }}
                      className="p-2 rounded-full bg-[#2d2724] hover:bg-gold-600 text-white transition cursor-pointer shadow-sm"
                      title="أضف إلى السلة"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 rounded-full text-gray-400 hover:text-rose-600 transition cursor-pointer"
                      title="حذف من المفضلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
