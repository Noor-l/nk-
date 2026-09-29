import { CurrencyConfig, CurrencyCode } from '../types';

export const NISAB_WEIGHTS = {
  goldGrams: 87.48, // 7.5 tola
  goldTola: 7.5,
  silverGrams: 612.36, // 52.5 tola
  silverTola: 52.5,
  tolaInGrams: 11.664,
};

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: {
    code: 'PKR',
    nameEn: 'Pakistani Rupee (PKR)',
    nameUr: 'پاکستانی روپیہ (PKR)',
    symbol: 'Rs',
    defaultGoldPerGram: 23600,
    defaultSilverPerGram: 285,
    defaultGoldPerTola: 275000,
    defaultSilverPerTola: 3320,
  },
  USD: {
    code: 'USD',
    nameEn: 'US Dollar (USD)',
    nameUr: 'امریکی ڈالر (USD)',
    symbol: '$',
    defaultGoldPerGram: 85,
    defaultSilverPerGram: 1.05,
    defaultGoldPerTola: 990,
    defaultSilverPerTola: 12.2,
  },
  SAR: {
    code: 'SAR',
    nameEn: 'Saudi Riyal (SAR)',
    nameUr: 'سعودی ریال (SAR)',
    symbol: 'SR',
    defaultGoldPerGram: 318,
    defaultSilverPerGram: 3.95,
    defaultGoldPerTola: 3710,
    defaultSilverPerTola: 46,
  },
  AED: {
    code: 'AED',
    nameEn: 'UAE Dirham (AED)',
    nameUr: 'اماراتی درہم (AED)',
    symbol: 'AED',
    defaultGoldPerGram: 312,
    defaultSilverPerGram: 3.85,
    defaultGoldPerTola: 3640,
    defaultSilverPerTola: 45,
  },
  INR: {
    code: 'INR',
    nameEn: 'Indian Rupee (INR)',
    nameUr: 'بھارتی روپیہ (INR)',
    symbol: '₹',
    defaultGoldPerGram: 7200,
    defaultSilverPerGram: 88,
    defaultGoldPerTola: 84000,
    defaultSilverPerTola: 1025,
  },
  GBP: {
    code: 'GBP',
    nameEn: 'British Pound (GBP)',
    nameUr: 'برطانوی پاؤنڈ (GBP)',
    symbol: '£',
    defaultGoldPerGram: 67,
    defaultSilverPerGram: 0.82,
    defaultGoldPerTola: 780,
    defaultSilverPerTola: 9.5,
  },
  EUR: {
    code: 'EUR',
    nameEn: 'Euro (EUR)',
    nameUr: 'یورو (EUR)',
    symbol: '€',
    defaultGoldPerGram: 78,
    defaultSilverPerGram: 0.95,
    defaultGoldPerTola: 910,
    defaultSilverPerTola: 11,
  },
};

