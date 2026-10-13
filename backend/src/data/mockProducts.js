export const initialProducts = [
  // --- BIJOUX ---
  {
    id: 1,
    name: "قلادة سولستيس من الذهب عيار 18 وعرق اللؤلؤ",
    slug: "collier-solstice-dore-nacre",
    description: "قلادة ساحرة مرصعة بميدالية من عرق اللؤلؤ الطبيعي المتلألئ وسلسلة مطلية بالذهب عيار 18 قيراط. مقاومة للماء ومضادة للحساسية، مثالية لإبراز أناقتكِ اليومية بلمسة باريسية راقية.",
    price: 49.99,
    originalPrice: 65.00,
    category: "bijoux",
    subCategory: "colliers",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591475152-473523dd66c4?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    badge: "الأكثر مبيعاً",
    material: "ذهب عيار 18 قيراط (3 ميكرون) وعرق اللؤلؤ",
    featured: true
  },
  {
    id: 2,
    name: "خاتم النجمة المرصع بأحجار الزركون البراقة",
    slug: "bague-etoilee-pavee-zircons",
    description: "خاتم قابل للتعديل مصاغ من الفضة عيار 925 المطلية بالذهب، ومرصع بأحجار زركونيا دقيقة عاكسة للضوء. قطعة فنية راقية يمكن ارتداؤها منفردة أو مع خواتم أخرى.",
    price: 39.00,
    originalPrice: 48.00,
    category: "bijoux",
    subCategory: "bagues",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 8,
    rating: 4.8,
    reviewCount: 24,
    badge: "مفضل الأسبوع",
    material: "فضة استرليني 925 وكريستال زركون",
    featured: true
  },
  {
    id: 3,
    name: "أقراط لؤلؤ الباروك الطبيعي الفاخر",
    slug: "boucles-oreilles-perles-baroques",
    description: "أقراط دائرية ذهبية ملفوفة بعناية ومزينة بلآلئ مياه عذبة طبيعية فريدة. تتميز كل قطعة بتموجات ولمعان عضوي لا يتكرر.",
    price: 45.00,
    originalPrice: 55.00,
    category: "bijoux",
    subCategory: "boucles",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 19,
    rating: 5.0,
    reviewCount: 42,
    badge: "جديد",
    material: "فولاذ مقاوم للصدأ مذهب ولؤلؤ طبيعي",
    featured: false
  },
  {
    id: 4,
    name: "سوار لومينا الصلب المجدول المطلي بالذهب",
    slug: "bracelet-jonc-tresse-lumina",
    description: "سوار صلب مفتوح منقوش يدوياً بنعومة مع لمسة نهائية ذهبية ساتانية بلون الشامبانيا. يتكيف بسهولة مع كل معصم دون أن يفقد شكله.",
    price: 34.50,
    originalPrice: 42.00,
    category: "bijoux",
    subCategory: "bracelets",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611591475152-473523dd66c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 22,
    rating: 4.7,
    reviewCount: 19,
    badge: null,
    material: "فولاذ مقاوم للصدأ ومضاد للحساسية",
    featured: false
  },
  {
    id: 11,
    name: "قلادة سيليست الثلاثية المتدرجة بنجوم وهلال ذهبي",
    slug: "collier-cascade-trois-rangs-celeste",
    description: "تناغم مثالي لثلاث سلاسل ذهبية بأطوال متناسقة، مزدانة بنجوم مصقولة صغيرة وميدالية هلال ناعمة تبرز سحر العنق.",
    price: 52.00,
    originalPrice: 65.00,
    category: "bijoux",
    subCategory: "colliers",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591475152-473523dd66c4?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 34,
    badge: "عرض خاص",
    material: "ذهب عيار 18 قيراط بلمسة نهائية ساتانية",
    featured: false
  },

  // --- MONTRES ---
  {
    id: 5,
    name: "ساعة أورا من الذهب الوردي بقرص رخامي فاخر",
    slug: "montre-aura-or-rose-cadran-marbre",
    description: "ساعة تجمع بين الدقة والأناقة الفائقة. قرص فائق النحافة بنقشة رخام كرارا الأبيض الفاخر، هيكل ذهبي وردي رقيق وسوار شبكي ميلانيزي مرن وقابل للتعديل.",
    price: 119.00,
    originalPrice: 149.00,
    category: "montres",
    subCategory: "montres-dorees",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 11,
    rating: 4.9,
    reviewCount: 57,
    badge: "الأكثر مبيعاً",
    material: "فولاذ 316L وزجاج ياقوتي ومحرك كوارتز ياباني",
    featured: true
  },
  {
    id: 6,
    name: "ساعة هيريتيج بحزام جلد طبيعي بيج وإطار ذهبي",
    slug: "montre-heritage-cuir-nude-dore",
    description: "طابع كلاسيكي خالد مع سوار من الجلد الإيطالي الفاخر بلون النيود البودري وقرص هادئ مزين بمؤشرات ذهبية دقيقة تمنحك إطلالة أنثوية مميزة.",
    price: 95.00,
    originalPrice: 120.00,
    category: "montres",
    subCategory: "montres-cuir",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviewCount: 31,
    badge: "إصدار محدود",
    material: "جلد إيطالي أصلي وهيكل مذهب",
    featured: true
  },
  {
    id: 7,
    name: "ساعة إكليبس المصغرة بإطار وسوار ذهبي",
    slug: "montre-petite-eclipse-doree",
    description: "هيكل صغير أنيق بقطر 28 مم مخصص للمعاصم الناعمة. سوار بوصلات ذهبية قابلة للتعديل ومشبك فراشة آمن، مقاومة للماء حتى 3 ATM.",
    price: 105.00,
    originalPrice: null,
    category: "montres",
    subCategory: "montres-dorees",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 28,
    badge: "جديد",
    material: "ستانلس ستيل مذهب عالي التحمل",
    featured: false
  },
  {
    id: 12,
    name: "ساعة كرونوغراف فاخرة بقرص عرق اللؤلؤ والشامبانيا",
    slug: "montre-chrono-minimaliste-nacre-champagne",
    description: "توليفة راقية بين دقة صناعة الساعات والجمال الأنثوي الأخّاذ. أقراص فرعية أنيقة، عقارب انسيابية وسوار شبكي ذهبي ميلاني مصقول بعناية.",
    price: 135.00,
    originalPrice: 165.00,
    category: "montres",
    subCategory: "montres-dorees",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 7,
    rating: 5.0,
    reviewCount: 22,
    badge: "الأكثر مبيعاً",
    material: "ستانلس ستيل جراحي 316L ومحرك ياباني",
    featured: true
  },

  // --- CASQUETTES ---
  {
    id: 8,
    name: "قبعة بيسبول قطنية ناعمة بلون وردي بودري 'أمور'",
    slug: "casquette-coton-rose-poudre-amour",
    description: "قبعة بيسبول منسوجة من قطن التويل الفاخر المغسول وفائق النعومة. تطريز أمامي باريسي أنيق مع مشبك معدني خلفي لضبط المقاس بدقة.",
    price: 29.90,
    originalPrice: 38.00,
    category: "casquettes",
    subCategory: "casquettes-brodees",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 46,
    badge: "الأكثر مبيعاً",
    material: "100% قطن طبيعي قابل للتنفس Oeko-Tex",
    featured: true
  },
  {
    id: 9,
    name: "قبعة مخملية مضلعة كلاسيكية بلون الرمل الدافئ",
    slug: "casquette-velours-cotele-sable",
    description: "نسيج مخملي مضلع دافئ وناعم بلون الساند الراقي. تضفي لمسة فينتيج دافئة وعصرية على إطلالاتكِ في كل فصول السنة.",
    price: 32.00,
    originalPrice: null,
    category: "casquettes",
    subCategory: "casquettes-velours",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 17,
    rating: 4.9,
    reviewCount: 19,
    badge: "مفضل الأسبوع",
    material: "مخمل قطني مضلع فاخر",
    featured: true
  },
  {
    id: 10,
    name: "قبعة كلاسيكية خفيفة بلون الزيتوني الهادئ",
    slug: "casquette-minimaliste-kaki-olive",
    description: "لون زيتوني هادئ بتصميم عصري من 6 ألواح مع حافة منحنية مسبقاً. مثالية لمظهر كاجوال مريح وأنيق في آن واحد.",
    price: 28.00,
    originalPrice: 35.00,
    category: "casquettes",
    subCategory: "casquettes-brodees",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    ]),
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 15,
    badge: "خصم 20%",
    material: "قماش كانفاس قطني متين",
    featured: false
  }
];
