import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Lock, CreditCard, Sparkles, Truck, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, shippingFee, clearCart } = useCart();
  const { user, addOrderToProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    postalCode: user?.postalCode || '',
    city: user?.city || '',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        postalCode: user.postalCode || prev.postalCode,
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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      postalCode: formData.postalCode,
      city: formData.city,
      country: 'France',
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
        customerEmail: formData.email,
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
        <div className="p-6 border-b border-[#eee7da] flex items-center justify-between bg-[#faf8f5]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700">دار أوريلي باريس</span>
            <h3 className="font-serif text-xl font-bold text-luxe-black">
              {completedOrder ? 'تأكيد طلبكِ الفاخر' : 'الدفع الآمن وتأكيد الشحن'}
            </h3>
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
                تم تأكيد طلبكِ رقم <strong className="text-gold-800">#{completedOrder.orderNumber}</strong> بنجاح.
                أرسلنا تفاصيل الفاتورة والتتبع إلى بريدكِ <strong>{formData.email || 'المسجل'}</strong>.
              </p>
            </div>

            <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#eee7da] max-w-md mx-auto text-right space-y-2 text-xs text-luxe-charcoal">
              <div className="flex items-center gap-2 text-gold-800 font-bold mb-2">
                <Truck className="w-4 h-4" />
                <span>شحن سريع ومؤمن خلال 24-48 ساعة</span>
              </div>
              <p>• العنوان : <strong>{formData.address}، {formData.postalCode} {formData.city}</strong></p>
              <p>• المبلغ المسدد : <strong>{cartTotal.toFixed(2)} €</strong> (شامل كافة الرسوم)</p>
              <p>• سيتم تغليف إكسسواراتكِ بعناية في أكياس ساتان لحمايتها وصندوق الدار الأنيق.</p>
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
            
            {/* بيانات التوصيل */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-luxe-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-800 text-xs flex items-center justify-center font-bold">1</span>
                عنوان وبيانات التوصيل
              </h4>

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
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">البريد الإلكتروني للتتبع</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="yasmine@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                  />
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">الرمز البريدي</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="75001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">المدينة</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="باريس / الجزائر"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border border-[#e1d9cc] rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-gold-500 text-right"
                  />
                </div>
              </div>
            </div>

            {/* طريقة الدفع */}
            <div className="space-y-4 pt-4 border-t border-[#eee7da]">
              <h4 className="font-serif text-sm font-bold text-luxe-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-800 text-xs flex items-center justify-center font-bold">2</span>
                طريقة الدفع الآمنة
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-gold-700" />
                  <span className="text-[11px]">بطاقة بنكية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    formData.paymentMethod === 'apple'
                      ? 'border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-gold-700" />
                  <span className="text-[11px]">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    formData.paymentMethod === 'cash'
                      ? 'border-gold-500 bg-gold-50 text-gold-900 font-bold shadow-xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-gold-700" />
                  <span className="text-[11px]">عند الاستلام</span>
                </button>
              </div>

              {formData.paymentMethod === 'card' && (
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
              )}
            </div>

            {/* المجموع والتأكيد */}
            <div className="pt-4 border-t border-[#eee7da] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs text-luxe-muted">المبلغ الإجمالي</span>
                <p className="font-serif text-2xl font-bold text-luxe-black">
                  {cartTotal.toFixed(2)} €
                </p>
                <span className="text-[10px] text-emerald-700 font-bold">
                  {shippingFee === 0 ? 'يشمل التوصيل المجاني' : `شامل مصاريف التوصيل ${shippingFee.toFixed(2)} €`}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full sm:w-auto gold-gradient-bg hover:opacity-95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-soft flex items-center justify-center gap-2 cursor-pointer transition active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'جاري تسجيل الطلب...' : `تأكيد وإتمام الشراء • ${cartTotal.toFixed(2)} €`}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
