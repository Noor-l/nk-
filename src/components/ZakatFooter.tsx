import React from 'react';
import { Language } from '../types';
import { Scale, ArrowUp, Heart } from 'lucide-react';

interface ZakatFooterProps {
  lang: Language;
}

export const ZakatFooter: React.FC<ZakatFooterProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-white text-stone-600 text-xs py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="font-bold text-stone-900 text-sm">
              {lang === 'ur'
                ? 'جامع شرعی زکوٰۃ کیلکولیٹر اور رہنمائی پورٹل'
                : 'Islamic Zakat Calculator & Assessment Portal'}
            </span>
          </div>
          <p className={`text-stone-500 max-w-xl text-xs leading-relaxed ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur'
              ? 'زکوٰۃ اسلام کے بنیادی ارکان میں سے ایک ہے۔ یہ کیلکولیٹر نصابِ چاندی (52.5 تولہ) اور نصابِ سونا (7.5 تولہ) کی روشنی میں اثاثوں کی تطہیر کے لیے تیار کیا گیا ہے۔'
              : 'Zakat is the third pillar of Islam, purifying personal wealth and empowering the needy. Always consult qualified local scholars for complex inheritance, trusts, or business partnerships.'}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
