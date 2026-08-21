/**
 * ==============================================================================
 * BUMBLE BURGER - CENTRALIZED CONFIGURATION & DATA (UNIVERSAL FORMAT)
 * ==============================================================================
 * Central configuration for restaurant info, ordering, payments, and menu.
 * Easy to update for other restaurants or modify numbers/fees in one place.
 * ==============================================================================
 */

// Central Restaurant & Ordering Configuration
const ORDER_CONFIG = {
  restaurantName: "Bumble Burger",
  whatsappNumber: "201002194064",
  vodafoneCashNumber: "01002194064", // Easily change Vodafone Cash wallet number here
  phoneDisplay: "0100 219 4064",
  phoneSecondaryDisplay: "0120 802 7777",
  defaultDeliveryFee: 25,
  currency: {
    ar: "ج.م",
    en: "LE"
  },
  // Delivery areas in Assiut with respective fees
  deliveryAreas: [
    { id: "walideyah", name: { ar: "الوليدية القبلية والبحرية", en: "Al Walideyah" }, fee: 20 },
    { id: "qalta", name: { ar: "شركة قلتة والنميس", en: "Sherket Qalta & El Nemeis" }, fee: 25 },
    { id: "university", name: { ar: "بوابة الجامعة وحي السادات", en: "Assiut University & El Sadat" }, fee: 25 },
    { id: "yousry", name: { ar: "يسري راغب وميدان المحطة والجمهورية", en: "Yousry Ragheb & El Gomhoreya" }, fee: 25 },
    { id: "azhar", name: { ar: "منطقة الأزهر وموقف الأزهر", en: "Al Azhar Area" }, fee: 25 },
    { id: "moalemeen", name: { ar: "المعلمين والأربعين ونزلة عبد اللاه", en: "El Moalemeen & Nazlet Abdallah" }, fee: 30 },
    { id: "assiut_jadida", name: { ar: "أسيوط الجديدة (طلب خاص)", en: "New Assiut (Special Delivery)" }, fee: 50 },
    { id: "other", name: { ar: "منطقة أخرى داخل أسيوط", en: "Other Area in Assiut" }, fee: 25 }
  ]
};

const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/h84HjgWTiHUpDgiaA";

const RESTAURANT_CONFIG = {
  name: {
    ar: "بامبل برجر",
    en: "Bumble Burger"
  },
  slogan: {
    ar: "أقوى برجر في أسيوط 🍔",
    en: "The Best Burger in Assiut 🍔"
  },
  subSlogan: {
    ar: "طعم يستاهل التجربة... وجودة هترجعك تاني.",
    en: "Taste worth experiencing... quality that brings you back."
  },
  contact: {
    phone: "+201002194064",
    phoneDisplay: "0100 219 4064",
    phoneSecondary: "+201208027777",
    phoneSecondaryDisplay: "0120 802 7777",
    whatsappNumber: ORDER_CONFIG.whatsappNumber,
    whatsappUrl: `https://wa.me/${ORDER_CONFIG.whatsappNumber}`,
    vodafoneCashNumber: ORDER_CONFIG.vodafoneCashNumber,
    googleMapsUrl: "https://maps.app.goo.gl/h84HjgWTiHUpDgiaA",
    googleReviewUrl: GOOGLE_REVIEW_URL,
    address: {
      ar: "الوليدية القبلية، قسم ثان أسيوط، أسيوط، مصر",
      en: "Al Walideyah Al Qebleyah, 2nd District, Assiut, Egypt"
    },
    openingHours: {
      ar: "يومياً: 12:00 ظهراً – 2:00 صباحاً",
      en: "Daily: 12:00 PM – 2:00 AM"
    }
  },
  currency: ORDER_CONFIG.currency
};

