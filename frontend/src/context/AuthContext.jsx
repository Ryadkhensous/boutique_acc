import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const initialDemoUser = {
  id: 1,
  name: 'Camille de Montmirail',
  email: 'camille@aurelie-paris.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  address: '14 Rue de la Paix',
  city: 'Paris',
  postalCode: '75002',
  country: 'France',
  preferredMetal: 'Or Jaune 18K',
  ringSize: '52',
  loyaltyPoints: 480,
  vipTier: 'Ambassadrice Or ✨',
  referralCode: 'CAMILLE-OR-2026',
  orders: [
    {
      id: 201,
      orderNumber: 'CMD-948102',
      customerName: 'Camille de Montmirail',
      customerEmail: 'camille@aurelie-paris.com',
      shippingAddress: '14 Rue de la Paix, 75002 Paris',
      totalAmount: 88.99,
      status: 'SHIPPED',
      trackingNumber: 'COLI-FR-84920194',
      date: 'Il y a 2 jours',
      items: [
        {
          id: 1,
          name: 'Collier Solstice Doré & Nacre',
          price: 49.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 2,
          name: 'Bague Étoilée Pavée Zircons',
          price: 39.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80'
        }
      ]
    },
    {
      id: 202,
      orderNumber: 'CMD-782194',
      customerName: 'Camille de Montmirail',
      customerEmail: 'camille@aurelie-paris.com',
      shippingAddress: '14 Rue de la Paix, 75002 Paris',
      totalAmount: 119.00,
      status: 'PREPARING',
      trackingNumber: 'COLI-FR-ATTENTE',
      date: 'Aujourd\'hui à 11h30',
      items: [
        {
          id: 5,
          name: 'Montre Aura Or Rose & Cadran Marbre',
          price: 119.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80'
        }
      ]
    }
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aurelie_user');
      return saved ? JSON.parse(saved) : initialDemoUser; // Connecté par défaut avec le compte démo VIP pour immersion maximale
    } catch {
      return initialDemoUser;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aurelie_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aurelie_user');
    }
  }, [user]);

  // Connexion
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setIsAuthModalOpen(false);
        setIsDashboardOpen(true);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      // Simulation locale fluide
      const simulated = {
        ...initialDemoUser,
        name: email.split('@')[0],
        email
      };
      setUser(simulated);
      setIsAuthModalOpen(false);
      setIsDashboardOpen(true);
      return { success: true };
    }
  };

  // Inscription
  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...data.data, orders: [] });
        setIsAuthModalOpen(false);
        setIsDashboardOpen(true);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone: '',
        avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(name)}`,
        address: '10 Avenue Montaigne',
        city: 'Paris',
        postalCode: '75008',
        country: 'France',
        preferredMetal: 'Or Jaune 18K',
        ringSize: '52',
        loyaltyPoints: 100,
        vipTier: 'Membre Éclat',
        referralCode: `${name.substring(0, 4).toUpperCase()}-2026`,
        orders: []
      };
      setUser(newUser);
      setIsAuthModalOpen(false);
      setIsDashboardOpen(true);
      return { success: true };
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setIsDashboardOpen(false);
  };

  // Mettre à jour profil
  const updateProfile = async (formData) => {
    if (!user) return;
    const updated = { ...user, ...formData };
    setUser(updated);

    try {
      await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, ...formData })
      });
    } catch (e) {
      // OK en mode autonome
    }
  };

  // Ajouter une nouvelle commande passée à l'historique du profil
  const addOrderToProfile = (order) => {
    if (!user) return;
    const newOrders = [order, ...(user.orders || [])];
    const earnedPoints = Math.round(order.totalAmount || 50);
    setUser({
      ...user,
      loyaltyPoints: (user.loyaltyPoints || 0) + earnedPoints,
      orders: newOrders
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        login,
        register,
        logout,
        updateProfile,
        addOrderToProfile,
        loginAsDemo: () => {
          setUser(initialDemoUser);
          setIsAuthModalOpen(false);
          setIsDashboardOpen(true);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé au sein d\'un AuthProvider');
  }
  return context;
}
