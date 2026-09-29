import React from 'react';
import { Language, CurrencyCode, ZakatAssets, ZakatLiabilities } from '../types';
import { ZAKAT_UI_TEXT } from '../data/translations';
import { CURRENCIES, NISAB_WEIGHTS } from '../data/zakatData';
import { 
  Wallet, 
  Sparkles, 
  Store, 
  TrendingUp, 
  Building2, 
  MinusCircle, 
  Info,
  BadgeAlert
} from 'lucide-react';

interface ZakatFormProps {
  lang: Language;
  currency: CurrencyCode;
  assets: ZakatAssets;
  setAssets: React.Dispatch<React.SetStateAction<ZakatAssets>>;
  liabilities: ZakatLiabilities;
  setLiabilities: React.Dispatch<React.SetStateAction<ZakatLiabilities>>;
  goldRate: number;
  silverRate: number;
}

export const ZakatForm: React.FC<ZakatFormProps> = ({
  lang,
  currency,
  assets,
  setAssets,
  liabilities,
  setLiabilities,
  goldRate,
  silverRate,
}) => {
  const t = ZAKAT_UI_TEXT[lang];
  const isRtl = lang === 'ur';
  const curr = CURRENCIES[currency];

  const updateAsset = (key: keyof ZakatAssets, val: number) => {
    setAssets((prev) => ({
      ...prev,
      [key]: isNaN(val) ? 0 : Math.max(0, val),
    }));
  };

  const updateLiability = (key: keyof ZakatLiabilities, val: number) => {
    setLiabilities((prev) => ({
      ...prev,
      [key]: isNaN(val) ? 0 : Math.max(0, val),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Cash, Bank Balances & Receivables */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionCash}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'ur'
                ? 'گھر میں نقد رقم، بینک میں جمع رقم اور وہ قرضے جو واپس ملنے ہوں'
                : 'Cash on hand, bank account balances, and dependable receivables'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.cashInHand}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.cashInHand || ''}
                placeholder="0"
                onChange={(e) => updateAsset('cashInHand', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.cashInBank}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.cashInBank || ''}
                placeholder="0"
                onChange={(e) => updateAsset('cashInBank', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.foreignCurrency}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.foreignCurrency || ''}
                placeholder="0"
                onChange={(e) => updateAsset('foreignCurrency', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.goodDebtsReceivable}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.goodDebtsReceivable || ''}
                placeholder="0"
                onChange={(e) => updateAsset('goodDebtsReceivable', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gold & Silver */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionMetals}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'ur'
                ? 'سونے یا چاندی کا وزن درج کریں یا براہِ راست مارکیٹ مالیت لکھیں'
                : 'Enter weight in grams or input the direct cash value of jewelry/coins'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Gold Section */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                {lang === 'ur' ? 'سونا (Gold)' : 'Gold Assets'}
              </span>
              <span className="text-[11px] text-amber-800 font-medium">
                {curr.symbol} {goldRate.toLocaleString()}/g
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                {lang === 'ur' ? 'سونے کا وزن (گرام میں):' : 'Weight in Grams:'}
              </label>
              <div className="flex items-center bg-white border border-amber-300 rounded-lg px-3 py-1.5">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={assets.goldGrams || ''}
                  placeholder="0.00"
                  onChange={(e) => updateAsset('goldGrams', Number(e.target.value))}
                  className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
                />
                <span className="text-[11px] text-stone-500 ml-1">grams</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 text-center font-medium">
              — {lang === 'ur' ? 'یا براہِ راست سونے کی کل قیمت لکھیں' : 'OR Enter Total Value Directly'} —
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                {lang === 'ur' ? 'سونے کی کل مارکیٹ مالیت:' : 'Total Gold Value:'}
              </label>
              <div className="flex items-center bg-white border border-amber-300 rounded-lg px-3 py-1.5">
                <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
                <input
                  type="number"
                  min={0}
                  value={assets.goldValueDirect || ''}
                  placeholder="0"
                  onChange={(e) => updateAsset('goldValueDirect', Number(e.target.value))}
                  className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Silver Section */}
          <div className="p-4 rounded-xl bg-stone-100/60 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                {lang === 'ur' ? 'چاندی (Silver)' : 'Silver Assets'}
              </span>
              <span className="text-[11px] text-stone-600 font-medium">
                {curr.symbol} {silverRate.toLocaleString()}/g
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                {lang === 'ur' ? 'چاندی کا وزن (گرام میں):' : 'Weight in Grams:'}
              </label>
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-3 py-1.5">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={assets.silverGrams || ''}
                  placeholder="0.00"
                  onChange={(e) => updateAsset('silverGrams', Number(e.target.value))}
                  className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
                />
                <span className="text-[11px] text-stone-500 ml-1">grams</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 text-center font-medium">
              — {lang === 'ur' ? 'یا براہِ راست چاندی کی کل قیمت لکھیں' : 'OR Enter Total Value Directly'} —
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                {lang === 'ur' ? 'چاندی کی کل مارکیٹ مالیت:' : 'Total Silver Value:'}
              </label>
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-3 py-1.5">
                <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
                <input
                  type="number"
                  min={0}
                  value={assets.silverValueDirect || ''}
                  placeholder="0"
                  onChange={(e) => updateAsset('silverValueDirect', Number(e.target.value))}
                  className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Business Stock & Merchandise */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionBusiness}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'ur'
                ? 'دکان، فیکٹری یا گودام میں موجود مالِ تجارت (مشینری اور فرنیچر زکوٰۃ سے مستثنیٰ ہیں)'
                : 'Commercial retail inventory and trade stock (equipment and furniture are exempt)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.businessInventory}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.businessInventory || ''}
                placeholder="0"
                onChange={(e) => updateAsset('businessInventory', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.tradeReceivables}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.tradeReceivables || ''}
                placeholder="0"
                onChange={(e) => updateAsset('tradeReceivables', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.rawMaterials}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.rawMaterials || ''}
                placeholder="0"
                onChange={(e) => updateAsset('rawMaterials', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Investments, Shares & Funds */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionInvestments}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'ur'
                ? 'اسٹاک مارکیٹ شیئرز، میوچل فنڈز، صکوک، اور پراویڈنٹ فنڈ'
                : 'Equities, mutual funds, Sukuk, crypto, and accessible provident funds'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sharesAndStocks}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.sharesAndStocks || ''}
                placeholder="0"
                onChange={(e) => updateAsset('sharesAndStocks', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.mutualFundsCrypto}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.mutualFundsCrypto || ''}
                placeholder="0"
                onChange={(e) => updateAsset('mutualFundsCrypto', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.prizeBonds}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.prizeBondsCertificates || ''}
                placeholder="0"
                onChange={(e) => updateAsset('prizeBondsCertificates', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.providentFund}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.accessibleProvidentFund || ''}
                placeholder="0"
                onChange={(e) => updateAsset('accessibleProvidentFund', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Real Estate for Resale */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionProperty}
            </h3>
            <span className="text-xs text-stone-500">
              {lang === 'ur'
                ? 'صرف وہ پلاٹ یا مکان جو فروخت کر کے نفع کمانے کے لیے خریدا گیا ہو (ذاتی رہائش مستثنیٰ ہے)'
                : 'Plots purchased strictly for trade/resale (personal home is 100% exempt)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.plotForResale}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.plotForResale || ''}
                placeholder="0"
                onChange={(e) => updateAsset('plotForResale', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.accruedRent}
            </label>
            <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={assets.accruedRentalSavings || ''}
                placeholder="0"
                onChange={(e) => updateAsset('accruedRentalSavings', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 bg-transparent focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Liabilities & Deductions (قرضے اور واجبات) */}
      <div className="bg-rose-50/40 rounded-2xl border border-rose-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-rose-200">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
            <MinusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold text-rose-950 ${isRtl ? 'font-urdu' : ''}`}>
              {t.sectionLiabilities}
            </h3>
            <span className="text-xs text-rose-800">
              {lang === 'ur'
                ? 'وہ تمام جائز قرضے اور واجبات جو فوراً ادا کرنے ہوں اور اثاثوں سے منہا ہوں گے'
                : 'Legitimate outstanding short-term debts and due expenses subtracted from your gross wealth'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.debtsDue}
            </label>
            <div className="flex items-center bg-white border border-rose-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-rose-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={liabilities.shortTermDebtsDue || ''}
                placeholder="0"
                onChange={(e) => updateLiability('shortTermDebtsDue', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.unpaidBills}
            </label>
            <div className="flex items-center bg-white border border-rose-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-rose-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={liabilities.unpaidBillsAndRent || ''}
                placeholder="0"
                onChange={(e) => updateLiability('unpaidBillsAndRent', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.supplierDebts}
            </label>
            <div className="flex items-center bg-white border border-rose-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-rose-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={liabilities.supplierPayables || ''}
                placeholder="0"
                onChange={(e) => updateLiability('supplierPayables', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold text-stone-700 mb-1.5 ${isRtl ? 'font-urdu' : ''}`}>
              {t.familyExpenses}
            </label>
            <div className="flex items-center bg-white border border-rose-300 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-rose-500 mr-2">{curr.symbol}</span>
              <input
                type="number"
                min={0}
                value={liabilities.immediateLivingExpenses || ''}
                placeholder="0"
                onChange={(e) => updateLiability('immediateLivingExpenses', Number(e.target.value))}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
