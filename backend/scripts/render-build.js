import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Démarrage du script de build pour Render...');

const envPath = path.resolve(process.cwd(), '.env');
const hasRealDb = Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder'));

// Si aucune DATABASE_URL n'est définie (première installation sans base configurée sur Render)
// on crée un fichier .env de secours pour éviter l'erreur P1012 lors de 'prisma generate'
if (!process.env.DATABASE_URL && !fs.existsSync(envPath)) {
  console.log('⚠️ DATABASE_URL non définie sur Render.');
  console.log('ℹ️ Création d\'un .env temporaire pour permettre la compilation du client Prisma...');
  fs.writeFileSync(envPath, 'DATABASE_URL="postgresql://render_user:secret@localhost:5432/boutique_db?schema=public"\nPORT=10000\n');
}

// 1. Génération du client Prisma
try {
  console.log('📦 Compilation du client Prisma (prisma generate)...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Client Prisma généré avec succès.');
} catch (err) {
  console.error('❌ Échec de prisma generate:', err.message);
  process.exit(1);
}

// 2. Synchronisation et seed uniquement si une vraie base est connectée
if (hasRealDb) {
  console.log('🗄️ Base de données PostgreSQL détectée !');
  try {
    console.log('🔄 Application du schéma (prisma db push)...');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Schéma synchronisé.');

    console.log('🌱 Insertion des données (seed)...');
    execSync('node prisma/seed.js', { stdio: 'inherit' });
    console.log('✅ Données insérées avec succès.');
  } catch (err) {
    console.warn('⚠️ Avertissement lors de db push / seed :', err.message);
    console.warn('ℹ️ Le serveur démarrera en utilisant le mode sécurisé.');
  }
} else {
  console.log('ℹ️ Mode autonome actif : Le serveur démarrera immédiatement avec le catalogue complet en mémoire.');
  console.log('💡 Astuce : Ajoutez DATABASE_URL dans l\'onglet "Environment" sur Render dès que votre base PostgreSQL est prête.');
}

console.log('🎉 Build Render réussi !');
