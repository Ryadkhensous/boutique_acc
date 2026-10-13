import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onOpenWishlist
}) {
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, setIsDashboardOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const categories = [
    { id: 'all', label: 'المجموعة الكاملة' },
    { id: 'bijoux', label: 'مجوهرات راقية' },
    { id: 'montres', label: 'ساعات وفخامة' },
    { id: 'casquettes', label: 'قبعات عصرية' },
  ];

  const handleCategorySelect = (id) => {
    setActiveCategory(id);
    setMobileMenuOpen(false);
    const catalogueEl = document.getElementById('catalogue-section');
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm transition-all duration-300">
      {/* الشريط الإعلاني العلوي بلون بيج أنيق */}
      <div className="bg-gradient-to-r from-[#f5eee4] via-[#ebe0d0] to-[#f5eee4] border-b border-[#e2d5c1] text-[#3d3630] text-xs py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2 sm:gap-3">
        <span className="flex items-center gap-1 text-gold-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 inline animate-pulse text-gold-600" />
          عرض خاص :
        </span>
        <span>
          توصيل مجاني لجميع الطلبات من 60 € • خصم 10% باستخدام الرمز <strong className="text-gold-900 hover:text-gold-700 underline font-bold cursor-pointer">ECLAT10</strong>
        </span>
      </div>

      {/* شريط التنقل الرئيسي */}
      <nav className="glass-header border-b border-[#ece6dc] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* زر القائمة للشاشات الصغيرة */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-luxe-black hover:text-gold-600 transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* الشعار وهوية العلامة */}
          <div className="text-center md:text-right flex-1 md:flex-initial cursor-pointer" onClick={() => handleCategorySelect('all')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.15em] font-semibold text-luxe-black uppercase hover:opacity-90 transition">
              أوريلي
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-gold-600 uppercase font-medium mt-0.5">
              باريس • دار الإكسسوارات الفاخرة
            </span>
          </div>

          {/* روابط التنقل لسطح المكتب */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse text-sm font-medium">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`transition-colors duration-200 py-1 border-b-2 tracking-wide font-medium ${
                  activeCategory === cat.id
                    ? 'border-gold-600 text-gold-700 font-bold'
                    : 'border-transparent text-[#443e39] hover:text-gold-600 hover:border-gold-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* الأزرار والبحث */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* شريط البحث المدمج */}
            <div className="relative">
              <div className="hidden sm:flex items-center bg-[#f3efe8] rounded-full px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-gold-400 focus-within:bg-white transition-all w-44 md:w-56">
                <Search className="w-4 h-4 text-[#8a8077] ml-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="ابحثي عن خاتم، ساعة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full outline-none text-[#2b2724] placeholder-[#8a8077]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs px-1">
                    ×
                  </button>
                )}
              </div>

              {/* زر البحث للموبايل */}
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="sm:hidden p-2 text-luxe-black hover:text-gold-600 transition"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* حساب العميل / الصالون الخاص */}
            {user ? (
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="group relative flex items-center gap-2.5 pr-1.5 pl-3.5 py-1 rounded-full bg-gradient-to-r from-white via-[#faf6f0] to-[#f7f0e6] hover:from-white hover:to-[#f3e7d6] border border-[#e5ded0] hover:border-gold-400 shadow-xs hover:shadow-soft transition-all duration-300 cursor-pointer"
                title="الدخول إلى صالوني الخاص"
              >
                {/* الأفاتار الذهبي */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-gold-600 via-amber-300 to-gold-400 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-gradient-to-r from-gold-500 to-amber-400 rounded-full border-2 border-white shadow-xs" />
                </div>

                {/* التفاصيل */}
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[10px] font-bold tracking-wider text-gold-700 flex items-center gap-1 leading-none">
                    <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                    عضوة VIP
                  </span>
                  <span className="text-xs font-serif font-semibold text-luxe-black group-hover:text-gold-900 transition-colors leading-tight mt-0.5">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="group flex items-center gap-2 pr-2 pl-3.5 py-1.5 rounded-full bg-white hover:bg-[#faf6f0] border border-[#e5ded0] hover:border-gold-400 shadow-xs hover:shadow-soft transition-all duration-300 text-luxe-charcoal cursor-pointer"
                title="تسجيل الدخول / الانضمام"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 text-gold-800 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all shadow-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-luxe-black tracking-wide">
                  حسابي
                </span>
              </button>
            )}

            {/* المفضلة */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-luxe-black hover:text-rose-600 transition relative cursor-pointer"
              aria-label="المفضلة"
              title="قائمتي المفضلة"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* زر السلة */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#2d2724] hover:bg-gold-700 text-white px-3 sm:px-4 py-2 rounded-full transition-all duration-300 shadow-soft hover:shadow-glow group relative cursor-pointer"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-medium">السلة</span>
              {cartCount > 0 ? (
                <span className="bg-gold-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">0</span>
              )}
            </button>
          </div>
        </div>

        {/* شريط البحث المنسدل للموبايل */}
        {isSearchVisible && (
          <div className="sm:hidden pt-3 pb-1 border-t border-[#f0ebd4] mt-2 animate-fade-in">
            <div className="flex items-center bg-[#f3efe8] rounded-full px-3.5 py-2">
              <Search className="w-4 h-4 text-gray-500 ml-2" />
              <input
                type="text"
                placeholder="ابحثي عن خاتم، ساعة، قبعة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-[#2b2724]"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-sm px-1">
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* القائمة المنسدلة للموبايل */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[#eee7da] mt-3 space-y-2 animate-slide-up">
            {/* الدخول السريع في الموبايل */}
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDashboardOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-gold-50 to-[#faf5ee] border border-gold-200 text-right mb-2 shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-gold-400"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> عضوة VIP
                    </span>
                    <h5 className="font-serif text-xs font-bold text-luxe-black">{user.name}</h5>
                  </div>
                </div>
                <span className="text-[11px] text-gold-800 font-semibold bg-white px-2.5 py-1 rounded-full border border-gold-200">
                  صالوني الخاص ←
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gold-50 text-gold-900 font-semibold text-xs border border-gold-200 mb-2 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gold-700" />
                  تسجيل الدخول / الانضمام للنادي
                </span>
                <span>←</span>
              </button>
            )}

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`block w-full text-right px-4 py-2.5 rounded-lg text-sm font-medium ${
                  activeCategory === cat.id
                    ? 'bg-gold-50 text-gold-800 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