export const MASARIF_E_ZAKAT = [
  {
    number: 1,
    arabic: 'الْفُقَرَاءِ',
    nameEn: 'Al-Fuqara (The Poor)',
    nameUr: 'فقراء (انتہائی نادار)',
    descEn: 'Those who do not possess wealth equal to the Nisab threshold and have insufficient basic means.',
    descUr: 'وہ افراد جن کے پاس نصاب کے برابر مال نہیں ہے اور وہ روزمرہ کی بنیادی ضروریات کے لیے تنگ دست ہیں۔'
  },
  {
    number: 2,
    arabic: 'الْمَسَاكِينِ',
    nameEn: 'Al-Masakeen (The Destitute)',
    nameUr: 'مساکین (محتاج اور بے بس)',
    descEn: 'Those in severe destitution who have virtually nothing and are unable to earn a livelihood.',
    descUr: 'وہ مجبور اور محتاج جن کے پاس گزر بسر کے لیے کچھ بھی نہ ہو اور وہ اپنی روزی کمانے سے قاصر ہوں۔'
  },
  {
    number: 3,
    arabic: 'الْعَامِلِينَ عَلَيْهَا',
    nameEn: 'Al-Amileena Alayha (Zakat Collectors)',
    nameUr: 'عاملین (زکوٰۃ اکٹھا کرنے والے اہلکار)',
    descEn: 'Those appointed by an Islamic authority or legitimate institution to collect, administer, and distribute Zakat.',
    descUr: 'وہ افراد جنہیں اسلامی حکومت یا معتبر ادارے نے زکوٰۃ کی وصولی، انتظام اور تقسیم پر مامور کیا ہو۔'
  },
  {
    number: 4,
    arabic: 'الْمُؤَلَّفَةِ قُلُوبُهُمْ',
    nameEn: 'Al-Muallafatu Quloobuhum (Softening of Hearts)',
    nameUr: 'مؤلفۃ القلوب (جن کی دلجوئی مقصود ہو)',
    descEn: 'New Muslims or those whose hearts are to be drawn closer to Islam and supported in their faith.',
    descUr: 'نو مسلم یا وہ افراد جن کی تالیفِ قلب اور مدد مقصود ہو تاکہ ان کے ایمان کو تقویت ملے۔'
  },
  {
    number: 5,
    arabic: 'فِي الرِّقَابِ',
    nameEn: 'Fir-Riqaab (Freeing Captives)',
    nameUr: 'فی الرقاب (غلاموں یا قیدیوں کی رہائی)',
    descEn: 'Historically freeing slaves; in contemporary contexts, aiding wrongly imprisoned or bonded laborers.',
    descUr: 'غلاموں کی آزادی یا دورِ حاضر میں جبری مشقت اور ناحق قید میں پھنسے بے گناہ افراد کی قانونی رہائی۔'
  },
  {
    number: 6,
    arabic: 'الْغَارِمِينَ',
    nameEn: 'Al-Gharimeen (Debtors in Distress)',
    nameUr: 'غارمین (قرض دار)',
    descEn: 'Those burdened with legitimate debts they are genuinely unable to repay from their own means.',
    descUr: 'وہ مقروض افراد جن پر جائز قرضوں کا بوجھ ہو اور وہ اپنے وسائل سے اسے ادا کرنے کی طاقت نہ رکھتے ہوں۔'
  },
  {
    number: 7,
    arabic: 'فِي سَبِيلِ اللَّهِ',
    nameEn: 'Fi Sabilillah (In the Cause of Allah)',
    nameUr: 'فی سبیل اللہ (اللہ کی راہ میں)',
    descEn: 'Those striving in the path of Allah, including poor students of religious knowledge or defenders of the faith.',
    descUr: 'دین کی خدمت اور تعلیم میں مخلصانہ مصروف نادار طلبہ، مبلغین اور اللہ کے راستے میں جدوجہد کرنے والے۔'
  },
  {
    number: 8,
    arabic: 'ابْنِ السَّبِيلِ',
    nameEn: 'Ibn-us-Sabeel (Stranded Travelers)',
    nameUr: 'ابن السبیل (مسافر)',
    descEn: 'A traveler who has become stranded or cut off from their wealth during a lawful journey.',
    descUr: 'وہ مسافر جو سفر کے دوران مال و اسباب سے محروم ہو جائے اور اپنے وطن یا وسائل تک پہنچنے کا محتاج ہو۔'
  }
];

export const NON_RECIPIENTS = [
  {
    categoryEn: 'Direct Ascendants',
    categoryUr: 'اصول (والدین، دادا، دادی، نانا، نانی)',
    explanationEn: 'Parents, grandparents, and ancestors up the lineage cannot receive your Zakat because their financial maintenance is your moral obligation.',
    explanationUr: 'ماں، باپ، دادا، دادی، نانا، نانی وغیرہ کو زکوٰۃ دینا جائز نہیں کیونکہ ان کا نان و نفقہ آپ کے ذمے واجب ہے۔'
  },
  {
    categoryEn: 'Direct Descendants',
    categoryUr: 'فروع (بیٹا، بیٹی، پوتا، پوتی، نواسہ، نواسی)',
    explanationEn: 'Sons, daughters, grandchildren, and direct descendants cannot receive your Zakat.',
    explanationUr: 'اولاد، پوتے، پوتیاں، نواسے اور نواسیاں وغیرہ کو زکوٰۃ نہیں دی جا سکتی۔'
  },
  {
    categoryEn: 'Spouse (Husband / Wife)',
    categoryUr: 'شوہر اور بیوی',
    explanationEn: 'A husband cannot give Zakat to his wife (since providing for her is his legal duty), nor wife to husband according to majority scholars.',
    explanationUr: 'شوہر اپنی بیوی کو زکوٰۃ نہیں دے سکتا کیونکہ بیوی کا خرچ شوہر کے ذمے فرض ہے۔'
  },
  {
    categoryEn: 'The Wealthy (Sahib-e-Nisab)',
    categoryUr: 'صاحبِ نصاب اور غنی افراد',
    explanationEn: 'Anyone who already possesses wealth equal to or exceeding the Nisab threshold cannot be given Zakat.',
    explanationUr: 'وہ شخص جو خود صاحبِ نصاب ہو یعنی نصاب کے برابر مال یا زائد سامان کا مالک ہو۔'
  },
  {
    categoryEn: 'Descendants of the Prophet (Banu Hashim / Sayyids)',
    categoryUr: 'آلِ رسول اور بنو ہاشم (ساداتِ کرام)',
    explanationEn: 'Out of reverence and the explicit instruction of the Prophet Muhammad (ﷺ), Zakat is not permissible for Banu Hashim. They should be honored with voluntary gifts (Hadiyah).',
    explanationUr: 'حضور اکرم ﷺ کی واضح تعلیم کے مطابق ساداتِ کرام کو زکوٰۃ دینا جائز نہیں۔ ان کی خدمت تحفہ اور ہدیہ کے ذریعے کرنی چاہیے۔'
  }
];

