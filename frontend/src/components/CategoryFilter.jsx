import React from 'react';
import { Sparkles, Watch, Sun, Layers } from 'lucide-react';

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  activeSubCategory,
  onSelectSubCategory
}) {
  const mainCategories = [
    {
      id: 'all',
      name: 'جميع الإكسسوارات',
      subtitle: 'التشكيلة الكاملة المختارة',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'bijoux',
      name: 'مجوهرات راقية',
      subtitle: 'قلادات، خواتم، أساور',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'montres',
      name: 'ساعات وأقراص فاخرة',
      subtitle: 'ذهب وردي، رخام، جلد نيود',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'casquettes',
      name: 'قبعات عصرية',
      subtitle: 'مخمل مضلع، قطن مطرز',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const subCategoriesByParent = {
    bijoux: [
      { id: 'all', label: 'جميع المجوهرات' },
      { id: 'colliers', label: 'قلادات وتدليات' },
      { id: 'bagues', label: 'خواتم ذهبية' },
      { id: 'boucles', label: 'أقراط ناعمة' },
      { id: 'bracelets', label: 'أساور صلبة ومجدولة' }
    ],
    montres: [
      { id: 'all', label: 'جميع الساعات' },
      { id: 'montres-dorees', label: 'أساور ذهبية ورخام' },
      { id: 'montres-cuir', label: 'أحزمة جلد طبيعي' }
    ],
    casquettes: [
      { id: 'all', label: 'جميع القبعات' },
      { id: 'casquettes-brodees', label: 'قطن مطرز باريسي' },
      { id: 'casquettes-velours', label: 'مخمل مضلع كلاسيكي' }
    ]
  };

  const currentSubList = subCategoriesByParent[activeCategory];

  return (
    <div className="py-8 space-y-6">
      
      {/* شبكة بطاقات الفئات الرئيسية */}
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
              className={`relative overflow-hidden rounded-2xl p-4 text-right transition-all duration-300 border cursor-pointer group flex flex-col justify-between h-36 sm:h-44 ${
                isSelected
                  ? 'border-bordeaux-700 bg-white ring-2 ring-bordeaux-600/30 shadow-soft'
                  : 'border-[#eae3d5] bg-white/70 hover:bg-white hover:border-bordeaux-300 hover:shadow-sm'
              }`}
            >
              {/* صورة الخلفية الشفافة */}
              <div className="absolute left-0 bottom-0 w-24 sm:w-32 h-24 sm:h-32 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-tr-full"
                />
              </div>

              {/* أيقونة الفئة */}
              <div className="flex items-center justify-between relative z-10">
                <div className={`p-2 rounded-xl transition-colors ${
                  isSelected ? 'bg-bordeaux-800 text-white shadow-sm' : 'bg-[#f4efe8] text-luxe-charcoal group-hover:bg-cream-200 group-hover:text-bordeaux-800'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-bordeaux-700" />
                )}
              </div>

              {/* العناوين */}
              <div className="relative z-10 mt-auto">
                <h3 className={`font-serif text-sm sm:text-base font-bold leading-tight ${
                  isSelected ? 'text-bordeaux-900' : 'text-luxe-black'
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

      {/* شريط الفئات الفرعية */}
      {currentSubList && currentSubList.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          <span className="text-xs uppercase font-bold text-luxe-muted ml-2 tracking-wider whitespace-nowrap">
            تصفية حسب :
          </span>
          {currentSubList.map((sub) => {
            const isSubSelected = activeSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubCategory(sub.id)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap border cursor-pointer font-medium ${
                  isSubSelected
                    ? 'bg-bordeaux-800 text-white border-bordeaux-800 shadow-sm font-bold'
                    : 'bg-white text-luxe-charcoal border-[#e3dcd1] hover:border-bordeaux-300 hover:text-bordeaux-800'
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
