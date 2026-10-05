# ✨ AURÉLIE PARIS — Boutique d'Accessoires Féminins

Boutique e-commerce haut de gamme conçue avec un **thème clair et raffiné** (tons ivoire, or champagne, rose poudré et blanc soyeux), spécialisée dans la vente d'accessoires pour femmes :
- 💍 **Bijoux Précieux** : Colliers en nacre naturelle, bagues pavées de zircons, boucles d'oreilles perles baroques, bracelets joncs en plaqué or 18k.
- ⌚ **Montres & Horlogerie** : Cadrans effet marbre blanc de Carrare, mailles milanaises dorées, bracelets en cuir véritable italien.
- 🧢 **Casquettes Chics & Tendance** : Velours côtelé vintage, sergé de coton peigné brodé main.

---

## 🛠️ Stack Technologique

- **Frontend** : React 18/19 + Vite + Tailwind CSS v3 + Lucide Icons + Canvas-Confetti
- **Backend** : Node.js + Express
- **ORM & Base de données** : Prisma ORM + PostgreSQL (avec support autonome en local)
- **Hébergement Cloud** : Prêt pour le déploiement en 1 clic sur **Render** (`render.yaml` inclus)

---

## 🚀 Fonctionnalités Clés

1. **Expérience Visuelle de Luxe** :
   - Thème clair lumineux, finitions dorées, typographies élégantes (*Playfair Display* & *Plus Jakarta Sans*).
   - Micro-interactions, zoom photographique au survol et animations soignées.
2. **Navigation & Filtrage Avancés** :
   - Filtres par catégories principales (Bijoux, Montres, Casquettes) et par sous-catégories (Colliers, Bagues, Marbre, Velours, etc.).
   - Recherche en direct avec autocomplétion.
   - Tri par prix (croissant/décroissant), notes et popularité.
3. **Fiche Produit Détaillée (Modale interactive)** :
   - Galerie photos haute résolution avec sélecteur de miniatures.
   - Conseils d'entretien de la Maison.
   - Consultation des avis vérifiés et formulaire pour laisser un nouvel avis (relié à l'API).
4. **Panier & Code Promo** :
   - Tiroir coulissant avec jauge animée de livraison offerte (seuil à 60€).
   - Codes promos fonctionnels : `ECLAT10` ou `BIENVENUE10` (-10%), `VIP20` (-20%).
   - Persistance automatique dans le stockage local (`localStorage`).
5. **Checkout & Paiement Sécurisé Simulé** :
   - Formulaire complet de livraison et choix du moyen de paiement (Carte Bancaire, Apple Pay, PayPal).
   - Enregistrement de la commande via l'API backend (`POST /api/orders`).
   - Animation de confettis et confirmation avec numéro de commande unique.
6. **Liste de Coups de Cœur (Wishlist)** :
   - Sauvegarde instantanée des favoris avec compteur en temps réel.

---

## 💻 Démarrage en Développement Local

### 1. Démarrer le Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
👉 Le site sera accessible sur : `http://localhost:5173`

### 2. Démarrer le Backend (Node.js + Prisma)
```bash
cd backend
npm install
npx prisma generate
node src/index.js
```
👉 L'API sera accessible sur : `http://localhost:5000`

---

## ☁️ Déploiement sur Render

Le projet intègre nativement un fichier `render.yaml` (Blueprint) qui configure automatiquement à la fois :
1. **Une base de données PostgreSQL gérée** sur Render.
2. **Un Web Service Node.js** qui exécute les migrations Prisma, charge les données de départ (seed) et sert l'API.

### Déploiement en 3 étapes simples :
1. Poussez votre projet sur votre dépôt GitHub ou GitLab :
   ```bash
   git add .
   git commit -m "Initial commit boutique accessoires"
   git push origin main
   ```
2. Rendez-vous sur votre compte **[Render.com](https://dashboard.render.com/)**.
3. Cliquez sur **New +** > **Blueprint**, sélectionnez votre dépôt Git. Render détectera automatiquement le fichier `render.yaml` et déploiera la base de données et le backend.

### Configuration Manuelle (si vous préférez sans Blueprint) :
- **Type** : Web Service
- **Root Directory** : `backend`
- **Environment** : `Node`
- **Build Command** :
  ```bash
  npm install && npx prisma generate && npx prisma db push && npm run prisma:seed
  ```
- **Start Command** :
  ```bash
  node src/index.js
  ```
- **Variables d'Environnement** :
  - `DATABASE_URL` : L'URL de connexion PostgreSQL (fournie par Render PostgreSQL ou Neon/Supabase)
  - `PORT` : `10000` (ou port assigné par Render)
  - `CORS_ORIGIN` : `*` (ou l'URL de votre frontend déployé)
