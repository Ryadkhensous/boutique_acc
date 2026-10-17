import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, Lock, CreditCard, Truck, Banknote, Home, Building2, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ALGERIA_WILAYAS } from '../data/algeriaWilayas';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, shippingFee, clearCart } = useCart();
  const { user, addOrderToProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    deliveryType: 'home', // 'home' | 'office'
    wilayaCode: '16',
    wilayaName: 'الجزائر',
    commune: 'الجزائر الوسطى',
    customCommune: '',
    address: user?.address || '',
    city: user?.city || '',
    paymentMethod: 'cash',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888'
  });

  const selectedWilayaObj = useMemo(() => {
    return ALGERIA_WILAYAS.find(w => w.code === formData.wilayaCode) || ALGERIA_WILAYAS[15];
  }, [formData.wilayaCode]);

  const currentCommunes = useMemo(() => {
    return selectedWilayaObj ? selectedWilayaObj.communes : [];
  }, [selectedWilayaObj]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWilayaChange = (e) => {
    const code = e.target.value;
    const found = ALGERIA_WILAYAS.find(w => w.code === code);
    const newCommune = found && found.communes.length > 0 ? found.communes[0] : '';
    setFormData(prev => ({
      ...prev,
      wilayaCode: code,
      wilayaName: found ? found.name : '',
      commune: newCommune,
      customCommune: ''
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalCommune = formData.commune === '__other__' ? formData.customCommune : formData.commune;
    const finalWilaya = `${formData.wilayaCode} - ${formData.wilayaName}`;

    const payload = {
      customerName: formData.name,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.paymentMethod === 'cash' ? `${finalWilaya} - ${finalCommune}` : formData.city,
      wilaya: formData.paymentMethod === 'cash' ? finalWilaya : undefined,
      commune: formData.paymentMethod === 'cash' ? finalCommune : undefined,
      deliveryType: formData.paymentMethod === 'cash' ? formData.deliveryType : undefined,
      country: 'Algérie',
      paymentMethod: formData.paymentMethod,
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      totalAmount: cartTotal
    };

    let orderResult = null;

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        orderResult = data.data;
      }
    } catch {
      // احتياطي عند عدم تشغيل السيرفر
      orderResult = {
        orderNumber: 'CMD-' + Math.floor(100000 + Math.random() * 900000),
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryType: formData.deliveryType,
        wilaya: finalWilaya,
        commune: finalCommune,
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod,
        totalAmount: cartTotal,
        items: cart
      };
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const finalOrder = orderResult || {
      orderNumber: 'CMD-' + Math.floor(100000 + Math.random() * 900000),
      deliveryType: formData.deliveryType,
      wilaya: finalWilaya,
      commune: finalCommune,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      totalAmount: cartTotal,
      items: cart,
      status: 'PREPARING',
      date: 'الآن'
    };

    if (addOrderToProfile) {
      addOrderToProfile({
        ...finalOrder,
        status: 'PREPARING',
        date: 'الآن'
      });
    }

    setCompletedOrder(finalOrder);
    clearCart();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in text-right">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس النافذة */}
        <div className="p-6 border-b border-[#eee7da] flex items-center justify-between bg-[#faf7f2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d8cdbf] shadow-xs flex-shrink-0 bg-[#ece5d5]">
              <img
                src="/logo.png"
                alt="دار أوريلي باريس"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-bordeaux-800">دار أوريلي باريس</span>
              <h3 className="font-serif text-xl font-bold text-luxe-black">
                {completedOrder ? 'تأكيد طلبكِ الفاخر' : 'الدفع وتأكيد الشحن'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 shadow-sm cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* جسم النافذة : شاشة النجاح أو النموذج */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-luxe-black">
                شكراً جزيلاً لطلبكِ، {formData.name || 'عزيزتي'} !
              </h4>
              <p className="text-sm text-luxe-muted max-w-md mx-auto leading-relaxed">
                تم تسجيل طلبكِ رقم <strong className="text-gold-800">#{completedOrder.orderNumber}</strong> بنجاح.
                سيتصل بكِ فريق التوصيل قريباً على رقمكِ <strong>{formData.phone || 'المسجل'}</strong> لتأكيد ميعاد التسليم.
              </p>
            </div>

            <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#eee7da] max-w-md mx-auto text-right space-y-2.5 text-xs text-luxe-charcoal">
              <div className="flex items-center gap-2 text-gold-800 font-bold mb-2">
                <Truck className="w-4 h-4" />
                <span>شحن وتوصيل مؤمن خلال 24-48 ساعة</span>
              </div>

              {completedOrder.paymentMethod === 'cash' ? (
                <>
                  <p>
                    • مكان الاستلام :{' '}
                    <strong>
                      {completedOrder.deliveryType === 'office'
                        ? '🏢 توصيل إلى المكتب / مقر العمل'
                        : '🏠 توصيل إلى باب المنزل'}
                    </strong>
                  </p>
                  <p>• الولاية والبلدية : <strong>{completedOrder.wilaya} — {completedOrder.commune}</strong></p>
                  <p>• العنوان التفصيلي : <strong>{formData.address}</strong></p>
                  <p>• الهاتف للتواصل : <strong>{formData.phone}</strong></p>
                  <p className="text-emerald-800 font-bold">
                    • طريقة الدفع : 💵 الدفع نقداً يداً بيد عند الاستلام
                  </p>
                </>
              ) : (
                <>
                  <p>• العنوان : <strong>{formData.address}، {formData.city}</strong></p>
                  <p>• الهاتف : <strong>{formData.phone}</strong></p>
                  <p>• طريقة الدفع : <strong>بطاقة بنكية</strong></p>
                </>
              )}

              <p>• المبلغ المطلوب : <strong>{cartTotal.toFixed(2)} DA</strong> (شامل كافة الرسوم)</p>
              <p className="text-[11px] text-gray-500">
                • سيتم تغليف إكسسواراتكِ بعناية في أكياس ساتان لحمايتها وصندوق الدار الأنيق.
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-4 gold-gradient-bg text-white font-bold text-xs px-8 py-3 rounded-full shadow-soft hover:opacity-95 transition cursor-pointer"
            >
              متابعة التسوق
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* اختيار طريقة الدفع أولاً */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-luxe-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-800 text-xs flex items-center justify-center font-bold">1</span>
                طريقة الدفع المفضلة
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    formData.paymentMethod === 'cash'
                      ? 'border-gold-500 bg-gold-50 text-gold-950 font-bold shadow-xs ring-1 ring-gold-400'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-gold-700" />
                  <span className="text-xs">الدفع يداً بيد (عند الاستلام)</span>
                  <span className="text-[10px] text-emerald-700 font-normal">خيار الشراء الأسهل والأكثر طلباً</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-gold-500 bg-gold-50 text-gold-950 font-bold shadow-xs ring-1 ring-gold-400'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-gold-700" />
                  <span className="text-xs">بطاقة بنكية / الذهبية / CIB</span>
                  <span className="text-[10px] text-gray-500 font-normal">دفع إلكتروني فوري وآمن</span>
                </button>
              </div>

              {formData.paymentMethod === 'cash' && (
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-900">
                  <Banknote className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    ستقومين بالدفع نقداً يداً بيد لمندوب التوصيل فور استلام وفحص مجوهراتكِ وإكسسواراتكِ.
                  </span>
                </div>
              )}
            </div>

            {/* بيانات التوصيل المخصصة */}
            <div className="space-y-4 pt-4 border-t border-[#eee7da]">
              <h4 className="font-serif text-sm font-bold text-luxe-black flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-800 text-xs flex items-center justify-center font-bold">2</span>
                  بيانات وعنوان التوصيل
                </span>
                {formData.paymentMethod === 'cash' && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                    مطلوب للتوصيل يداً بيد
                  </span>
                )}
              </h4>

              {/* الاسم ورقم الهاتف */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="مثال: ياسمين بلقاسم"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">رقم الهاتف للتواصل والتأكيد</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="مثال: 0550 12 34 56"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* حقول الدفع يداً بيد: مكان التوصيل (منزل أو مكتب)، 69 ولاية، بلدية تابعة */}
              {formData.paymentMethod === 'cash' ? (
                <>
                  {/* اختيار مكان التوصيل: إلى المنزل أو إلى المكتب */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                      مكان استلام الطلبية
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                        className={`p-3 rounded-2xl border text-center transition flex items-center justify-center gap-2 cursor-pointer ${
                          formData.deliveryType === 'home'
                            ? 'border-gold-600 bg-gold-50/90 text-gold-950 font-bold shadow-xs ring-1 ring-gold-400'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Home className="w-4 h-4 text-gold-700" />
                        <span className="text-xs">إلى المنزل (Domicile)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, deliveryType: 'office' })}
                        className={`p-3 rounded-2xl border text-center transition flex items-center justify-center gap-2 cursor-pointer ${
                          formData.deliveryType === 'office'
                            ? 'border-gold-600 bg-gold-50/90 text-gold-950 font-bold shadow-xs ring-1 ring-gold-400'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-gold-700" />
                        <span className="text-xs">إلى المكتب / العمل (Bureau)</span>
                      </button>
                    </div>
                  </div>

                  {/* الولاية (69 ولاية) والبلدية التابعة لها */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-700" />
                        <span>الولاية (69 ولاية جزائرية)</span>
                      </label>
                      <select
                        value={formData.wilayaCode}
                        onChange={handleWilayaChange}
                        className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right cursor-pointer"
                      >
                        {ALGERIA_WILAYAS.map(w => (
                          <option key={w.code} value={w.code}>
                            {w.code} - {w.name} ({w.nameFr})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        البلدية التابعة للولاية
                      </label>
                      <select
                        value={formData.commune}
                        onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                        className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right cursor-pointer"
                      >
                        {currentCommunes.map((c, idx) => (
                          <option key={idx} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="__other__">بلدية أخرى / منطقة مجاورة...</option>
                      </select>
                    </div>
                  </div>

                  {formData.commune === '__other__' && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        يرجى كتابة اسم البلدية أو المنطقة بالتحديد
                      </label>
                      <input
                        type="text"
                        name="customCommune"
                        required
                        placeholder="اكتب اسم البلدية أو المنطقة هنا..."
                        value={formData.customCommune}
                        onChange={handleChange}
                        className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                      />
                    </div>
                  )}

                  {/* العنوان التفصيلي يتكيف تلقائياً مع نوع المكان (منزل أو مكتب) */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      {formData.deliveryType === 'office'
                        ? 'عنوان المكتب أو مقر العمل بالتفصيل (اسم المؤسسة/الشركة، الطابق، رقم المكتب)'
                        : 'العنوان السكني بالتفصيل (اسم الشارع، الحي، رقم العمارة، الطابق)'}
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder={
                        formData.deliveryType === 'office'
                          ? 'مثال: شركة سوناطراك، الطابق الرابع، مكتب رقم 12'
                          : 'مثال: حي النور، عمارة 05، الطابق الثاني، شقة رقم 08'
                      }
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>
                </>
              ) : (
                /* إذا تم اختيار بطاقة بنكية */
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">العنوان بالتفصيل</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="رقم الشارع، الحي، العمارة..."
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">المدينة / الولاية</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="مثال: الجزائر، وهران، قسنطينة..."
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                    />
                  </div>

                  {/* تفاصيل البطاقة البنكية */}
                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-[#e8e0d2] space-y-2.5">
                    <div>
                      <label className="block text-[10px] text-gray-600 mb-0.5">رقم البطاقة</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.cardNumber}
                        className="w-full bg-white border border-[#ded5c7] rounded-xl px-3 py-1.5 text-xs text-gray-700 font-mono text-left"
                        dir="ltr"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-600 mb-0.5">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          readOnly
                          value={formData.cardExpiry}
                          className="w-full bg-white border border-[#ded5c7] rounded-xl px-3 py-1.5 text-xs text-gray-700 font-mono text-center"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-600 mb-0.5">رمز CVC</label>
                        <input
                          type="text"
                          readOnly
                          value={formData.cardCvc}
                          className="w-full bg-white border border-[#ded5c7] rounded-xl px-3 py-1.5 text-xs text-gray-700 font-mono text-center"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* المجموع والتأكيد */}
            <div className="pt-4 border-t border-[#eee7da] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs text-luxe-muted">المبلغ الإجمالي</span>
                <p className="font-serif text-2xl font-bold text-luxe-black">
                  {cartTotal.toFixed(2)} DA
                </p>
                <span className="text-[10px] text-emerald-700 font-bold">
                  {shippingFee === 0 ? 'يشمل التوصيل المجاني' : `شامل مصاريف التوصيل ${shippingFee.toFixed(2)} DA`}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full sm:w-auto bordeaux-gradient-bg hover:opacity-95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-soft flex items-center justify-center gap-2 cursor-pointer transition active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? 'جاري تسجيل الطلب...'
                    : formData.paymentMethod === 'cash'
                    ? `تأكيد الطلب والدفع عند الاستلام • ${cartTotal.toFixed(2)} DA`
                    : `تأكيد وإتمام الشراء • ${cartTotal.toFixed(2)} DA`}
                </span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
