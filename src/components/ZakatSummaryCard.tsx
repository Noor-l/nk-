import React, { useState } from 'react';
import { Language, CurrencyCode, ZakatResult } from '../types';
import { ZAKAT_UI_TEXT } from '../data/translations';
import { CURRENCIES } from '../data/zakatData';
import { 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw, 
  Scale, 
  ArrowDown, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ZakatSummaryCardProps {
  lang: Language;
  currency: CurrencyCode;
  result: ZakatResult;
  onReset: () => void;
  onLoadSalariedPreset: () => void;
  onLoadBusinessPreset: () => void;
}

export const ZakatSummaryCard: React.FC<ZakatSummaryCardProps> = ({
  lang,
  currency,
  result,
  onReset,
  onLoadSalariedPreset,
  onLoadBusinessPreset,
}) => {
  const t = ZAKAT_UI_TEXT[lang];
  const isRtl = lang === 'ur';
  const curr = CURRENCIES[currency];

  const [copied, setCopied] = useState(false);

  const handleCopySlip = () => {
    const slip = `====================================
ISLAMIC ZAKAT ASSESSMENT SLIP
====================================
Currency: ${curr.code} (${curr.symbol})
Date: ${new Date().toLocaleDateString()}

1. Total Gross Assets:       ${curr.symbol} ${result.totalAssets.toLocaleString()}
2. Deductible Liabilities:   ${curr.symbol} ${result.totalLiabilities.toLocaleString()}
------------------------------------
Net Zakatable Wealth:        ${curr.symbol} ${result.netZakatableWealth.toLocaleString()}
Active Nisab Threshold:      ${curr.symbol} ${result.nisabThreshold.toLocaleString()}

Status: ${result.isEligibleToPay ? 'ZAKAT IS FARD (OBLIGATORY)' : 'BELOW NISAB (EXEMPT)'}
Rate: 2.5% (1/40th)
------------------------------------
TOTAL ZAKAT PAYABLE:         ${curr.symbol} ${result.zakatDue.toLocaleString()}
====================================
"And establish prayer and give zakah and obey the Messenger that you may receive mercy." (Surah An-Nur 24:56)`;

    navigator.clipboard.writeText(slip);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sticky top-20 space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Shariah Calculation Verdict
          </span>
          <h3 className={`text-lg font-bold text-stone-900 mt-1 ${isRtl ? 'font-urdu' : ''}`}>
            {t.resultsTitle}
          </h3>
        </div>
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Scale className="w-5 h-5" />
        </div>
      </div>

      {/* Main Calculated Zakat Amount Box */}
      <div className={`rounded-2xl p-5 text-center relative overflow-hidden ${
        result.isEligibleToPay
          ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white shadow-lg'
          : 'bg-stone-100 text-stone-800 border border-stone-200'
      }`}>
        <span className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${
          result.isEligibleToPay ? 'text-emerald-200' : 'text-stone-500'
        }`}>
          {t.totalZakatPayable}
        </span>

        <div className="text-3xl sm:text-4xl font-black tracking-tight my-2">
          {curr.symbol} {result.zakatDue.toLocaleString()}
        </div>

        <span className={`text-[11px] block mt-1 ${
          result.isEligibleToPay ? 'text-amber-300 font-bold' : 'text-stone-500'
        }`}>
          {t.zakatRateNote}
        </span>

        {/* Status Badge */}
        <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          result.isEligibleToPay
            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
            : 'bg-stone-200 text-stone-700'
        }`}>
          {result.isEligibleToPay ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.statusObligatory}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.statusExempt}</span>
            </>
          )}
        </div>
      </div>

      {/* Financial Breakdown Table */}
      <div className="space-y-2.5 text-xs border-b border-stone-100 pb-4">
        <div className="flex justify-between items-center text-stone-600">
          <span>{t.grossAssets}</span>
          <span className="font-bold text-stone-900">
            {curr.symbol} {result.totalAssets.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center text-rose-600">
          <span>{t.totalDebts}</span>
          <span className="font-bold">
            - {curr.symbol} {result.totalLiabilities.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
          <span>{t.netWealth}</span>
          <span className="text-emerald-800">
            {curr.symbol} {result.netZakatableWealth.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center text-[11px] text-stone-500 pt-1">
          <span>{t.activeNisab}</span>
          <span className="font-semibold text-stone-700">
            {curr.symbol} {result.nisabThreshold.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Quick Profile Presets */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
          {lang === 'ur' ? 'تجرباتی پروفائلز (Demo Presets):' : 'Try Demo Profiles:'}
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onLoadSalariedPreset}
            className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            {lang === 'ur' ? 'تنخواہ دار فرد' : 'Salaried Profile'}
          </button>
          <button
            onClick={onLoadBusinessPreset}
            className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            {lang === 'ur' ? 'تاجر و کاروباری' : 'Merchant Profile'}
          </button>
        </div>
      </div>

      {/* Actions: Copy Slip, Print, Reset */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleCopySlip}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>{t.copiedMsg}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{t.copySlip}</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printSlip}</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-rose-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
