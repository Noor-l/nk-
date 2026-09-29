import React, { useState, useMemo, useEffect } from 'react';
import { Language, CurrencyCode, NisabStandard, ZakatAssets, ZakatLiabilities, ZakatResult } from './types';
import { ZAKAT_UI_TEXT } from './data/translations';
import { CURRENCIES, NISAB_WEIGHTS } from './data/zakatData';
import { ZakatHeader } from './components/ZakatHeader';
import { NisabBar } from './components/NisabBar';
import { ZakatForm } from './components/ZakatForm';
import { ZakatSummaryCard } from './components/ZakatSummaryCard';
import { MasarifSection } from './components/MasarifSection';
import { ZakatFaqSection } from './components/ZakatFaqSection';
import { ZakatFooter } from './components/ZakatFooter';
import { Calculator, Scale, Users, HelpCircle } from 'lucide-react';

const INITIAL_ASSETS: ZakatAssets = {
  cashInHand: 75000,
  cashInBank: 250000,
  foreignCurrency: 0,
  goodDebtsReceivable: 40000,

  goldGrams: 0,
  goldValueDirect: 0,
  silverGrams: 0,
  silverValueDirect: 0,

  businessInventory: 0,
  tradeReceivables: 0,
  rawMaterials: 0,

  sharesAndStocks: 0,
  mutualFundsCrypto: 0,
  prizeBondsCertificates: 0,
  accessibleProvidentFund: 0,

  plotForResale: 0,
  accruedRentalSavings: 0,
};

