import prisma from '../db.js';

let mockUsers = [
  {
    id: 1,
    email: 'camille@aurelie-paris.com',
    name: 'Camille de Montmirail',
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
    createdAt: new Date().toISOString()
  }
];

let mockUserOrders = [
  {
    id: 201,
    orderNumber: 'CMD-948102',
    customerName: 'Camille de Montmirail',
    customerEmail: 'camille@aurelie-paris.com',
    shippingAddress: '14 Rue de la Paix, 75002 Paris',
    totalAmount: 88.99,
    status: 'SHIPPED', // PREPARING, SHIPPED, DELIVERED
    trackingNumber: 'COLI-FR-84920194',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
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
    trackingNumber: null,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
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
];

async function checkPrisma() {
  try {
    if (!prisma) return false;
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (err) {
    return false;
  }
}

// Inscription
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Nom et email obligatoires' });
    }

    const hasDb = await checkPrisma();
    const referralCode = `${name.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (hasDb) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Un compte existe déjà avec cette adresse email' });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: password || 'demo123',
          loyaltyPoints: 100,
          vipTier: 'Membre Éclat',
          referralCode,
          avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(name)}`
        }
      });
      return res.status(201).json({ success: true, data: user });
    }

    // Fallback mémoire
    const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà enregistré' });
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: password || 'demo123',
      phone: '',
      address: '',
      city: 'Paris',
      postalCode: '',
      country: 'France',
      preferredMetal: 'Or Jaune 18K',
      ringSize: '52',
      loyaltyPoints: 100,
      vipTier: 'Membre Éclat',
      referralCode,
      avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString()
    };

    mockUsers.unshift(newUser);
    return res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    console.error('Erreur register:', err);
    res.status(500).json({ success: false, message: 'Erreur lors de la création du compte' });
  }
}

// Connexion
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email obligatoire' });
    }

    const hasDb = await checkPrisma();
    if (hasDb) {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { orders: { include: { items: { include: { product: true } } } } }
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Compte introuvable avec cet email' });
      }

      return res.json({ success: true, data: user });
    }

    // Fallback mémoire
    let user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Si c'est un nouvel email en mode démo, on le crée instantanément pour une expérience fluide
      const referralCode = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
      user = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        phone: '+33 6 00 00 00 00',
        avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(email)}`,
        address: '10 Avenue Montaigne',
        city: 'Paris',
        postalCode: '75008',
        country: 'France',
        preferredMetal: 'Or Jaune 18K',
        ringSize: '52',
        loyaltyPoints: 150,
        vipTier: 'Membre Éclat',
        referralCode,
        createdAt: new Date().toISOString()
      };
      mockUsers.push(user);
    }

    const orders = mockUserOrders.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase());
    return res.json({ success: true, data: { ...user, orders } });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ success: false, message: 'Erreur de connexion' });
  }
}

// Obtenir profil complet avec commandes
export async function getProfile(req, res) {
  try {
    const { email } = req.query;
    const targetEmail = email || 'camille@aurelie-paris.com';

    const hasDb = await checkPrisma();
    if (hasDb) {
      const user = await prisma.user.findUnique({
        where: { email: targetEmail },
        include: { orders: { include: { items: { include: { product: true } } } } }
      });
      if (user) return res.json({ success: true, data: user });
    }

    const user = mockUsers.find(u => u.email.toLowerCase() === targetEmail.toLowerCase()) || mockUsers[0];
    const orders = mockUserOrders.filter(o => o.customerEmail.toLowerCase() === user.email.toLowerCase());
    return res.json({ success: true, data: { ...user, orders } });
  } catch (err) {
    console.error('Erreur getProfile:', err);
    res.status(500).json({ success: false, message: 'Erreur récupération profil' });
  }
}

// Mettre à jour les préférences de style / adresses
export async function updateProfile(req, res) {
  try {
    const { email, name, phone, address, city, postalCode, preferredMetal, ringSize } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email manquant' });

    const hasDb = await checkPrisma();
    if (hasDb) {
      const updated = await prisma.user.update({
        where: { email },
        data: { name, phone, address, city, postalCode, preferredMetal, ringSize }
      });
      return res.json({ success: true, data: updated });
    }

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (address) user.address = address;
      if (city) user.city = city;
      if (postalCode) user.postalCode = postalCode;
      if (preferredMetal) user.preferredMetal = preferredMetal;
      if (ringSize) user.ringSize = ringSize;
      return res.json({ success: true, data: user });
    }

    res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
  } catch (err) {
    console.error('Erreur updateProfile:', err);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour' });
  }
}