export const ZAKAT_FAQS = [
  {
    qEn: 'What is Nisab, and how is it determined?',
    qUr: 'نصاب کیا ہے اور یہ کس طرح معلوم کیا جاتا ہے؟',
    aEn: 'Nisab is the minimum threshold of surplus wealth a Muslim must own for one full lunar year (Hawl) before Zakat becomes obligatory. In Islam, it is established as 87.48 grams of gold (7.5 Tola) or 612.36 grams of silver (52.5 Tola). If your wealth consists of mixed assets (cash, gold, silver, business inventory), classical jurists unanimously recommend the Silver Nisab to benefit the poor.',
    aUr: 'نصاب وہ کم از کم شرعی حد ہے جس پر ایک مکمل قمری سال گزرنے کے بعد زکوٰۃ فرض ہوتی ہے۔ سونا کا نصاب ساڑھے سات تولہ (87.48 گرام) اور چاندی کا نصاب ساڑھے باون تولہ (612.36 گرام) ہے۔ اگر مختلف اقسام کا مال (نقد رقم، سونا، چاندی، تجارتی مال) ہو تو فقہاء چاندی کے نصاب کے مطابق حساب لگانے کا حکم دیتے ہیں۔'
  },
  {
    qEn: 'What is the rate of Zakat payable on wealth?',
    qUr: 'زکوٰۃ کی شرح کتنی فیصد ہوتی ہے؟',
    aEn: 'The obligatory rate of Zakat on monetary wealth, gold, silver, and business inventory is 2.5% (or 1/40th of your net zakatable wealth) per lunar year. If calculating according to the Gregorian calendar (solar year), scholars recommend adjusting to 2.577% to account for the additional 11 days.',
    aUr: 'نقدی، سونا، چاندی اور مالِ تجارت پر سالانہ زکوٰۃ کی شرح اڑھائی فیصد (2.5% یعنی چالیسواں حصہ) ہے۔ یہ حساب قمری سال (اسلامی کیلنڈر) کے مطابق ہوتا ہے۔'
  },
  {
    qEn: 'Is Zakat due on personal property, cars, or homes?',
    qUr: 'کیا ذاتی رہائشی مکان، گھریلو سامان یا ذاتی گاڑی پر زکوٰۃ فرض ہے؟',
    aEn: 'No. The property in which you live, personal clothes, household furniture, and family transport vehicles are classified as "Hajat-e-Asliyyah" (essential basic necessities) and are completely exempt from Zakat, regardless of their market value. Zakat is only due on real estate purchased strictly with the intention of reselling for profit.',
    aUr: 'نہیں! ذاتی رہائشی مکان، گھریلو فرنیچر، ذاتی استعمال کی گاڑی یا موٹر سائیکل بنیادی ضروریات (حاجتِ اصلیہ) میں شامل ہیں اور ان پر کوئی زکوٰۃ فرض نہیں، چاہے ان کی قیمت کتنی ہی زیادہ کیوں نہ ہو۔ زکوٰۃ صرف اس پلاٹ یا جائیداد پر ہوتی ہے جو بیچنے اور منافع کمانے کی نیت سے خریدی گئی ہو۔'
  },
  {
    qEn: 'How is Zakat calculated on business stock and goods?',
    qUr: 'دکان اور کاروبار کے مالِ تجارت پر زکوٰۃ کا حساب کیسے لگایا جائے؟',
    aEn: 'Evaluate all finished goods, store inventory, and raw materials intended for sale at their current wholesale/market value on the day Zakat is calculated. Add cash in hand and customer debts owed to you. You do not pay Zakat on permanent business assets such as machines, computers, delivery vans, or shop shelves.',
    aUr: 'زکوٰۃ کے دن دکان یا گودام میں موجود تمام مالِ تجارت اور فروخت کے لیے تیار اشیاء کی مارکیٹ ویلیو کا حساب لگائیں۔ دکان کا فرنیچر، بلڈنگ، فیکٹری کی مشینیں اور سامان پہنچانے والی گاڑیاں زکوٰۃ سے مستثنیٰ ہیں۔'
  },
  {
    qEn: 'Can debts and unpaid bills be deducted before calculating Zakat?',
    qUr: 'کیا واجب الادا قرضے اور واجبات زکوٰۃ سے منہا کیے جا سکتے ہیں؟',
    aEn: 'Yes. Outstanding short-term loans, supplier payables, unpaid employee salaries, and imminent utility bills that are due can be deducted from your gross assets. The remaining net surplus is then compared to the Nisab threshold.',
    aUr: 'جی ہاں! فوری واجب الادا قرضے، دکانداروں یا سپلائرز کے واجبات، ملازمین کی تنخواہیں اور فوری بلز کل اثاثوں سے منہا کیے جا سکتے ہیں۔ باقی بچ جانے والی خالص رقم اگر نصاب تک پہنچے تو اس پر زکوٰۃ ادا کی جائے گی۔'
  }
];
