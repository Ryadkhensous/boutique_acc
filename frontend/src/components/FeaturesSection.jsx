import React from 'react';
import { Gem, Clock, Sparkles, Package } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Gem,
      title: "ذهب خالص عيار 18 وعرق لؤلؤ",
      description: "مجوهراتنا مصوغة بعناية ومطلية بالذهب عيار 18 قيراط لضمان مقاومة مثالية للماء وحماية تامة للبشرة الحساسة."
    },
    {
      icon: Clock,
      title: "ساعات دقيقة بزجاج ياقوتي",
      description: "أقراص أنيقة بلمسات رخامية وعرق لؤلؤ مع محركات يابانية عالية الدقة وأساور شبكية مرنة تعانق معصمكِ بنعومة."
    },
    {
      icon: Sparkles,
      title: "قبعات كوتور ناعمة وعصرية",
      description: "أقمشة مخملية مضلعة وقطن طبيعي مغسول لإطلالة نسائية كاجوال وراقية تمنحكِ جاذبية باريسية في كل الفصول."
    },
    {
      icon: Package,
      title: "علبة هدايا فاخرة مجاناً",
      description: "يُغلف كل طلب بعناية داخل علبة توقيع الدار المزخرفة بالذهب والحرير مع كيس ساتان واقٍ لحفظ قطعكِ المفضلة."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#ece5da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-bordeaux-800 font-bold">
            تميز وإتقان الدار
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxe-black">
            لماذا تختارين دار أوريلي باريس؟
          </h2>
          <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed">
            تم تصميم كل إكسسوار ليرافقكِ عبر السنين بكل رقي، بالجمع بين أنبل المواد الحرفية والتصميم الباريسي الخالد.
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-[#faf7f2] p-6 rounded-3xl border border-[#ede5d8] hover:border-bordeaux-300 hover:shadow-soft transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#e5dfd2] text-bordeaux-800 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-bordeaux-800 group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-luxe-black mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-luxe-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
