import React from 'react';
import { Gem, Clock, Sparkles, Shield, HeartHandshake, Package } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Gem,
      title: "Or Fin 18K & Nacre Naturelle",
      description: "Nos bijoux sont élaborés en laiton ou acier chirurgical plaqué à l'or fin 18 carats pour une résistance optimale à l'eau et aux peaux sensibles."
    },
    {
      icon: Clock,
      title: "Horlogerie & Verre Saphir",
      description: "Cadrans épurés effet marbre et nacre, mouvements japonais haute précision et mailles milanaises souples qui épousent chaque poignet."
    },
    {
      icon: Sparkles,
      title: "Casquettes Couture Délicates",
      description: "Matières douces en velours côtelé et coton peigné lavé pour un look féminin décontracté et sophistiqué en toute saison."
    },
    {
      icon: Package,
      title: "Écrin Cadeau Offert",
      description: "Chaque commande est emballée avec délicatesse dans un coffret signature embossé à l'or chaud avec sa pochette en satin protectrice."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#ece5da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700">
            L'Excellence de la Maison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-luxe-black">
            Pourquoi choisir Aurélie Paris ?
          </h2>
          <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed">
            Chaque accessoire est pensé pour traverser le temps avec grâce, en associant des matériaux nobles à un design intemporel.
          </p>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-[#faf8f5] p-6 rounded-3xl border border-[#ede5d8] hover:border-gold-300 hover:shadow-soft transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#e5dfd2] text-gold-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold text-luxe-black mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-luxe-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
