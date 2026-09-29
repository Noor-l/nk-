import React, { useState } from 'react';
import { Language, CurrencyCode, NisabStandard } from '../types';
import { ZAKAT_UI_TEXT } from '../data/translations';
import { CURRENCIES, NISAB_WEIGHTS } from '../data/zakatData';
import { Info, Sparkles, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';

interface NisabBarProps {
  lang: Language;
  currency: CurrencyCode;
  nisabStandard: NisabStandard;
  setNisabStandard: (n: NisabStandard) => void;
  goldRate: number;
  setGoldRate: (r: number) => void;
  silverRate: number;
  setSilverRate: (r: number) => void;
}

export const NisabBar: React.FC<NisabBarProps> = ({
  lang,
  currency,
  nisabStandard,
  setNisabStandard,
  goldRate,
  setGoldRate,
  silverRate,
  setSilverRate,
}) => {
  const t = ZAKAT_UI_TEXT[lang];
  const isRtl = lang === 'ur';
  const curr = CURRENCIES[currency];

  const [isEditingRates, setIsEditingRates] = useState(false);

  const silverNisabValue = Math.round(NISAB_WEIGHTS.silverGrams * silverRate);
  const goldNisabValue = Math.round(NISAB_WEIGHTS.goldGrams * goldRate);

  const activeNisabValue = nisabStandard === 'silver' ? silverNisabValue : goldNisabValue;

  const handleResetRates = () => {
    setGoldRate(curr.defaultGoldPerGram);
    setSilverRate(curr.defaultSilverPerGram);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 mb-8">
      {/* Top row: Title and Nisab selector buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Shariah Threshold (نصاب کی حد)
            </span>
          </div>
          <h2 className={`text-base sm:text-lg font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur' ? 'شرعی نصاب کا انتخاب اور موجودہ قیمتیں' : 'Active Nisab Threshold & Metal Rates'}
          </h2>
          <p className={`text-xs text-stone-500 mt-0.5 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur'
              ? 'اگر کل خالص مالیت اس رقم کے برابر یا زائد ہو، تو سالانہ 2.5% زکوٰۃ ادا کرنا فرض ہو جاتا ہے۔'
              : 'If your net wealth equals or exceeds this amount after one lunar year, Zakat (2.5%) becomes mandatory.'}
          </p>
        </div>

        {/* Standard Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Silver Standard Option (Scholarly Preferred) */}
          <button
            onClick={() => setNisabStandard('silver')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              nisabStandard === 'silver'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${nisabStandard === 'silver' ? 'bg-amber-300' : 'bg-stone-400'}`} />
            <span>
              {lang === 'ur' ? 'چاندی کا نصاب (مستحب و راجح)' : 'Silver Standard (Scholarly Preferred)'}
            </span>
          </button>

          {/* Gold Standard Option */}
          <button
            onClick={() => setNisabStandard('gold')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              nisabStandard === 'gold'
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${nisabStandard === 'gold' ? 'bg-white' : 'bg-stone-400'}`} />
            <span>
              {lang === 'ur' ? 'سونا کا نصاب' : 'Gold Standard'}
            </span>
          </button>

          {/* Rate Editor Toggle */}
          <button
            onClick={() => setIsEditingRates(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.editRates}</span>
          </button>
        </div>
      </div>

      {/* Visual Nisab Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {/* Silver Nisab Card */}
        <div
          onClick={() => setNisabStandard('silver')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            nisabStandard === 'silver'
              ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
              : 'bg-stone-50/70 border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
              {lang === 'ur' ? 'چاندی کا نصاب (52.5 تولہ)' : 'Silver Nisab (52.5 Tola)'}
            </span>
            {nisabStandard === 'silver' && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                Active Threshold
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {curr.symbol} {silverNisabValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            612.36g @ {curr.symbol} {silverRate.toLocaleString()}/g
          </div>
        </div>

        {/* Gold Nisab Card */}
        <div
          onClick={() => setNisabStandard('gold')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            nisabStandard === 'gold'
              ? 'bg-amber-50/70 border-amber-500 shadow-xs ring-2 ring-amber-500/20'
              : 'bg-stone-50/70 border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
              {lang === 'ur' ? 'سونا کا نصاب (7.5 تولہ)' : 'Gold Nisab (7.5 Tola)'}
            </span>
            {nisabStandard === 'gold' && (
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full">
                Active Threshold
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {curr.symbol} {goldNisabValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            87.48g @ {curr.symbol} {goldRate.toLocaleString()}/g
          </div>
        </div>

        {/* Informative Note */}
        <div className="p-4 rounded-xl bg-teal-950 text-emerald-100 flex flex-col justify-between sm:col-span-2 lg:col-span-1 border border-teal-900">
          <div>
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'فقہی رہنمائی' : 'Fiqh Ruling Note'}</span>
            </div>
            <p className={`text-[11px] text-emerald-200/90 leading-relaxed ${isRtl ? 'font-urdu' : ''}`}>
              {lang === 'ur'
                ? 'اگر کسی کے پاس صرف نقدی یا مختلف اموال (کیش + سونا + مالِ تجارت) ہوں تو جمہور فقہاء چاندی کے نصاب کو ترجیح دیتے ہیں تاکہ زیادہ غریبوں کا بھلا ہو۔'
                : 'Scholars unanimously advise that for mixed wealth (cash, business goods, savings), the Silver Nisab must be used to ensure the rightful welfare of the poor.'}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Metal Rates Drawer */}
      {isEditingRates && (
        <div className="mt-5 p-4 rounded-xl bg-stone-100 border border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              {lang === 'ur' ? 'سونے اور چاندی کی فی گرام قیمتیں ایڈٹ کریں' : 'Customize Precious Metal Rates per Gram'}
            </span>
            <button
              onClick={handleResetRates}
              className="text-xs text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'ڈیفالٹ مارکیٹ ریٹس پر لائیں' : 'Reset to Default Market'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {lang === 'ur' ? 'سونے کی قیمت (فی گرام):' : 'Gold Rate per Gram:'}
              </label>
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-3 py-1.5">
                <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs font-bold text-stone-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {lang === 'ur' ? 'چاندی کی قیمت (فی گرام):' : 'Silver Rate per Gram:'}
              </label>
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-3 py-1.5">
                <span className="text-xs font-bold text-stone-500 mr-2">{curr.symbol}</span>
                <input
                  type="number"
                  value={silverRate}
                  onChange={(e) => setSilverRate(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs font-bold text-stone-900 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
