import React from 'react';
import ProductCard from './ProductCard';
import { ArrowUpDown, Sparkles } from 'lucide-react';

export default function ProductGrid({
  products,
  sortBy,
  setSortBy,
  onQuickView,
  onResetFilters,
  searchQuery
}) {
  return (
    <div className="space-y-6">
      
      {/* شريط التحكم والترتيب */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ece5da]">
        <div className="text-right">
          <h2 className="font-serif text-2xl font-bold text-luxe-black">
            تشكيلتنا النسائية المختارة
          </h2>
          <p className="text-xs text-luxe-muted mt-1">
            {products.length} {products.length === 1 ? 'قطعة متوفرة' : 'قطع متوفرة'}
            {searchQuery && ` لنتائج البحث عن "${searchQuery}"`}
          </p>
        </div>

        {/* محدد الترتيب */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="sort-select" className="text-xs font-bold text-luxe-muted flex items-center gap-1.5 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-600" />
            ترتيب حسب :
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#e1d9cc] text-luxe-charcoal text-xs rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition cursor-pointer shadow-sm font-medium"
          >
            <option value="featured">✨ التميز وتوصيات الدار</option>
            <option value="price-asc">السعر : من الأقل للأعلى</option>
            <option value="price-desc">السعر : من الأعلى للأقل</option>
            <option value="rating">الأعلى تقييماً (آراء موثقة)</option>
          </select>
        </div>
      </div>

      {/* شبكة المنتجات */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* الحالة الفارغة */
        <div className="text-center py-16 bg-white rounded-3xl border border-[#eee7da] p-8 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-serif text-lg font-bold text-luxe-black">
            لم نجد أي إكسسوار مطابق
          </h3>
          <p className="text-xs text-luxe-muted mt-2 max-w-xs mx-auto leading-relaxed">
            لم نعثر على أي نتائج تتطابق مع معايير البحث الحالية. يُرجى تجربة كلمات أخرى أو إعادة ضبط الفلاتر.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      )}

    </div>
  );
}
