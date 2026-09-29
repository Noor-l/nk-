import React from 'react';
import { Language, CurrencyCode, NisabStandard } from '../types';
import { ZAKAT_UI_TEXT } from '../data/translations';
import { CURRENCIES } from '../data/zakatData';
import { Coins, Globe2, Moon, Scale } from 'lucide-react';

interface ZakatHeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  nisabStandard: NisabStandard;
  setNisabStandard: (n: NisabStandard) => void;
}

export const ZakatHeader: React.FC<ZakatHeaderProps> = ({
  lang,
  setLang,
  currency,
  setCurrency,
  nisabStandard,
  setNisabStandard,
}) => {
  const t = ZAKAT_UI_TEXT[lang];
  const isRtl = lang === 'ur';

  return (
    <header className="border-b border-emerald-950/10 bg-white/95 backdrop-blur sticky top-0 z-40 shadow-xs">
      {/* Quranic Verse Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-emerald-100 py-2 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-arabic text-xs sm:text-sm text-amber-200">
              خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا (التوبة: 103)
            </span>
          </div>
          <span className="text-[11px] text-emerald-200/90 hidden md:inline">
            &quot;Take from their wealth a charity by which you purify them and cause them increase&quot;
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title & Icon */}
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-900/10 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-lg sm:text-xl font-black text-stone-900 tracking-tight ${isRtl ? 'font-urdu leading-normal' : ''}`}>
                {t.portalTitle}
              </h1>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60 px-2 py-0.5 rounded-full">
                2.5% Shariah
              </span>
            </div>
            <p className={`text-xs text-stone-500 line-clamp-1 ${isRtl ? 'font-urdu' : ''}`}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Global Controls: Currency & Language Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Currency Dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-xl border border-stone-200 text-xs">
            <Coins className="w-3.5 h-3.5 text-emerald-700" />
            <label htmlFor="currency-select" className="sr-only">Currency</label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent font-bold text-stone-800 focus:outline-hidden cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c}>
                  {CURRENCIES[c as CurrencyCode].code} ({CURRENCIES[c as CurrencyCode].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex rounded-xl border border-stone-200 bg-stone-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang('ur')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-urdu ${
                lang === 'ur'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200 font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