const MENU_CATEGORIES = [
  { id: "all", name: { ar: "الكل", en: "All" }, icon: "✨" },
  { id: "chicken", name: { ar: "برجر فراخ", en: "Chicken Burgers" }, icon: "🍗" },
  { id: "burgers", name: { ar: "برجر لحم", en: "Beef Burgers" }, icon: "🍔" },
  { id: "specialty", name: { ar: "أطباق خاصة", en: "Specialty Dishes" }, icon: "🍕" },
  { id: "meals", name: { ar: "وجبات كومبو", en: "Combos & Meals" }, icon: "🍟" },
  { id: "fries", name: { ar: "بطاطس ومقبلات", en: "Fries & Sides" }, icon: "🧀" },
  { id: "sauces", name: { ar: "صوصات", en: "Sauces & Dips" }, icon: "🥣" },
  { id: "drinks", name: { ar: "مشروبات", en: "Drinks" }, icon: "🥤" }
];

const MENU_ITEMS = [
  {
    id: "chicken-island",
    category: "chicken",
    name: { ar: "اتشيكن ايلاند", en: "Chicken Island" },
    description: {
      ar: "صدر فراخ كرسبي مقرمش مع حلقة بصل مقلية ذهبية، صوص جبنة بيضاء شيدر سايحة، خس طازج، وخردل مميز في عيش بريوش طري.",
      en: "Crunchy fried chicken breast topped with a golden battered onion ring, molten white cheese lava, crisp greens, and special sauce."
    },
    price: 165,
    badge: { ar: "الأكثر طلباً 🔥", en: "Best Seller 🔥" },
    image: "assets/images/chicken-island.svg",
    isPopular: true
  },
  {
    id: "el-matafi",
    category: "chicken",
    name: { ar: "المطافي", en: "El Matafi (Fire Blaze)" },
    description: {
      ar: "لعشاق السبايسي والتحدي! صدر دجاج مقرمش مغطى بصوص الشطة والبهارات الحارة، مخلل، خس فريش، وصوص المطافي الناري.",
      en: "For spice lovers! Fiery red crispy glazed chicken breast with spicy seasonings, crisp pickles, lettuce, and blazing hot sauce."
    },
    price: 140,
    badge: { ar: "سبايسي نار 🌶️🔥", en: "Fiery Hot 🌶️🔥" },
    image: "assets/images/el-matafi.svg",
    isPopular: true
  },
  {
    id: "overdose-burger",
    category: "chicken",
    name: { ar: "اوفر دوس", en: "Overdose Burger" },
    description: {
      ar: "برج كرسبي عملاق! طبقات مضاعفة من صدور الدجاج المقرمشة، جبنة شيدر سايحة، رانش، خس، صوص بامبل السري + كانز مثلج.",
      en: "Massive towering burger! Multi-layered crunchy chicken fillets smothered in molten cheddar, cool ranch, and signature sauce + drink."
    },
    price: 240,
    badge: { ar: "سوبر جاينت 🍔👑", en: "Super Giant 🍔👑" },
    image: "assets/images/overdose.svg",
    isPopular: true
  },
  {
    id: "paparazzi-burger",
    category: "chicken",
    name: { ar: "بابارازى", en: "Paparazzi" },
    description: {
      ar: "صدر دجاج كرسبي جولد متبل بتتبيلة بامبل الحصرية، جبنة شيدر، شرائح طماطم فريش، خس مقرمش، وصوص بابارازى الكريمي.",
      en: "Glazed golden crispy chicken breast with signature Paparazzi seasoning, cheddar slice, fresh tomato, crisp lettuce, and house sauce."
    },
    price: 165,
    badge: { ar: "مميز ✨", en: "Signature ✨" },
    image: "assets/images/paparazzi.svg",
    isPopular: true
  },
  {
    id: "babu-burger",
    category: "chicken",
    name: { ar: "بابو", en: "Babu (Hulk Power)" },
    description: {
      ar: "قطعة فراخ كرسبي عملاقة مغطاة بطبقات من صوص الجبنة الشيدر الذهبية، خس، ومايونيز كريمي في عيش بريوش فاخر.",
      en: "Giant crispy chicken fillet drenched in rich golden cheddar lava, fresh crisp greens, and creamy house mayo on toasted brioche."
    },
    price: 135,
    badge: { ar: "قنبلة الجبنة 🧀", en: "Cheese Bomb 🧀" },
    image: "assets/images/babu.svg",
    isPopular: false
  },
  {
    id: "barco-burger",
    category: "chicken",
    name: { ar: "باركو", en: "Barco" },
    description: {
      ar: "صدر فراخ مقرمش محمل بقطع البيكون البقري المدخن / البسطرمة، صوص جبنة أبيض غني، صوص باربكيو مدخن، وطماطم فريش.",
      en: "Crispy chicken breast loaded with savory beef bacon / pastrami slices, melted white cheese sauce, smoky BBQ glaze, and tomato."
    },
    price: 175,
    badge: { ar: "بيكون مدخن 🥓", en: "Smoky Bacon 🥓" },
    image: "assets/images/barco.svg",
    isPopular: true
  },
  {
    id: "buzz-beef",
    category: "burgers",
    name: { ar: "باظ", en: "Buzz (Baz)" },
    description: {
      ar: "شريحة لحم بلدي مشوية مع قطعة موتزاريلا ستيك مقلية مقرمشة، صوص جبنة سايحة، مخلل، وخس في خبز بريوش طازج.",
      en: "Juicy beef patty topped with a crispy fried mozzarella patty, molten melted cheese, sliced dill pickles, and crisp lettuce."
    },
    price: 135,
    badge: { ar: "موتزاريلا كرانش 🧀", en: "Mozzarella Crunch 🧀" },
    image: "assets/images/buzz.svg",
    isPopular: true
  },
  {
    id: "el-pop-dish",
    category: "specialty",
    name: { ar: "البوب", en: "El Pop (Dish / Bowl)" },
    description: {
      ar: "طبق مميز من قطع الفراخ الكرسبي المقرمشة، مغطاة بقطع السلامي / البيبروني، صوص الطماطم المتبل، والجبنة الموزاريلا والشيدر.",
      en: "Signature loaded bowl of crispy chicken popcorn bites topped with pepperoni slices, melted mozzarella & cheddar, and seasoned tomato glaze."
    },
    price: 145,
    badge: { ar: "حصري بامبل 🌟", en: "Exclusive Bowl 🌟" },
    image: "assets/images/el-pop.svg",
    isPopular: true
  },
  {
    id: "burger-classic-smash",
    category: "burgers",
    name: { ar: "بامبل كلاسيك سماش", en: "Bumble Classic Smash" },
    description: {
      ar: "شريحة لحم بلدي مشوية على الجريل، جبنة شيدر سايحة، صوص بامبل السري، خس طازج، مخلل، وبصل مكرمل.",
      en: "Smashed premium beef patty, melted cheddar, signature Bumble secret sauce, fresh lettuce, pickles, and caramelized onions."
    },
    price: 110,
    badge: { ar: "كلاسيك 🍔", en: "Classic 🍔" },
    image: "assets/images/burger-classic.svg",
    isPopular: false
  },
  {
    id: "burger-double-cheese-bomb",
    category: "burgers",
    name: { ar: "دبل تشيز بومب", en: "Double Cheese Bomb" },
    description: {
      ar: "قطعتين لحم جوسي مع طبقات مضاعفة من صوص الجبنة الشيدر الذهبية، بيكون بقري مقرمش، وصوص باربكيو مدخن.",
      en: "Double smashed beef patties with double molten golden cheddar, crispy beef bacon, and smoky BBQ drizzle."
    },
    price: 155,
    badge: { ar: "دبل باتي 🥩", en: "Double Patty 🥩" },
    image: "assets/images/burger-double.svg",
    isPopular: false
  },
  {
    id: "meal-bumble-solo",
    category: "meals",
    name: { ar: "وجبة بامبل الفردية", en: "Bumble Solo Meal" },
    description: {
      ar: "أي ساندوتش برجر من اختيارك + بطاطس مقرمشة متبلة + مشروب غازي مثلج + صوص شيدر.",
      en: "Your choice of signature burger + seasoned golden fries + ice-cold beverage + cheddar dip cup."
    },
    price: 165,
    badge: { ar: "قيمة عالية 🌟", en: "Great Value 🌟" },
    image: "assets/images/combo-solo.svg",
    isPopular: false
  },
  {
    id: "meal-double-trouble",
    category: "meals",
    name: { ar: "وجبة الثنائي (دابل تريت)", en: "Double Treat Meal (For 2)" },
    description: {
      ar: "2 ساندوتش برجر + لارج فرايز محملة بالجبنة + 2 مشروب غازي + 2 صوص.",
      en: "2 signature burgers + 1 large cheesy loaded fries + 2 cold beverages + 2 dip sauces."
    },
    price: 290,
    badge: { ar: "لشخصين 👥", en: "For 2 👥" },
    image: "assets/images/combo-duo.svg",
    isPopular: false
  },
  {
    id: "fries-cheesy-loaded",
    category: "fries",
    name: { ar: "لودد تشيز فرايز", en: "Loaded Cheese Fries" },
    description: {
      ar: "بطاطس ذهبية مقرمشة غرقانة في صوص الجبنة الشيدر، مع لحم مفروم متبل، هالابينو، وصوص بامبل الخاص.",
      en: "Crispy golden french fries smothered in warm cheddar cheese sauce, seasoned ground beef, sliced jalapeños, and signature drizzle."
    },
    price: 75,
    badge: { ar: "توب سايد ⭐", en: "Top Side ⭐" },
    image: "assets/images/fries-loaded.svg",
    isPopular: false
  },
  {
    id: "fries-golden-classic",
    category: "fries",
    name: { ar: "بطاطس كلاسيك مقرمشة", en: "Crispy Golden Fries" },
    description: {
      ar: "أصابع بطاطس مقلية ذهبية ومقرمشة مع رشة من بهارات بامبل السرية اللذيذة.",
      en: "Hot and crunchy golden potato fries seasoned with Bumble's secret herb spice mix."
    },
    price: 40,
    badge: { ar: "مقرمش 🍟", en: "Crunchy 🍟" },
    image: "assets/images/fries-classic.svg",
    isPopular: false
  },
  {
    id: "sides-onion-rings",
    category: "fries",
    name: { ar: "حلقات البصل المقرمشة", en: "Crispy Onion Rings" },
    description: {
      ar: "حلقات بصل مقرمشة وذهبية متبلة تقدم مع صوص الرانش الغني.",
      en: "Golden crunchy battered onion rings served with creamy herb ranch dip."
    },
    price: 50,
    badge: { ar: "ذهبي 🧅", en: "Golden 🧅" },
    image: "assets/images/sides-onion.svg",
    isPopular: false
  },
  {
    id: "sauce-bumble-secret",
    category: "sauces",
    name: { ar: "صوص بامبل السري", en: "Bumble Secret Sauce" },
    description: {
      ar: "خلطة صوص بامبل المميزة التي تجمع بين الحلاوة الخفيفة واللسعة الكريمية اللذيذة.",
      en: "Our famous house-crafted sauce blending tangy sweetness with creamy savory depth."
    },
    price: 15,
    badge: { ar: "حصري ✨", en: "House Exclusive" },
    image: "assets/images/sauce-bumble.svg",
    isPopular: false
  },
  {
    id: "sauce-molten-cheddar",
    category: "sauces",
    name: { ar: "صوص الجبنة الشيدر السايحة", en: "Molten Cheddar Dip" },
    description: {
      ar: "كوب صوص جبنة شيدر أصلية دافئة وغنية لعشاق التغميس.",
      en: "Warm, rich, velvety melted American cheddar dip cup."
    },
    price: 20,
    badge: { ar: "شيدر 🧀", en: "Cheddar 🧀" },
    image: "assets/images/sauce-cheddar.svg",
    isPopular: false
  },
  {
    id: "sauce-smoky-bbq",
    category: "sauces",
    name: { ar: "صوص باربكيو مدخن", en: "Smoky BBQ Sauce" },
    description: {
      ar: "صوص باربكيو على الطريقة الأمريكية بطعم التدخين الغني ولمسة عسل.",
      en: "Authentic slow-smoked sweet BBQ sauce with hints of black pepper."
    },
    price: 15,
    badge: { ar: "مدخن 🪵", en: "Smoked 🪵" },
    image: "assets/images/sauce-bbq.svg",
    isPopular: false
  },
  {
    id: "drink-soft-can",
    category: "drinks",
    name: { ar: "مشروبات غازية مثلجة", en: "Chilled Soft Drinks" },
    description: {
      ar: "بيبسي / سفن آب / ميرندا مثلجة ومنعشة تروي عطشك مع البرجر.",
      en: "Ice-cold refreshing soft drinks (Pepsi, 7Up, Mirinda)."
    },
    price: 25,
    badge: { ar: "منعش ❄️", en: "Refreshing ❄️" },
    image: "assets/images/drink-soda.svg",
    isPopular: false
  },
  {
    id: "drink-mineral-water",
    category: "drinks",
    name: { ar: "مياه معدنية نقية", en: "Mineral Water" },
    description: {
      ar: "زجاجة مياه معدنية طبيعية نقية ومثلجة.",
      en: "Pure bottled chilled mineral water."
    },
    price: 12,
    badge: { ar: "طبيعي 💧", en: "Natural 💧" },
    image: "assets/images/drink-water.svg",
    isPopular: false
  }
];