const INITIAL_LIABILITIES: ZakatLiabilities = {
  shortTermDebtsDue: 35000,
  unpaidBillsAndRent: 20000,
  supplierPayables: 0,
  immediateLivingExpenses: 25000,
};

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [nisabStandard, setNisabStandard] = useState<NisabStandard>('silver');

  // Rates in selected currency
  const [goldRate, setGoldRate] = useState<number>(CURRENCIES.PKR.defaultGoldPerGram);
  const [silverRate, setSilverRate] = useState<number>(CURRENCIES.PKR.defaultSilverPerGram);

  // Update rates when currency changes
  useEffect(() => {
    const config = CURRENCIES[currency];
    setGoldRate(config.defaultGoldPerGram);
    setSilverRate(config.defaultSilverPerGram);
  }, [currency]);

  // Assets & Liabilities
  const [assets, setAssets] = useState<ZakatAssets>(INITIAL_ASSETS);
  const [liabilities, setLiabilities] = useState<ZakatLiabilities>(INITIAL_LIABILITIES);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'calculator' | 'nisab' | 'masarif' | 'faq'>('calculator');

  const t = ZAKAT_UI_TEXT[lang];
  const isRtl = lang === 'ur';

  // Core Zakat Calculation logic
  const calculationResult: ZakatResult = useMemo(() => {
    // 1. Calculate Gold Value
    const calculatedGoldVal = assets.goldValueDirect > 0
      ? assets.goldValueDirect
      : assets.goldGrams * goldRate;

    // 2. Calculate Silver Value
    const calculatedSilverVal = assets.silverValueDirect > 0
      ? assets.silverValueDirect
      : assets.silverGrams * silverRate;

    // 3. Sum of all Gross Zakatable Assets
    const totalGross =
      assets.cashInHand +
      assets.cashInBank +
      assets.foreignCurrency +
      assets.goodDebtsReceivable +
      calculatedGoldVal +
      calculatedSilverVal +
      assets.businessInventory +
      assets.tradeReceivables +
      assets.rawMaterials +
      assets.sharesAndStocks +
      assets.mutualFundsCrypto +
      assets.prizeBondsCertificates +
      assets.accessibleProvidentFund +
      assets.plotForResale +
      assets.accruedRentalSavings;

    // 4. Sum of all Deductible Liabilities
    const totalLiabs =
      liabilities.shortTermDebtsDue +
      liabilities.unpaidBillsAndRent +
      liabilities.supplierPayables +
      liabilities.immediateLivingExpenses;

    // 5. Net Zakatable Wealth
    const netWealth = Math.max(0, totalGross - totalLiabs);

    // 6. Active Nisab Threshold
    const silverNisab = Math.round(NISAB_WEIGHTS.silverGrams * silverRate);
    const goldNisab = Math.round(NISAB_WEIGHTS.goldGrams * goldRate);
    const threshold = nisabStandard === 'silver' ? silverNisab : goldNisab;

    // 7. Check if Net Wealth >= Nisab Threshold
    const isEligible = netWealth >= threshold;

    // 8. 2.5% (or 1/40th) of Net Zakatable Wealth
    const zakatDue = isEligible ? Math.round(netWealth * 0.025) : 0;

    return {
      totalAssets: Math.round(totalGross),
      totalLiabilities: Math.round(totalLiabs),
      netZakatableWealth: Math.round(netWealth),
      nisabThreshold: threshold,
      isEligibleToPay: isEligible,
      zakatDue,
    };
  }, [assets, liabilities, goldRate, silverRate, nisabStandard]);

  // Demo presets
  const handleLoadSalariedPreset = () => {
    const isPkr = currency === 'PKR';
    const mult = isPkr ? 1 : 0.0036;

    setAssets({
      cashInHand: Math.round(45000 * mult),
      cashInBank: Math.round(350000 * mult),
      foreignCurrency: 0,
      goodDebtsReceivable: Math.round(25000 * mult),
      goldGrams: 20, // 20g gold personal jewelry
      goldValueDirect: 0,
      silverGrams: 0,
      silverValueDirect: 0,
      businessInventory: 0,
      tradeReceivables: 0,
      rawMaterials: 0,
      sharesAndStocks: Math.round(100000 * mult),
      mutualFundsCrypto: 0,
      prizeBondsCertificates: Math.round(50000 * mult),
      accessibleProvidentFund: Math.round(120000 * mult),
      plotForResale: 0,
      accruedRentalSavings: 0,
    });

    setLiabilities({
      shortTermDebtsDue: Math.round(40000 * mult),
      unpaidBillsAndRent: Math.round(25000 * mult),
      supplierPayables: 0,
      immediateLivingExpenses: Math.round(35000 * mult),
    });
  };

  const handleLoadBusinessPreset = () => {
    const isPkr = currency === 'PKR';
    const mult = isPkr ? 1 : 0.0036;

    setAssets({
      cashInHand: Math.round(150000 * mult),
      cashInBank: Math.round(1200000 * mult),
      foreignCurrency: Math.round(80000 * mult),
      goodDebtsReceivable: Math.round(200000 * mult),
      goldGrams: 35,
      goldValueDirect: 0,
      silverGrams: 100,
      silverValueDirect: 0,
      businessInventory: Math.round(2500000 * mult),
      tradeReceivables: Math.round(650000 * mult),
      rawMaterials: Math.round(300000 * mult),
      sharesAndStocks: Math.round(400000 * mult),
      mutualFundsCrypto: 0,
      prizeBondsCertificates: 0,
      accessibleProvidentFund: 0,
      plotForResale: Math.round(1500000 * mult),
      accruedRentalSavings: Math.round(180000 * mult),
    });

    setLiabilities({
      shortTermDebtsDue: Math.round(350000 * mult),
      unpaidBillsAndRent: Math.round(90000 * mult),
      supplierPayables: Math.round(600000 * mult),
      immediateLivingExpenses: Math.round(75000 * mult),
    });
  };

  const handleReset = () => {
    setAssets({
      cashInHand: 0,
      cashInBank: 0,
      foreignCurrency: 0,
      goodDebtsReceivable: 0,
      goldGrams: 0,
      goldValueDirect: 0,
      silverGrams: 0,
      silverValueDirect: 0,
      businessInventory: 0,
      tradeReceivables: 0,
      rawMaterials: 0,
      sharesAndStocks: 0,
      mutualFundsCrypto: 0,
      prizeBondsCertificates: 0,
      accessibleProvidentFund: 0,
      plotForResale: 0,
      accruedRentalSavings: 0,
    });
    setLiabilities({
      shortTermDebtsDue: 0,
      unpaidBillsAndRent: 0,
      supplierPayables: 0,
      immediateLivingExpenses: 0,
    });
  };

  return (
    <div className={`min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans ${isRtl ? 'font-urdu' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <ZakatHeader
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        nisabStandard={nisabStandard}
        setNisabStandard={setNisabStandard}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-stone-200">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.tabCalculator}</span>
          </button>

          <button
            onClick={() => setActiveTab('nisab')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'nisab'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t.tabNisab}</span>
          </button>

          <button
            onClick={() => setActiveTab('masarif')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'masarif'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.tabMasarif}</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t.tabFaq}</span>
          </button>
        </div>

        {/* Tab 1: Calculator Main View */}
        {activeTab === 'calculator' && (
          <div>
            {/* Live Nisab Threshold Bar */}
            <NisabBar
              lang={lang}
              currency={currency}
              nisabStandard={nisabStandard}
              setNisabStandard={setNisabStandard}
              goldRate={goldRate}
              setGoldRate={setGoldRate}
              silverRate={silverRate}
              setSilverRate={setSilverRate}
            />

            {/* Split layout: Inputs on Left, Sticky Summary on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <ZakatForm
                  lang={lang}
                  currency={currency}
                  assets={assets}
                  setAssets={setAssets}
                  liabilities={liabilities}
                  setLiabilities={setLiabilities}
                  goldRate={goldRate}
                  silverRate={silverRate}
                />
              </div>

              <div className="lg:col-span-4">
                <ZakatSummaryCard
                  lang={lang}
                  currency={currency}
                  result={calculationResult}
                  onReset={handleReset}
                  onLoadSalariedPreset={handleLoadSalariedPreset}
                  onLoadBusinessPreset={handleLoadBusinessPreset}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Nisab Details */}
        {activeTab === 'nisab' && (
          <div className="space-y-6">
            <NisabBar
              lang={lang}
              currency={currency}
              nisabStandard={nisabStandard}
              setNisabStandard={setNisabStandard}
              goldRate={goldRate}
              setGoldRate={setGoldRate}
              silverRate={silverRate}
              setSilverRate={setSilverRate}
            />

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
              <h3 className={`text-lg font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
                {lang === 'ur' ? 'نصابِ زکوٰۃ کے شرعی اصول و موازنہ' : 'Shariah Fundamentals of Nisab Calculation'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-950 text-sm block">
                    {lang === 'ur' ? 'نصابِ سونا (Gold Nisab):' : 'Gold Nisab (87.48 Grams / 7.5 Tola)'}
                  </span>
                  <p className={isRtl ? 'font-urdu' : ''}>
                    {lang === 'ur'
                      ? 'سونے کا نصاب 20 دینار یعنی 7.5 تولہ (87.48 گرام) ہے۔ یہ نصاب صرف اس صورت میں لاگو ہوتا ہے جب کسی کے پاس صرف اور صرف سونا ہو، اور کوئی نقد رقم، چاندی، یا تجارتی مال نہ ہو۔'
                      : 'The gold benchmark is 20 classical Dinars, corresponding to 87.48 grams (7.5 Tola). Jurists agree that this threshold applies primarily when an individual exclusively holds gold without any other liquid cash, silver, or business stock.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-950 text-sm block">
                    {lang === 'ur' ? 'نصابِ چاندی (Silver Nisab):' : 'Silver Nisab (612.36 Grams / 52.5 Tola)'}
                  </span>
                  <p className={isRtl ? 'font-urdu' : ''}>
                    {lang === 'ur'
                      ? 'چاندی کا نصاب 200 درہم یعنی 52.5 تولہ (612.36 گرام) ہے۔ چونکہ آج کل چاندی کی قیمت کم ہے، اس لیے فقہائے کرام نے مستحقین اور فقراء کے فائدے (انفع للفقراء) کے پیش نظر نقد رقم اور ملے جلے مال پر چاندی کے نصاب کو ہی معیار قرار دیا ہے۔'
                      : 'The silver threshold is 200 Dirhams, or 612.36 grams (52.5 Tola). Because the modern monetary value of silver is lower than gold, classical and contemporary scholars universally prioritize the Silver Nisab for mixed wealth so that maximum assistance reaches the destitute.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Masarif (Eligible & Non-Eligible Recipients) */}
        {activeTab === 'masarif' && (
          <MasarifSection lang={lang} />
        )}

        {/* Tab 4: Fiqh FAQs */}
        {activeTab === 'faq' && (
          <ZakatFaqSection lang={lang} />
        )}
      </main>

      {/* Footer */}
      <ZakatFooter lang={lang} />
    </div>
  );
}
