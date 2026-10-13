import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#1c1917] text-[#e7e2db] pt-16 pb-12 border-t border-[#2e2a27] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2e2a27]">
          
          {/* عمود العلامة التجارية */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.15em] font-bold text-white uppercase">
                أوريلي
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-gold-400 uppercase font-medium mt-0.5">
                باريس • دار الإكسسوارات الفاخرة
              </span>
            </div>
            <p className="text-xs text-[#a8a199] leading-relaxed max-w-sm">
              دار فرنسية مكرسة للاحتفاء بأناقة وسحر المرأة المعاصرة. مجوهرات متألقة مطلية بالذهب عيار 18، ساعات بتصاميم استثنائية وقبعات كوتور فاخرة.
            </p>
            <div className="flex items-center gap-3 pt-2 justify-start">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-[#2a2624] hover:bg-gold-600 text-white flex items-center justify-center transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-[#2a2624] hover:bg-gold-600 text-white flex items-center justify-center transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* عمود المجموعات */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              مجموعاتنا
            </h4>
            <ul className="space-y-2 text-xs text-[#a8a199]">
              <li>
                <button onClick={() => onSelectCategory('bijoux')} className="hover:text-gold-300 transition text-right">
                  مجوهرات وقلادات ذهبية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bijoux')} className="hover:text-gold-300 transition text-right">
                  خواتم مرصعة بالزركون
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('montres')} className="hover:text-gold-300 transition text-right">
                  ساعات بأقراص رخامية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('montres')} className="hover:text-gold-300 transition text-right">
                  ساعات بحزام جلد طبيعي
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('casquettes')} className="hover:text-gold-300 transition text-right">
                  قبعات مخملية مضلعة
                </button>
              </li>
            </ul>
          </div>

          {/* عمود المساعدة وخدمة العملاء */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              المساعدة وخدمة العملاء
            </h4>
            <ul className="space-y-2 text-xs text-[#a8a199]">
              <li><span className="hover:text-gold-300 cursor-pointer">تتبع طلبيتكِ</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">مواعيد وتفاصيل الشحن</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">الاستبدال والإرجاع (30 يوماً)</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">دليل مقاسات الخواتم</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">تواصل مع ورشتنا بباريس</span></li>
            </ul>
          </div>

          {/* عمود البنية التقنية */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide">
              الهندسة التقنية
            </h4>
            <div className="space-y-1.5 text-xs text-[#a8a199]">
              <p>• الواجهة : React + Vite + Tailwind</p>
              <p>• الخلفية : Node.js + Express</p>
              <p>• قاعدة البيانات : Prisma + PostgreSQL</p>
              <p>• الاستضافة : جاهز لنظام <strong>Render</strong></p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a2624] text-[10px] text-emerald-400 border border-[#3e3935]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  واجهة Render البرمجية جاهزة
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* حقوق النشر */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8279]">
          <p>© 2026 أوريلي باريس. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>صُنع بكل رقي وفخامة لإبراز الجمال الأنثوي</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>

      </div>
    </footer>
  );
}
