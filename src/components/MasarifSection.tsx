import React from 'react';
import { Language } from '../types';
import { MASARIF_E_ZAKAT, NON_RECIPIENTS } from '../data/zakatData';
import { Users, AlertTriangle, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';

interface MasarifSectionProps {
  lang: Language;
}

export const MasarifSection: React.FC<MasarifSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ur';

  return (
    <div className="space-y-8 mb-12">
      {/* Quranic Verse Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
            Surah At-Tawbah (9:60)
          </span>
          <span className="text-xs text-emerald-200">
            فرمانِ باری تعالیٰ برائے مصارفِ زکوٰۃ
          </span>
        </div>

        {/* Big Arabic Ayah */}
        <p className="font-arabic text-right text-base sm:text-xl md:text-2xl leading-loose text-amber-100 my-3 font-semibold">
          إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ
        </p>

        <p className={`text-xs sm:text-sm text-emerald-100/90 leading-relaxed border-t border-emerald-800/60 pt-3 mt-3 ${isRtl ? 'font-urdu text-right' : ''}`}>
          {lang === 'ur'
            ? 'ترجمہ: "صدقات (زکوٰۃ) تو صرف محتاجوں، مسکینوں، اور اس کی وصولی پر مقرر کارکنوں کے لیے ہیں، اور ان کے لیے جن کے دلوں کو مائل کرنا ہو، اور گردنیں چھڑانے میں، اور قرض داروں کے لیے، اور اللہ کی راہ میں، اور مسافر کے لیے؛ یہ اللہ کی طرف سے مقرر کردہ فریضہ ہے، اور اللہ علم والا حکمت والا ہے۔"'
            : '"Zakah expenditures are only for the poor and for the needy and for those employed to collect it and for bringing hearts together for Islam and for freeing captives or slaves and for those in debt and for the cause of Allah and for the stranded traveler - an obligation imposed by Allah. And Allah is Knowing and Wise."'}
        </p>
      </div>

      {/* 8 Eligible Recipients Grid */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <div className={`max-w-3xl ${isRtl ? 'text-right' : 'text-left'} mb-6`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              The 8 Quranic Categories
            </span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur' ? 'زکوٰۃ کے 8 شرعی مصارف (حقدار کون ہیں؟)' : 'The 8 Legitimate Zakat Recipients (Masarif)'}
          </h2>
          <p className={`text-xs sm:text-sm text-stone-500 mt-1 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur'
              ? 'زکوٰۃ صرف انہی آٹھ قسم کے افراد کو دی جا سکتی ہے جن کی صراحت قرآنِ مجید میں فرمائی گئی ہے:'
              : 'Zakat can only be legitimately disbursed to these eight categories explicitly decreed by Allah:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MASARIF_E_ZAKAT.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    {item.number}
                  </span>
                  <span className="font-arabic text-sm text-emerald-900 font-bold">
                    {item.arabic}
                  </span>
                </div>
                <h3 className={`text-sm font-bold text-stone-900 mb-1 ${isRtl ? 'font-urdu' : ''}`}>
                  {lang === 'ur' ? item.nameUr : item.nameEn}
                </h3>
                <p className={`text-xs text-stone-600 leading-relaxed ${isRtl ? 'font-urdu' : ''}`}>
                  {lang === 'ur' ? item.descUr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Eligible Categories Warning Section */}
      <div className="bg-rose-50/40 rounded-2xl border border-rose-200 shadow-sm p-6 sm:p-8">
        <div className={`max-w-3xl ${isRtl ? 'text-right' : 'text-left'} mb-6`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">
              Fiqh Prohibition Warnings
            </span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold text-stone-900 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur' ? 'کن افراد کو زکوٰۃ دینا جائز نہیں ہے؟' : 'Who CANNOT Receive Your Zakat?'}
          </h2>
          <p className={`text-xs sm:text-sm text-rose-800 mt-1 ${isRtl ? 'font-urdu' : ''}`}>
            {lang === 'ur'
              ? 'اگر ان افراد کو زکوٰۃ دی گئی تو زکوٰۃ ادا نہیں ہوگی اور دوبارہ ادا کرنا لازم ہوگی:'
              : 'Giving Zakat to the following individuals is invalid in Islamic law and the obligation remains unpaid:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NON_RECIPIENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-rose-200 bg-white shadow-2xs space-y-1.5"
            >
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{lang === 'ur' ? item.categoryUr : item.categoryEn}</span>
              </div>
              <p className={`text-xs text-stone-700 leading-relaxed ${isRtl ? 'font-urdu' : ''}`}>
                {lang === 'ur' ? item.explanationUr : item.explanationEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
