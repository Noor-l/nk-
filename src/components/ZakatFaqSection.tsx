import React, { useState } from 'react';
import { Language } from '../types';
import { ZAKAT_FAQS } from '../data/zakatData';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle } from 'lucide-react';

interface ZakatFaqSectionProps {
  lang: Language;
}

export const ZakatFaqSection: React.FC<ZakatFaqSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ur';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-12">
      <div className={`max-w-3xl ${isRtl ? 'text-right' : 'text-left'} mb-6`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Fiqh Knowledge Base
          </span>
        </div>
        <h2 className={`text-xl sm:text-2xl font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
          {lang === 'ur' ? 'زکوٰۃ سے متعلق ضروری فقہی احکام و مسائل' : 'Frequently Asked Questions on Zakat & Nisab'}
        </h2>
        <p className={`text-xs sm:text-sm text-stone-500 mt-1 ${isRtl ? 'font-urdu' : ''}`}>
          {lang === 'ur'
            ? 'نصاب، زیورات، ذاتی جائیداد اور قرضوں کی کٹوتی کے بارے میں معتبر علماء کے فتاویٰ کا خلاصہ:'
            : 'Authoritative explanations on Hawl (lunar year), jewelry exemptions, and business assets according to classical Islamic jurisprudence.'}
        </p>
      </div>

      <div className="space-y-3">
        {ZAKAT_FAQS.map((faq, index) => {
          const q = lang === 'ur' ? faq.qUr : faq.qEn;
          const a = lang === 'ur' ? faq.aUr : faq.aEn;
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/50 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className={`w-full p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/60 transition-colors ${
                  isRtl ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    Q{index + 1}
                  </span>
                  <span className={`text-sm sm:text-base font-bold text-stone-900 ${isRtl ? 'font-urdu leading-relaxed' : ''}`}>
                    {q}
                  </span>
                </div>
                <span className="text-stone-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div
                  className={`p-4.5 pt-1 text-xs sm:text-sm text-stone-600 bg-white border-t border-stone-100 leading-relaxed ${
                    isRtl ? 'font-urdu text-right' : ''
                  }`}
                >
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
