import React, { useState } from 'react';
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

  // التفضيلات
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    preferredMetal: user?.preferredMetal || 'ذهب أصفر عيار 18',
    ringSize: user?.ringSize || '52'
  });

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in text-right">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] my-8 animate-slide-up flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس الصالون الخاص */}
        <div className="bg-gradient-to-r from-[#3f101e] via-[#5c162c] to-[#3f101e] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* الصورة الرمزية */}
            <div className="relative">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-3 border-gold-400 shadow-md bg-white/10"
              />
              <span className="absolute bottom-0 left-0 bg-gold-500 text-white p-1 rounded-full text-xs shadow-xs">
                ✨
              </span>
            </div>

            {/* بيانات العضوة */}
            <div className="text-center sm:text-right flex-1 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-gold-400" />
                {user.vipTier || 'سفيرة VIP ذهبية'}
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                {user.name}
              </h3>
              <p className="text-xs text-[#ffd0dc]">
                عضوة النادي الخاص • {user.email}
              </p>
            </div>

            {/* رصيد المكافآت */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-right sm:min-w-[190px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-300">رصيد المكافآت</span>
              <p className="font-serif text-2xl font-bold text-white mt-0.5">
                {user.loyaltyPoints || 480} <span className="text-xs font-normal text-gold-200">نقطة</span>
              </p>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-gold-400 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((user.loyaltyPoints || 480) / 600) * 100)}%` }}
                />
              </div>
              <p className="text-[9px] text-[#ffe3ea] mt-1">
                بقي {Math.max(0, 600 - (user.loyaltyPoints || 480))} نقطة للحصول على قطعة مهداة
              </p>
            </div>
          </div>
        </div>

        {/* شريط علامات التبويب */}
        <div className="bg-[#faf8f5] px-6 border-b border-[#eee7da] flex overflow-x-auto gap-4 sm:gap-8 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'border-gold-600 text-gold-900 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4 text-gold-600" />
            <span>طلباتي والتتبع المباشر ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'preferences'
                ? 'border-gold-600 text-gold-900 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>ملفي وتفضيلات الأناقة</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'loyalty'
                ? 'border-gold-600 text-gold-900 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Gift className="w-4 h-4 text-gold-600" />
            <span>المكافآت ودعوة الصديقات</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`py-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'address'
                ? 'border-gold-600 text-gold-900 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-gold-600" />
            <span>عناويني وبياناتي</span>
          </button>
        </div>

        {/* محتوى علامات التبويب */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white space-y-6">
          
          {/* التبويب 1 : الطلبات والتتبع */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-gold-300 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-luxe-black">لا توجد طلبات جارية</h4>
                  <p className="text-xs text-luxe-muted max-w-sm mx-auto leading-relaxed">
                    ستظهر هنا طلباتكِ ومراحل تجهيزها الحرفي في ورشتنا فور إتمام أي طلب.
                  </p>
                </div>
              ) : (
                orders.map((order) => {
                  const isShipped = order.status === 'SHIPPED';
                  const isPreparing = order.status === 'PREPARING';
                  const isDelivered = order.status === 'DELIVERED';

                  return (
                    <div
                      key={order.id}
                      className="border border-[#ede5d8] rounded-3xl p-5 sm:p-6 bg-[#faf8f5] shadow-xs space-y-5"
                    >
                      {/* رأس الطلب */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eee7da]">
                        <div>
                          <div className="flex items-center gap-2">
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
                              {isShipped ? 'جاري الشحن السريع' : isDelivered ? 'تم التوصيل' : 'قيد التجهيز في الورشة'}
                            </span>
                          </div>
                          <p className="text-[11px] text-luxe-muted mt-0.5">
                            {order.date || 'مؤخراً'} • الإجمالي : <strong className="text-luxe-black">{order.totalAmount?.toFixed(2)} €</strong>
                          </p>
                        </div>

                        {order.trackingNumber && (
                          <div className="bg-white px-3 py-1.5 rounded-xl border border-[#e1d9cc] text-[11px] flex items-center gap-2">
                            <Truck className="w-3.5 h-3.5 text-gold-600" />
                            <span className="text-gray-600">رقم التتبع : <strong>{order.trackingNumber}</strong></span>
                          </div>
                        )}
                      </div>

                      {/* مراحل الطلب */}
                      <div>
                        <p className="text-[11px] font-bold text-luxe-muted uppercase tracking-wider mb-3">
                          مراحل تجهيز طلبكِ :
                        </p>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                          
                          <div className="space-y-1.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <p className="font-bold text-gray-800">تم التأكيد</p>
                            <p className="text-[9px] text-gray-400">دفع إلكتروني آمن</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                              isPreparing || isShipped || isDelivered ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                              <Sparkles className="w-4 h-4 animate-pulse" />
                            </div>
                            <p className="font-bold text-gray-800">الورشة</p>
                            <p className="text-[9px] text-gray-400">صقل وتغليف هدية</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                              isShipped || isDelivered ? 'bg-gold-600 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                              <Truck className="w-4 h-4" />
                            </div>
                            <p className="font-bold text-gray-800">جاري الشحن</p>
                            <p className="text-[9px] text-gray-400">توصيل 48 ساعة</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                              isDelivered ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <p className="font-bold text-gray-800">تم الاستلام</p>
                            <p className="text-[9px] text-gray-400">عند باب بيتكِ</p>
                          </div>

                        </div>
                      </div>

                      {/* المنتجات في الطلب */}
                      <div className="pt-2 border-t border-[#eee7da] space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-[#efe9de]">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0 text-right">
                              <p className="font-serif text-xs font-bold text-luxe-black truncate">{item.name}</p>
                              <p className="text-[11px] text-luxe-muted">الكمية : {item.quantity} • {item.price?.toFixed(2)} €</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* التبويب 2 : التفضيلات */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h4 className="font-serif text-lg font-bold text-luxe-black">
                  تفضيلاتكِ الحرفية في الورشة
                </h4>
                <p className="text-xs text-luxe-muted mt-0.5 leading-relaxed">
                  تتيح هذه التفضيلات لدارنا تقديم أفضل النصائح والمقاسات التي تليق بذوقكِ الرفيع.
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
                  <div className="grid grid-cols-3 gap-3">
                    {['ذهب أصفر عيار 18', 'ذهب وردي ناعم', 'فضة استرليني 925'].map((metal) => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredMetal: metal })}
                        className={`p-3 rounded-2xl border text-center transition cursor-pointer text-xs font-bold ${
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
                  <div className="flex gap-3">
                    {['50 (ناعم)', '52 (قياسي)', '54 (متوسط)', '56 (عريض)'].map((size) => {
                      const val = size.split(' ')[0];
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, ringSize: val })}
                          className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition cursor-pointer text-xs font-bold ${
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

          {/* التبويب 3 : المزايا والمكافآت */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg font-bold text-luxe-black">
                  مزاياكِ الحصرية في نادي الدار
                </h4>
                <p className="text-xs text-luxe-muted mt-0.5">
                  بصفتكِ <strong className="text-gold-800">{user.vipTier || 'سفيرة VIP'}</strong>، تستمتعين بامتيازات دائمة طوال العام.
                </p>
              </div>

              {/* بطاقات المزايا */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#ede5d8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-500 text-white flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-sm font-bold text-luxe-black">شحن مجاني دائم</h5>
                  <p className="text-[11px] text-luxe-muted leading-relaxed">
                    على كافة طلباتكِ دون اشتراط حد أدنى للشراء.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#ede5d8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-500 text-white flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-sm font-bold text-luxe-black">علبة هدية ساتانية</h5>
                  <p className="text-[11px] text-luxe-muted leading-relaxed">
                    يُغلف كل إكسسوار في علبة الدار الفاخرة مع منديل التلميع الحريري.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#ede5d8] space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-gold-500 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-sm font-bold text-luxe-black">أسبقية الشراء بـ 48 ساعة</h5>
                  <p className="text-[11px] text-luxe-muted leading-relaxed">
                    أولوية حصرية لاقتناء تشكيلات الإصدار المحدود قبل الجميع.
                  </p>
                </div>
              </div>

              {/* صندوق دعوة الصديقات */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-gold-50 via-[#faf5ee] to-gold-50 border border-gold-200 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800">
                  اهدي 15 € لصديقتكِ
                </span>
                <h5 className="font-serif text-base font-bold text-luxe-black">
                  رمز الدعوة والمكافأة الخاص بكِ
                </h5>
                <p className="text-xs text-luxe-muted max-w-lg leading-relaxed">
                  شاركي هذا الرمز مع صديقاتكِ. تحصل كل واحدة منهن على <strong>خصم 15 €</strong> على أول طلب، وتحصلين أنتِ على <strong>150 نقطة مكافأة</strong> !
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <span className="bg-white border border-gold-300 font-mono font-bold text-gold-900 px-4 py-2.5 rounded-xl text-sm tracking-wider shadow-xs" dir="ltr">
                    {user.referralCode || 'AURELIE-GOLD-2026'}
                  </span>
                  <button
                    onClick={handleCopyReferral}
                    className="bg-[#2d2724] hover:bg-gold-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'تم النسخ !' : 'نسخ الرمز'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* التبويب 4 : العناوين والمعلومات */}
          {activeTab === 'address' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h4 className="font-serif text-lg font-bold text-luxe-black">
                  عناوين وبيانات التوصيل
                </h4>
                <p className="text-xs text-luxe-muted mt-0.5 leading-relaxed">
                  تُستخدم هذه المعلومات لتعبئة تفاصيل الشحن تلقائياً عند الدفع لاختصار وقتكِ.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
                  <Check className="w-4 h-4" />
                  تم حفظ بياناتكِ بنجاح.
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">رقم هاتف التوصيل</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">العنوان البريدي</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">الرمز البريدي</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">المدينة</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#ded5c7] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
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
  );
}
