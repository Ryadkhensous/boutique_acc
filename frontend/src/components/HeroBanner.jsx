import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, Truck, Gift, Award } from 'lucide-react';
import heroLandscape from '../assets/hero-landscape.jpg';

export default function HeroBanner({ onSelectCategory }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5ee] via-[#f7f0e6] to-[#faf8f5] py-10 lg:py-16 border-b border-[#eee7da]">
      {/* عناصر خلفية زخرفية ناعمة */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blush-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* عمود النصوص والعناوين */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-200 text-xs font-bold text-gold-800 tracking-wider shadow-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              مجموعة ربيع وصيف 2026 الحصرية
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-luxe-black leading-[1.25] font-bold tracking-tight">
              الأناقة الباريسية الأنثوية،{' '}
              <span className="italic font-serif text-gold-700 font-bold block sm:inline">في أدق تفاصيلها.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-luxe-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              ارتقي بإطلالتكِ مع تشكيلاتنا الاستثنائية: مجوهرات راقية مطلية بالذهب عيار 18، ساعات فاخرة بلمسات رخامية ساحرة، وقبعات عصرية صُممت لتبرز جاذبيتكِ الفريدة.
            </p>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => onSelectCategory('bijoux')}
                className="gold-gradient-bg text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-soft hover:shadow-glow transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>اكتشفي المجوهرات</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectCategory('montres')}
                className="bg-white hover:bg-[#f6f2ea] text-luxe-black border border-[#e4ded3] font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:border-gold-300"
              >
                الساعات الفاخرة
              </button>

              <button
                onClick={() => onSelectCategory('casquettes')}
                className="text-xs uppercase tracking-wider text-luxe-muted hover:text-gold-700 font-bold underline underline-offset-4 py-2 px-3"
              >
                قبعات مخملية وأنيقة ←
              </button>
            </div>

            {/* بطاقات الثقة والضمانات */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-[#ece4d6]">
              <div className="flex items-center gap-2.5 text-right">
                <Truck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-luxe-black leading-tight">توصيل خلال 48 ساعة</p>
                  <p className="text-[10px] text-luxe-muted">مجاني من 60 €</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-right">
                <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-luxe-black leading-tight">ذهب عيار 18</p>
                  <p className="text-[10px] text-luxe-muted">مقاوم تام للماء</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-right">
                <Gift className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-luxe-black leading-tight">علبة هدايا فاخرة</p>
                  <p className="text-[10px] text-luxe-muted">مقدمة مع كل طلب</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-right">
                <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-luxe-black leading-tight">ضمان سنتين</p>
                  <p className="text-[10px] text-luxe-muted">ضمان الاستبدال والرضا</p>
                </div>
              </div>
            </div>

          </div>

          {/* عمود الصورة الرئيسية */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full">
              
              {/* إطار الصورة الكبيرة */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxe border-4 border-white bg-white group aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={heroLandscape}
                  alt="مجموعة مجوهرات وساعات دار أوريلي باريس"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* تدرج هادئ للتباين */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* بطاقة عائمة فوق الصورة */}
                <div className="absolute bottom-4 right-4 left-4 sm:bottom-5 sm:right-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/70 shadow-lg flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold-500" />
                      طقم استثنائي فاخر
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-luxe-black">
                      قلادة سولستيس وساعة أورا ذهب وردي
                    </h3>
                    <p className="text-xs text-gold-800 font-bold mt-0.5">
                      إصدار محدود لموسم ربيع 2026
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectCategory('bijoux')}
                    className="gold-gradient-bg text-white text-xs font-semibold px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm hover:opacity-95 cursor-pointer whitespace-nowrap"
                  >
                    اكتشفي الآن
                  </button>
                </div>
              </div>

              {/* بطاقة عائمة صغيرة للساعة */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 hidden sm:block bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-gold-100 max-w-[150px] animate-fade-in text-right">
                <img
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80"
                  alt="ساعة أورا أنيقة"
                  className="w-full h-20 object-cover rounded-xl mb-1.5"
                />
                <div>
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">ساعة أورا رخامية</p>
                  <p className="text-[10px] text-gold-600 font-bold">119,00 €</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
