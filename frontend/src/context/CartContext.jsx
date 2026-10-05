import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Panier avec persistance locale
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aurelie_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Liste d'envies (Wishlist)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aurelie_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Pour la modale de vue détaillée
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  // Synchronisation localStorage
  useEffect(() => {
    localStorage.setItem('aurelie_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aurelie_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Ajouter au panier
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  // Mettre à jour la quantité
  const updateQuantity = (productId, delta) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Retirer un produit
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Gestion des favoris
  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Code promo
  const applyPromoCode = (code) => {
    const formatted = (code || '').trim().toUpperCase();
    if (formatted === 'ECLAT10' || formatted === 'BIENVENUE10') {
      setDiscountPercent(10);
      setPromoCode(formatted);
      setPromoMessage({ type: 'success', text: 'Code appliqué ! -10% sur votre commande ✨' });
      return true;
    } else if (formatted === 'VIP20') {
      setDiscountPercent(20);
      setPromoCode(formatted);
      setPromoMessage({ type: 'success', text: 'Code VIP appliqué ! -20% ✨' });
      return true;
    } else {
      setPromoMessage({ type: 'error', text: 'Code promo invalide. Essayez "ECLAT10"' });
      return false;
    }
  };

  // Calculs financiers
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 60.0;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 4.90;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountPercent,
        discountAmount,
        shippingFee,
        cartTotal,
        freeShippingThreshold,
        promoCode,
        promoMessage,
        applyPromoCode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé au sein d\'un CartProvider');
  }
  return context;
}
