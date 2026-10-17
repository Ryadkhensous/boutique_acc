import React, { useState, useEffect, useCallback } from 'react';
import {
  X, Sparkles, Package, Truck, CheckCircle2,
  Gift, MapPin, Copy, Check, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserDashboardModal({ isOpen, onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // التفضيلات
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', postalCode: '',
    preferredMetal: 'ذهب أصفر عيار 18', ringSize: '52'
  });

  // تحديث بيانات النموذج عند تسجيل الدخول
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        preferredMetal: user.preferredMetal || 'ذهب أصفر عيار 18',
        ringSize: user.ringSize || '52'
      });
    }
  }, [user]);

  // إعادة تهيئة الحالة عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      setActiveTab('orders');
      setSaveSuccess(false);
      setCopiedCode(false);
    }
  }, [isOpen]);

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
    if (!isOpen || !user) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, user, handleClose]);

  // قفل تمرير الخلفية
  useEffect(() => {
    if (!isOpen || !user) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(user.referralCode || 'AURELIE-GOLD-2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const orders = user.orders || [];
  const loyaltyPoints = user.loyaltyPoints || 480;
  const pointsGoal = 600;
  const progressPercent = Math.min(100, (loyaltyPoints / pointsGoal) * 100);

  const tabs = [
    { id: 'orders', label: 'طلباتي', icon: Package, count: orders.length },
    { id: 'preferences', label: 'تفضيلاتي', icon: Sparkles },
    { id: 'loyalty', label: 'المكافآت', icon: Gift },
    { id: 'address', label: 'عناويني', icon: MapPin },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 text-right transition-opacity duration-250 ${
        isClosing ? 'opacity-0' : 'animate-fade-in'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] flex flex-col max-h-[94vh] transition-all duration-250 ${
          isClosing ? 'opacity-0 translate-y-4 scale-98' : 'animate-slide-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ═══════ رأس الصالون الخاص ═══════ */}
        <div className="bg-gradient-to-br from-[#3c0a15] via-[#541221] to-[#3c0a15] text-white p-5 sm:p-6 relative flex-shrink-0">
          {/* زر الإغلاق */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {/* الصورة الرمزية */}
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user.name}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-gold-400/60 shadow-md"
              />
              <span className="absolute -bottom-0.5 -left-0.5 bg-gold-500 text-white p-1 rounded-full text-[10px] shadow-sm">
                ✨
              </span>
            </div>

            {/* بيانات العضوة */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[9px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                {user.vipTier || 'سفيرة VIP ذهبية'}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                {user.name}
              </h3>
              <p className="text-[11px] text-[#ffd0dc] truncate">
                {user.email}
              </p>
            </div>

            {/* رصيد المكافآت */}
            <div className="hidden sm:block bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3 text-right min-w-[160px] flex-shrink-0">
              <span className="text-[9px] uppercase font-bold tracking-wider text-gold-300">رصيد المكافآت</span>
              <p className="font-serif text-xl font-bold text-white mt-0.5">
                {loyaltyPoints} <span className="text-[11px] font-normal text-gold-200">نقطة</span>
              </p>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-gold-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[8px] text-[#ffe3ea] mt-1">
                بقي {Math.max(0, pointsGoal - loyaltyPoints)} نقطة للحصول على قطعة مهداة
              </p>
            </div>
          </div>

          {/* رصيد المكافآت موبايل */}
          <div className="sm:hidden mt-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl font-bold text-white">{loyaltyPoints}</span>
                <span className="text-[10px] text-gold-200">نقطة مكافآت</span>
              </div>
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-1">
                <div className="bg-gold-400 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <span className="text-[9px] text-[#ffe3ea]">
              بقي {Math.max(0, pointsGoal - loyaltyPoints)} نقطة
            </span>
          </div>
        </div>

        {/* ═══════ شريط التبويبات ═══════ */}
        <div className="bg-[#faf8f5] border-b border-[#eee7da] flex-shrink-0">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSaveSuccess(false); }}
                  className={`flex-1 py-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold transition border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-bordeaux-700 text-bordeaux-900 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-bordeaux-700' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-bordeaux-100 text-bordeaux-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════ محتوى التبويبات (قابل للتمرير) ═══════ */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-5 sm:p-6 space-y-5">

            {/* ────── التبويب 1 : الطلبات والتتبع ────── */}
            {activeTab === 'orders' && (
              <div className="space-y-5">
                {orders.length === 0 ? (
                  <div className="text-center py-14 space-y-3">
                    <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto">
                      <Package className="w-8 h-8 text-gold-300" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-luxe-black">لا توجد طلبات جارية</h4>
                    <p className="text-xs text-luxe-muted max-w-xs mx-auto leading-relaxed">
                      ستظهر هنا طلباتكِ ومراحل تجهيزها في ورشتنا فور إتمام أي طلب.
                    </p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const isShipped = order.status === 'SHIPPED';
                    const isPreparing = order.status === 'PREPARING';
                    const isDelivered = order.status === 'DELIVERED';

                    const steps = [
                      { label: 'تم التأكيد', sub: 'دفع إلكتروني آمن', done: true, icon: CheckCircle2, color: 'bg-emerald-600' },
                      { label: 'الورشة', sub: 'صقل وتغليف هدية', done: isPreparing || isShipped || isDelivered, icon: Sparkles, color: 'bg-gold-500' },
                      { label: 'جاري الشحن', sub: 'توصيل 48 ساعة', done: isShipped || isDelivered, icon: Truck, color: 'bg-gold-600' },
                      { label: 'تم الاستلام', sub: 'عند باب بيتكِ', done: isDelivered, icon: CheckCircle2, color: 'bg-emerald-600' },
                    ];

                    return (
                      <div
                        key={order.id || order.orderNumber}
                        className="border border-[#ede5d8] rounded-2xl overflow-hidden bg-white shadow-xs"
                      >
                        {/* رأس الطلب */}
                        <div className="p-4 sm:p-5 bg-[#faf8f5] border-b border-[#eee7da]">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-serif font-bold text-sm text-luxe-black">
                              طلب #{order.orderNumber}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isShipped
                                ? 'bg-amber-100 text-amber-800'
                                : isDelivered
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gold-100 text-gold-800'
                            }`}>
                              {isShipped ? 'جاري الشحن' : isDelivered ? 'تم التوصيل' : 'قيد التجهيز'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-luxe-muted">
                            <span>{order.date || 'مؤخراً'}</span>
                            <span>الإجمالي : <strong className="text-luxe-black">{order.totalAmount?.toFixed(2)} DA</strong></span>
                            {order.trackingNumber && (
                              <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-[#e1d9cc]">
                                <Truck className="w-3 h-3 text-gold-600" />
                                رقم التتبع : <strong>{order.trackingNumber}</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* مراحل الطلب */}
                        <div className="px-4 sm:px-5 py-4">
                          <p className="text-[10px] font-bold text-luxe-muted uppercase tracking-wider mb-3">
                            مراحل تجهيز طلبكِ
                          </p>
                          <div className="flex items-start justify-between relative">
                            {/* خط التقدم */}
                            <div className="absolute top-[14px] right-[14px] left-[14px] h-[2px] bg-gray-200 z-0">
                              <div
                                className="h-full bg-gold-500 transition-all duration-500 rounded-full"
                                style={{
                                  width: `${isDelivered ? 100 : isShipped ? 66 : isPreparing ? 33 : 0}%`
                                }}
                              />
                            </div>

                            {steps.map((step, idx) => {
                              const StepIcon = step.icon;
                              return (
                                <div key={idx} className="flex flex-col items-center text-center z-10 flex-1">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs border-2 ${
                                    step.done
                                      ? `${step.color} text-white border-transparent`
                                      : 'bg-white text-gray-300 border-gray-200'
                                  }`}>
                                    <StepIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <p className={`text-[10px] font-bold mt-1.5 ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {step.label}
                                  </p>
                                  <p className="text-[8px] text-gray-400 hidden sm:block">{step.sub}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* المنتجات في الطلب */}
                        {order.items && order.items.length > 0 && (
                          <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#f0ebd4] space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-[#faf8f5] p-2.5 rounded-xl border border-[#efe9de]">
                                <img
                                  src={item.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80'}
                                  alt={item.name}
                                  className="w-11 h-11 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-right">
                                  <p className="font-serif text-xs font-bold text-luxe-black truncate">{item.name}</p>
                                  <p className="text-[10px] text-luxe-muted">الكمية : {item.quantity} • {item.price?.toFixed(2)} DA</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ────── التبويب 2 : التفضيلات ────── */}
            {activeTab === 'preferences' && (
              <div className="space-y-5 max-w-xl mx-auto">
                <div>
                  <h4 className="font-serif text-base font-bold text-luxe-black">
                    تفضيلاتكِ الحرفية
                  </h4>
                  <p className="text-xs text-luxe-muted mt-0.5 leading-relaxed">
                    تتيح هذه التفضيلات لدارنا تقديم أفضل النصائح والمقاسات التي تليق بذوقكِ.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
                    <Check className="w-4 h-4" />
                    تم حفظ تفضيلاتكِ بنجاح.
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-luxe-black mb-2">
                      معدنكِ الثمين المفضل :
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['ذهب أصفر عيار 18', 'ذهب وردي ناعم', 'فضة استرليني 925'].map((metal) => (
                        <button
                          key={metal}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredMetal: metal })}
                          className={`p-3 rounded-xl border text-center transition cursor-pointer text-[11px] font-bold leading-snug ${
                            formData.preferredMetal === metal
                              ? 'border-gold-600 bg-gold-50 text-gold-900 shadow-xs'
                              : 'border-[#ded6c9] bg-white text-gray-700 hover:bg-[#fbf9f6]'
                          }`}
                        >
                          {metal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-luxe-black mb-1">
                      مقاس الخاتم المفضل :
                    </label>
                    <p className="text-[11px] text-luxe-muted mb-2">
                      المقاس الأوروبي القياسي لمحيط إصبعكِ.
                    </p>
                    <div className="grid grid-cols-4 gap-2.5">
                      {['50 (ناعم)', '52 (قياسي)', '54 (متوسط)', '56 (عريض)'].map((size) => {
                        const val = size.split(' ')[0];
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFormData({ ...formData, ringSize: val })}
                            className={`py-2.5 px-2 rounded-xl border text-center transition cursor-pointer text-[11px] font-bold ${
                              formData.ringSize === val
                                ? 'border-gold-600 bg-gold-500 text-white shadow-xs'
                                : 'border-[#ded6c9] bg-white text-gray-700 hover:bg-[#fbf9f6]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="gold-gradient-bg text-white font-bold text-xs px-7 py-3 rounded-full shadow-soft hover:opacity-95 transition cursor-pointer"
                  >
                    حفظ التفضيلات
                  </button>
                </form>
              </div>
            )}

            {/* ────── التبويب 3 : المزايا والمكافآت ────── */}
            {activeTab === 'loyalty' && (
              <div className="space-y-5">
                <div>
                  <h4 className="font-serif text-base font-bold text-luxe-black">
                    مزاياكِ الحصرية في نادي الدار
                  </h4>
                  <p className="text-xs text-luxe-muted mt-0.5">
                    بصفتكِ <strong className="text-gold-800">{user.vipTier || 'سفيرة VIP'}</strong>، تستمتعين بامتيازات دائمة.
                  </p>
                </div>

                {/* بطاقات المزايا */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Truck, title: 'شحن مجاني دائم', desc: 'على كافة طلباتكِ دون حد أدنى للشراء.' },
                    { icon: Gift, title: 'علبة هدية ساتانية', desc: 'يُغلف كل إكسسوار في علبة الدار الفاخرة.' },
                    { icon: Sparkles, title: 'أسبقية الشراء 48h', desc: 'أولوية حصرية لتشكيلات الإصدار المحدود.' },
                  ].map((perk, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#faf8f5] border border-[#ede5d8] space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-gold-500 text-white flex items-center justify-center">
                        <perk.icon className="w-4 h-4" />
                      </div>
                      <h5 className="font-serif text-sm font-bold text-luxe-black">{perk.title}</h5>
                      <p className="text-[11px] text-luxe-muted leading-relaxed">{perk.desc}</p>
                    </div>
                  ))}
                </div>

                {/* صندوق دعوة الصديقات */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-gold-50 via-[#faf5ee] to-gold-50 border border-gold-200 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800">
                    اهدي 15 DA لصديقتكِ
                  </span>
                  <h5 className="font-serif text-sm font-bold text-luxe-black">
                    رمز الدعوة والمكافأة الخاص بكِ
                  </h5>
                  <p className="text-[11px] text-luxe-muted max-w-md leading-relaxed">
                    شاركي هذا الرمز مع صديقاتكِ. تحصل كل واحدة على <strong>خصم 15 DA</strong> على أول طلب، وتحصلين أنتِ على <strong>150 نقطة مكافأة</strong> !
                  </p>

                  <div className="flex items-center gap-2.5 pt-1">
                    <span className="bg-white border border-gold-300 font-mono font-bold text-gold-900 px-4 py-2 rounded-xl text-sm tracking-wider shadow-xs" dir="ltr">
                      {user.referralCode || 'AURELIE-GOLD-2026'}
                    </span>
                    <button
                      onClick={handleCopyReferral}
                      className="bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'تم النسخ !' : 'نسخ الرمز'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ────── التبويب 4 : العناوين والمعلومات ────── */}
            {activeTab === 'address' && (
              <div className="space-y-5 max-w-xl mx-auto">
                <div>
                  <h4 className="font-serif text-base font-bold text-luxe-black">
                    عناوين وبيانات التوصيل
                  </h4>
                  <p className="text-xs text-luxe-muted mt-0.5 leading-relaxed">
                    تُستخدم هذه المعلومات لتعبئة بيانات الشحن تلقائياً عند الدفع.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
                    <Check className="w-4 h-4" />
                    تم حفظ بياناتكِ بنجاح.
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الكامل</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">رقم هاتف التوصيل</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">العنوان البريدي</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الرمز البريدي</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">المدينة</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      className="gold-gradient-bg text-white font-bold text-xs px-7 py-3 rounded-full shadow-soft hover:opacity-95 transition cursor-pointer"
                    >
                      حفظ العنوان
                    </button>

                    <button
                      type="button"
                      onClick={logout}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
