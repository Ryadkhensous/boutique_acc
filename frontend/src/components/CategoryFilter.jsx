import React from 'react';
import { Sparkles, Watch, Sun, Layers } from 'lucide-react';

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  activeSubCategory,
  onSelectSubCategory,
  productsCount
}) {
  const mainCategories = [
    {
      id: 'all',
      name: 'Tous les Accessoires',
      subtitle: 'La sélection complète',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'bijoux',
      name: 'Bijoux Précieux',
      subtitle: 'Colliers, bagues, bracelets',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'montres',
      name: 'Montres & Cadrans',
      subtitle: 'Or rose, marbre, cuir nude',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'casquettes',
      name: 'Casquettes Tendance',
      subtitle: 'Velours côtelé, coton brodé',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const subCategoriesByParent = {
    bijoux: [
      { id: 'all', label: 'Tous les bijoux' },
      { id: 'colliers', label: 'Colliers & Pendentifs' },
      { id: 'bagues', label: 'Bagues dorées' },
      { id: 'boucles', label: 'Boucles d\'oreilles' },
      { id: 'bracelets', label: 'Bracelets & Joncs' }
    ],
    montres: [
      { id: 'all', label: 'Toutes les montres' },
      { id: 'montres-dorees', label: 'Mailles dorées & Marbre' },
      { id: 'montres-cuir', label: 'Bracelets cuir véritable' }
    ],
    casquettes: [
      { id: 'all', label: 'Toutes les casquettes' },
      { id: 'casquettes-brodees', label: 'Coton brodé chic' },
      { id: 'casquettes-velours', label: 'Velours côtelé vintage' }
    ]
  };

  const currentSubList = subCategoriesByParent[activeCategory];

  return (
    <div className="py-8 space-y-6">
      
      {/* Grille de cartes de catégories principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {mainCategories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectSubCategory('all');
              }}
              className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 border cursor-pointer group flex flex-col justify-between h-36 sm:h-44 ${
                isSelected
                  ? 'border-gold-500 bg-white ring-2 ring-gold-400/40 shadow-soft'
                  : 'border-[#eae3d5] bg-white/70 hover:bg-white hover:border-gold-300 hover:shadow-sm'
              }`}
            >
              {/* Image d'ambiance en fond avec opacité */}
              <div className="absolute right-0 bottom-0 w-24 sm:w-32 h-24 sm:h-32 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-tl-full"
                />
              </div>

              {/* En-tête de la carte */}
              <div className="flex items-center justify-between relative z-10">
                <div className={`p-2 rounded-xl transition-colors ${
                  isSelected ? 'bg-gold-500 text-white shadow-sm' : 'bg-[#f4efe8] text-luxe-charcoal group-hover:bg-gold-100 group-hover:text-gold-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gold-500" />
                )}
              </div>

              {/* Textes */}
              <div className="relative z-10 mt-auto">
                <h3 className={`font-serif text-sm sm:text-base font-semibold leading-tight ${
                  isSelected ? 'text-gold-900 font-bold' : 'text-luxe-black'
                }`}>
                  {cat.name}
                </h3>
                <p className="text-[11px] text-luxe-muted mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sous-catégories sous forme de pilules raffinées */}
      {currentSubList && currentSubList.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          <span className="text-xs uppercase font-semibold text-luxe-muted mr-1 tracking-wider whitespace-nowrap">
            Filtrer par :
          </span>
          {currentSubList.map((sub) => {
            const isSubSelected = activeSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubCategory(sub.id)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap border cursor-pointer font-medium ${
                  isSubSelected
                    ? 'bg-[#2d2724] text-white border-[#2d2724] shadow-sm'
                    : 'bg-white text-luxe-charcoal border-[#e3dcd1] hover:border-gold-400 hover:text-gold-700'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
