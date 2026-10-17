import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowLeft, ShieldCheck, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loginAsDemo } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let res;
    if (isRegister) {
      res = await register(formData);
    } else {
      res = await login(formData.email, formData.password);
    }

    setLoading(false);
    if (!res.success) {
      setError(res.message || 'حدث خطأ، يُرجى المحاولة ثانية');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in text-right">
      <div
        className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#ede5d8] my-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* رأس النافذة */}
        <div className="bg-gradient-to-br from-[#3c0a15] via-[#541221] to-[#28050e] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-full overflow-hidden border border-gold-400/50 shadow-soft bg-[#ece5d5]">
            <img
              src="/logo.png"
              alt="دار أوريلي باريس"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-[10px] uppercase font-bold tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-gold-400" />
            النادي الخاص
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight">
            دار أوريلي باريس
          </h3>
          <p className="text-xs text-[#eed5da] mt-1 leading-relaxed">
            صالونكِ الخاص لمتابعة طلبياتكِ وجمع المكافآت الحصرية.
          </p>
        </div>

        {/* زر التجربة السريعة بنقرة واحدة */}
        <div className="px-6 pt-5 pb-2">
          <button
            type="button"
            onClick={loginAsDemo}
            className="w-full bg-[#faf7f2] hover:bg-cream-100 border border-bordeaux-300 text-bordeaux-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-xs group"
          >
            <Sparkles className="w-4 h-4 text-bordeaux-700 group-hover:scale-110 transition-transform" />
            <span>تجربة بنقرة واحدة : حساب VIP كاميل (تجريبي)</span>
          </button>
        </div>

        {/* التبديل بين الدخول والتسجيل */}
        <div className="px-6 pt-3">
          <div className="flex border-b border-[#ece4d6] text-xs font-bold">
            <button
              onClick={() => { setIsRegister(false); setError(null); }}
              className={`flex-1 pb-2.5 transition text-center border-b-2 cursor-pointer ${
                !isRegister ? 'border-bordeaux-700 text-bordeaux-900' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => { setIsRegister(true); setError(null); }}
              className={`flex-1 pb-2.5 transition text-center border-b-2 cursor-pointer ${
                isRegister ? 'border-bordeaux-700 text-bordeaux-900' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              إنشاء حساب VIP جديد
            </button>
          </div>
        </div>

        {/* نموذج البيانات */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 font-medium">
              {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="مثال: ياسمين بلقاسم"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pr-10 pl-3 py-2.5 bg-[#faf7f2] border border-[#ded5c7] rounded-xl text-xs text-gray-900 outline-none focus:border-bordeaux-600 text-right"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="yasmine@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pr-10 pl-3 py-2.5 bg-[#faf7f2] border border-[#ded5c7] rounded-xl text-xs text-gray-900 outline-none focus:border-bordeaux-600 text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pr-10 pl-3 py-2.5 bg-[#faf7f2] border border-[#ded5c7] rounded-xl text-xs text-gray-900 outline-none focus:border-bordeaux-600 text-right font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bordeaux-gradient-bg hover:opacity-95 text-white font-bold text-xs py-3.5 rounded-full shadow-soft flex items-center justify-center gap-2 cursor-pointer transition active:scale-98 mt-2"
          >
            <span>{loading ? 'جاري التحقق...' : isRegister ? 'إنشاء حسابي والانضمام' : 'الدخول إلى صالوني الخاص'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* مزايا العضوية */}
          <div className="pt-3 border-t border-[#f0ebd4] space-y-1.5 text-[11px] text-luxe-muted">
            <div className="flex items-center gap-2 text-gold-800 font-medium">
              <Gift className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span>100 نقطة ترحيبية مهداة فور التسجيل + علبة هدايا مخملية</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>متابعة حية وفورية لتجهيز وشحن مجوهراتكِ</span>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
