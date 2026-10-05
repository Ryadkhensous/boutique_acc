import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gift, Award } from 'lucide-react';
import heroLandscape from '../assets/hero-landscape.jpg';

export default function HeroBanner({ onSelectCategory }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5ee] via-[#f7f0e6] to-[#faf8f5] py-10 lg:py-16 border-b border-[#eee7da]">
      {/* Éléments de fond décoratifs doux */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blush-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Colonne Texte & Accroche */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-200 text-xs font-semibold text-gold-800 tracking-wider shadow-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              Nouvelle Collection Printemps-Été 2026
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-luxe-black leading-[1.15] font-normal tracking-tight">
              L’élégance au féminin,{' '}
              <span className="italic font-serif text-gold-700">dans le moindre détail.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-luxe-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Sublimez votre style avec nos collections exclusives : bijoux dorés à l'or fin 18 carats, 
              montres joaillières raffinées et casquettes streetwear chics conçues pour la femme moderne.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => onSelectCategory('bijoux')}
                className="gold-gradient-bg text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-soft hover:shadow-glow transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                Découvrir les Bijoux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectCategory('montres')}
                className="bg-white hover:bg-[#f6f2ea] text-luxe-black border border-[#e4ded3] font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:border-gold-300"
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-[#ece4d6]">
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

          {/* Colonne Composition Visuelle / Image Héroïque en format PAYSAGE */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full">
              
              {/* Cadre de l'image paysage */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxe border-4 border-white bg-white group aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={heroLandscape}
                  alt="Collection éditoriale de bijoux dorés et montres d'exception — Maison Aurélie Paris"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Léger voile dégradé sur le bas pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Badge en superposition */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/70 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold-500" />
                      Parure d'Exception
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-luxe-black">
                      Collier Solstice & Montre Aura Or Rose
                    </h3>
                    <p className="text-xs text-gold-800 font-bold mt-0.5">
                      Édition Limitée Printemps 2026
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectCategory('bijoux')}
                    className="gold-gradient-bg text-white text-xs font-semibold px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm hover:opacity-95 cursor-pointer whitespace-nowrap"
                  >
                    Découvrir
                  </button>
                </div>
              </div>

              {/* Petite vignette flottante montre */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 hidden sm:block bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-gold-100 max-w-[150px] animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80"
                  alt="Montre chic dorée"
                  className="w-full h-20 object-cover rounded-xl mb-1.5"
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
