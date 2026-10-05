import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gift, Award } from 'lucide-react';

export default function HeroBanner({ onSelectCategory }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5ee] via-[#f7f0e6] to-[#faf8f5] py-12 lg:py-20 border-b border-[#eee7da]">
      {/* Éléments de fond décoratifs doux */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blush-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Texte & Accroche */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-200 text-xs font-semibold text-gold-800 tracking-wider shadow-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              Nouvelle Collection Printemps-Été 2026
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-luxe-black leading-[1.15] font-normal tracking-tight">
              L’élégance au féminin,{' '}
              <span className="italic font-serif text-gold-700">dans le moindre détail.</span>
            </h1>

            <p className="text-base sm:text-lg text-luxe-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Sublimez votre style avec nos collections exclusives : bijoux dorés à l'or fin 18 carats, 
              montres joaillières raffinées et casquettes streetwear chics conçues pour la femme moderne.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onSelectCategory('bijoux')}
                className="gold-gradient-bg text-white font-medium text-sm px-7 py-3.5 rounded-full shadow-soft hover:shadow-glow transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                Découvrir les Bijoux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectCategory('montres')}
                className="bg-white hover:bg-[#f6f2ea] text-luxe-black border border-[#e4ded3] font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:border-gold-300"
              >
                Nos Montres & Horlogerie
              </button>

              <button
                onClick={() => onSelectCategory('casquettes')}
                className="text-xs uppercase tracking-wider text-luxe-muted hover:text-gold-700 font-semibold underline underline-offset-4 py-2 px-3"
              >
                Casquettes Chics & Velours →
              </button>
            </div>

            {/* Badges de confiance */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#ece4d6]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-luxe-black leading-tight">Livraison 48h</p>
                  <p className="text-[10px] text-luxe-muted">Gratuite dès 60€</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-luxe-black leading-tight">Or Fin 18K</p>
                  <p className="text-[10px] text-luxe-muted">Résistant à l'eau</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-luxe-black leading-tight">Écrin Cadeau</p>
                  <p className="text-[10px] text-luxe-muted">Offert par commande</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-luxe-black leading-tight">Garantie 2 ans</p>
                  <p className="text-[10px] text-luxe-muted">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>

          </div>

          {/* Colonne Composition Visuelle / Image Héroïque */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image principale */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxe border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
                  alt="Bijoux raffinés pour femme en plaqué or"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Voile dégradé doux */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Badge en superposition */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700">Pièce Maîtresse</span>
                    <h3 className="font-serif text-base font-semibold text-luxe-black">Collier Solstice Nacre & Or</h3>
                    <p className="text-xs text-gold-800 font-bold mt-0.5">49,99 € <span className="line-through text-gray-400 font-normal ml-1">65,00 €</span></p>
                  </div>
                  <button
                    onClick={() => onSelectCategory('bijoux')}
                    className="bg-gold-600 hover:bg-gold-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition shadow-sm"
                  >
                    Voir
                  </button>
                </div>
              </div>

              {/* Petite vignette flottante montre */}
              <div className="absolute -top-6 -right-6 hidden sm:block bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gold-100 max-w-[170px] animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80"
                  alt="Montre chic dorée"
                  className="w-full h-24 object-cover rounded-xl mb-2"
                />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">Montre Aura Marbre</p>
                  <p className="text-[10px] text-gold-600 font-semibold">119,00 €</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
