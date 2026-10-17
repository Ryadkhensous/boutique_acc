import React, { useState, useEffect, useCallback } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose, onReviewAdded }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isClosing, setIsClosing] = useState(false);

  // نموذج إضافة تقييم
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // إغلاق متحرك
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  // إغلاق بمفتاح Escape
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [product, handleClose]);

  // قفل التمرير في الخلفية عند فتح النافذة
  useEffect(() => {
    if (!product) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [product]);

  // إعادة تهيئة الحالة عند فتح منتج جديد
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setJustAdded(false);
      setActiveTab('description');
      setReviewAuthor('');
      setReviewRating(5);
      setReviewComment('');
      setReviewSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  let imagesList = [];
  try {
    imagesList = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {
    imagesList = [product.images || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'];
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleSendReview = async (e) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    setReviewSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviewSuccess(true);
        setReviewAuthor('');
        setReviewComment('');
        if (onReviewAdded) onReviewAdded(product.id, data.data);
      }
    } catch {
      // محاكاة محلية
      setReviewSuccess(true);
      setReviewAuthor('');
      setReviewComment('');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const reviews = product.reviews || [
    {
      id: 101,
      author: 'ياسمين ب.',
      rating: 5,
      comment: 'قطعة غاية في الرقة والجمال، أجمل بكثير من الصور! والتغليف فاخر جداً يصلح كهدية مميزة.',
      date: 'مؤخراً'
    }
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-right transition-opacity duration-250 ${
        isClosing ? 'opacity-0' : 'animate-fade-in'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] flex flex-col max-h-[92vh] transition-all duration-250 ${
          isClosing ? 'opacity-0 translate-y-4 scale-98' : 'animate-slide-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق في أعلى اليسار (RTL) */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* المحتوى القابل للتمرير */}
        <div className="overflow-y-auto overscroll-contain flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
            
            {/* عمود معرض الصور */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#ece4d6]">
                <img
                  src={imagesList[selectedImageIndex] || imagesList[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-[#2a2421] text-gold-200 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* الصور المصغرة */}
              {imagesList.length > 1 && (
                <div className="flex gap-3">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx ? 'border-gold-500 shadow-md scale-102' : 'border-[#e4ded3] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`مصغرة ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* عمود التفاصيل والشراء */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              
              <div className="space-y-3">
                {/* التقييم وزر المفضلة */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-luxe-muted font-medium">
                      {product.rating || 4.9} ({reviews.length} تقييم)
                    </span>
                  </div>

                  {/* زر المفضلة */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-rose-500 transition font-bold cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{isFavorite ? 'محفوظ' : 'إضافة للمفضلة'}</span>
                  </button>
                </div>

                {/* اسم المنتج */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxe-black leading-snug">
                  {product.name}
                </h3>

                {product.material && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold-50 border border-gold-200 text-xs font-bold text-gold-800">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    {product.material}
                  </div>
                )}

                {/* السعر */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-serif text-3xl font-bold text-luxe-black">
                    {product.price.toFixed(2)} DA
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice.toFixed(2)} DA
                      </span>
                      <span className="text-xs font-bold text-gold-800 bg-gold-50 border border-gold-200 px-2 py-0.5 rounded-full">
                        وفرتِ {(product.originalPrice - product.price).toFixed(2)} DA
                      </span>
                    </>
                  )}
                </div>

                {/* الوصف القصير */}
                <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed">
                  {product.description}
                </p>

                {/* المخزون */}
                <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  متوفر بالمخزون — شحن فوري اليوم
                </p>
              </div>

              {/* محدد الكمية وزر الإضافة */}
              <div className="space-y-4 pt-4 border-t border-[#eee7da]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#d8d0c2] rounded-full bg-[#fbf9f6] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 text-sm font-bold transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 text-sm font-bold transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* زر أضف إلى السلة */}
                  <button
                    onClick={handleAddToCart}
                    disabled={justAdded}
                    className={`flex-1 py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-soft cursor-pointer ${
                      justAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bordeaux-gradient-bg hover:opacity-95 text-white active:scale-98'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        تمت الإضافة للسلة !
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        أضف إلى السلة • {(product.price * quantity).toFixed(2)} DA
                      </>
                    )}
                  </button>
                </div>

                {/* الضمانات */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-luxe-muted">
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                    <Truck className="w-4 h-4 text-bordeaux-700 mb-1" />
                    <span className="font-medium">توصيل 48 ساعة</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                    <RotateCcw className="w-4 h-4 text-bordeaux-700 mb-1" />
                    <span className="font-medium">إرجاع 30 يوماً</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-[#faf7f2]">
                    <ShieldCheck className="w-4 h-4 text-bordeaux-700 mb-1" />
                    <span className="font-medium">ضمان سنتين</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* علامات التبويب : الوصف والتقييمات */}
          <div className="border-t border-[#eee7da] bg-[#faf8f5] px-6 sm:px-8 py-6">
            <div className="flex border-b border-[#e5ded2] gap-6 text-sm font-bold mb-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 border-b-2 transition cursor-pointer ${
                  activeTab === 'description'
                    ? 'border-bordeaux-700 text-bordeaux-900 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                الوصف والعناية
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 border-b-2 transition cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-bordeaux-700 text-bordeaux-900 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                آراء العميلات ({reviews.length})
              </button>
            </div>

            {activeTab === 'description' ? (
              <div className="space-y-3 text-xs sm:text-sm text-luxe-charcoal leading-relaxed max-w-3xl">
                <p>{product.description}</p>
                <h5 className="font-bold text-luxe-black pt-2">نصائح العناية من دار أوريلي :</h5>
                <ul className="list-disc pr-5 space-y-1 text-luxe-muted">
                  <li>للحفاظ على بريق مجوهراتكِ، تجنبي الملامسة المباشرة الطويلة للعطور ومستحضرات التجميل.</li>
                  <li>نظفي القطع برقة باستخدام القماشة الناعمة المرفقة في علبة الهدية.</li>
                  <li>احفظي كل قطعة بمفردها داخل كيس الساتان الواقي الخاص بها.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl">
                {/* نموذج كتابة تقييم */}
                <form onSubmit={handleSendReview} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e8e0d2] space-y-3">
                  <h5 className="font-serif text-sm font-bold text-luxe-black">
                    شاركينا رأيكِ حول هذه القطعة
                  </h5>

                  {reviewSuccess && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      شكراً جزيلاً لتقييمكِ الثمين! تم نشره بنجاح.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">اسمكِ الكامل</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: ياسمين ب."
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="w-full px-3 py-2 border border-[#ded5c7] rounded-xl text-xs outline-none focus:border-gold-500 text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">التقييم العام</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#ded5c7] rounded-xl text-xs outline-none focus:border-gold-500 bg-white font-medium text-right"
                      >
                        <option value={5}>★★★★★ (5/5) ممتاز جداً</option>
                        <option value={4}>★★★★☆ (4/5) جميل جداً</option>
                        <option value={3}>★★★☆☆ (3/5) جيد</option>
                        <option value={2}>★★☆☆☆ (2/5) متوسط</option>
                        <option value={1}>★☆☆☆☆ (1/5) غير راضية</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">تعليقكِ</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="صفي تجربتكِ مع الخامة والجودة والتغليف..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ded5c7] rounded-xl text-xs outline-none focus:border-gold-500 text-right"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="bg-[#261518] hover:bg-bordeaux-800 text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition shadow-soft"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{reviewSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}</span>
                  </button>
                </form>

                {/* قائمة الآراء المنشورة */}
                <div className="space-y-3">
                  {reviews.map((rev, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-[#eee7da]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-serif text-xs font-bold text-luxe-black">{rev.author}</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-luxe-muted leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
