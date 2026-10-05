import prisma from '../db.js';

const mockOrders = [];

// Créer une commande
export async function createOrder(req, res) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      postalCode,
      country = 'France',
      paymentMethod = 'card',
      items,
      totalAmount
    } = req.body;

    if (!customerName || !customerEmail || !shippingAddress || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Informations de livraison ou panier incomplets'
      });
    }

    const orderNumber = 'CMD-' + Math.floor(100000 + Math.random() * 900000);

    let hasDb = false;
    try {
      if (prisma) {
        await prisma.$queryRaw`SELECT 1`;
        hasDb = true;
      }
    } catch (e) {
      hasDb = false;
    }

    if (hasDb) {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          city,
          postalCode,
          country,
          paymentMethod,
          totalAmount: parseFloat(totalAmount),
          status: 'PAID',
          items: {
            create: items.map(item => ({
              productId: parseInt(item.id, 10),
              quantity: item.quantity,
              price: parseFloat(item.price)
            }))
          }
        },
        include: { items: { include: { product: true } } }
      });

      return res.status(201).json({
        success: true,
        message: 'Commande validée avec succès !',
        data: order
      });
    }

    // Fallback sans base locale
    const newOrder = {
      id: Date.now(),
      orderNumber,
      customerName,
      customerEmail,
      shippingAddress: `${shippingAddress}, ${postalCode} ${city}, ${country}`,
      totalAmount: parseFloat(totalAmount),
      status: 'PAID',
      createdAt: new Date().toISOString(),
      items
    };

    mockOrders.unshift(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Commande validée avec succès (Mode Démonstration) !',
      data: newOrder
    });
  } catch (error) {
    console.error('Erreur createOrder:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la validation de la commande' });
  }
}

// Obtenir toutes les commandes
export async function getOrders(req, res) {
  try {
    let hasDb = false;
    try {
      if (prisma) {
        await prisma.$queryRaw`SELECT 1`;
        hasDb = true;
      }
    } catch (e) {
      hasDb = false;
    }

    if (hasDb) {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: true } } }
      });
      return res.json({ success: true, data: orders });
    }

    return res.json({ success: true, data: mockOrders });
  } catch (error) {
    console.error('Erreur getOrders:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