// Special Promotional Offers
const SPECIAL_OFFERS = [
  {
    id: "offer-combo-deal",
    badge: { ar: "عرض التوفير 🔥", en: "Combo Deal 🔥" },
    name: { ar: "عرض الكومبو الفردي", en: "Ultimate Solo Combo" },
    subtitle: { ar: "برجر سينجل + بطاطس + كانز + صوص شيدر", en: "Single Burger + Fries + Drink + Cheddar Dip" },
    description: {
      ar: "استمتع ببرجر كلاسيك لحم أو فراخ مقرمش مع بطاطس ذهبية ومشروبك المفضل وصوص الجبنة.",
      en: "Enjoy any classic beef or crispy chicken burger with seasoned fries, your favorite drink, and cheddar sauce."
    },
    tag: { ar: "العرض الأنسب للغداء 🍔", en: "Best for Lunch 🍔" },
    price: 165,
    image: "assets/images/offer-combo.svg"
  },
  {
    id: "offer-family-gathering",
    badge: { ar: "عرض اللمة العائلية 👨‍👩‍👧‍👦", en: "Family Feast 👨‍👩‍👧‍👦" },
    name: { ar: "عرض العيلة والصحاب", en: "Family & Friends Gathering" },
    subtitle: { ar: "4 برجر متنوع + 2 لارج فرايز + 4 مشروب + 3 صوصات", en: "4 Signature Burgers + 2 Large Fries + 4 Drinks + 3 Dips" },
    description: {
      ar: "لمة صحابك أو عيلتك متكملش غير مع برجر بامبل! تشكيلة من 4 ساندوتشات لحم وفراخ تكفي الجميع.",
      en: "Make family time unforgettable! 4 varied beef and chicken burgers, huge loaded fries, and 4 drinks."
    },
    tag: { ar: "أوفر للمجموعات 🎉", en: "Top Group Saver 🎉" },
    price: 490,
    image: "assets/images/offer-family.svg"
  },
  {
    id: "offer-student-boost",
    badge: { ar: "عرض إفطار وطلبة 🎓", en: "Student Power Offer 🎓" },
    name: { ar: "عرض الطالب والجامعة", en: "Student Quick Buster" },
    subtitle: { ar: "ساندوتش برجر بابو + فرايز مقرمشة + كانز", en: "Babu Burger + Crunchy Fries + Drink" },
    description: {
      ar: "لكل طلبة كليات وجامعة أسيوط! وجبة سريعة ومغذية تسندك بين المحاضرات وبسعر مناسب جداً.",
      en: "For all Assiut university students! Fast, delicious, energizing meal between classes at student-friendly value."
    },
    tag: { ar: "سريع واقتصادي ⚡", en: "Fast & Economical ⚡" },
    price: 160,
    image: "assets/images/offer-student.svg"
  }
];

// Attach to window for universal browser script access
window.BumbleData = {
  ORDER_CONFIG,
  GOOGLE_REVIEW_URL,
  RESTAURANT_CONFIG,
  MENU_CATEGORIES,
  MENU_ITEMS,
  SPECIAL_OFFERS
};
