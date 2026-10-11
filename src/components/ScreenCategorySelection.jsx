import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  ShieldCheck, 
  UtensilsCrossed, 
  Sparkles, 
  Wrench, 
  HandMetal, 
  Zap, 
  Paintbrush, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Globe,
  TrendingUp
} from 'lucide-react';
import { CATEGORIES, TRANSLATIONS } from '../data/categories';

// Map icon strings to actual Lucide components
const iconMap = {
  Sparkles: Sparkles,
  Car: Car,
  ShieldCheck: ShieldCheck,
  UtensilsCrossed: UtensilsCrossed,
  HandMetal: HandMetal,
  Wrench: Wrench,
  Zap: Zap,
  Paintbrush: Paintbrush,
};

export default function ScreenCategorySelection({ onNext, onBack, lang, setLang, workerData, setWorkerData }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedCategory, setSelectedCategory] = useState(workerData.category || null);
  const [experienceLevel, setExperienceLevel] = useState(workerData.experience || '1-3 years');

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
  };

  const handleContinue = () => {
    if (!selectedCategory) return;
    setWorkerData(prev => ({
      ...prev,
      category: selectedCategory,
      experience: experienceLevel,
    }));
    onNext();
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      {/* Top Bar / Header */}
      <header className="bg-white border-b-2 border-black px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-sharp-sm"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-800" />
            </button>
            <div>
              <span className="text-xs font-black text-[#0B3C5D] uppercase tracking-wider block">
                Demand O Partner
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                Step 2 of 3 • Trade Selection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 border border-[#0B3C5D]/30 px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B3C5D]" />
              <span className="text-xs font-black text-[#0B3C5D] tracking-wide">6 High-Demand Trades Available</span>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(prev => (prev === 'en' ? 'hi' : 'en'))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-black/20 text-xs font-bold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#0B3C5D]" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container - Full Screen on Laptop, Mobile Responsive */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-32">
        {/* Header Section */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B3C5D] bg-blue-100/70 px-3 py-1 rounded-full mb-3">
            <span>Primary Work Profile</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.categoryHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium leading-relaxed">
            {t.categorySubheading}
          </p>
        </div>

        {/* Responsive Grid: 2-Cols on Mobile, 3-Cols on Tablet, 4-Cols on Laptop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory?.id === cat.id;
            const IconComponent = iconMap[cat.iconName] || Sparkles;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(cat)}
                type="button"
                className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 transition-all duration-150 text-left cursor-pointer min-h-[170px] sm:min-h-[190px] ${
                  isSelected
                    ? 'bg-[#0B3C5D] text-white border-black shadow-sharp ring-2 ring-[#0B3C5D]/30'
                    : 'bg-white text-slate-900 border-black hover:bg-slate-50 shadow-sharp-sm'
                }`}
              >
                {/* Top Badges */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      isSelected
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {cat.badge}
                  </span>

                  {/* Active Selection Badge */}
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Massive Icon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-2 transition-colors my-2 ${
                    isSelected
                      ? 'bg-white/15 border-white/40 text-amber-300'
                      : 'bg-blue-50/70 border-black/20 text-[#0B3C5D]'
                  }`}
                >
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
                </div>

                {/* Card Titles (Bilingual & Bold) */}
                <div>
                  <p
                    className={`font-black text-base sm:text-lg tracking-tight leading-tight ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {cat.title}
                  </p>
                  <p
                    className={`text-xs font-bold mt-0.5 ${
                      isSelected ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    {cat.hindiTitle}
                  </p>
                  <p
                    className={`text-[11px] mt-1 font-medium line-clamp-1 ${
                      isSelected ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {cat.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Summary Pill */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Selected Work Profile / चयनित पेशा
                </p>
                <p className="text-lg font-black text-emerald-900">
                  {selectedCategory.title} ({selectedCategory.hindiTitle})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-extrabold bg-emerald-200 text-emerald-900 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> High Customer Demand
              </span>
              <button
                onClick={handleContinue}
                className="hidden sm:flex px-6 py-3 rounded-xl bg-[#0B3C5D] hover:bg-[#07263b] text-white font-black text-sm border-2 border-black items-center gap-2 shadow-sharp transition-all"
              >
                <span>{t.continue}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Sticky Bottom Action Bar on Mobile / Docked on Laptop */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            {selectedCategory ? (
              <p className="text-xs font-bold text-slate-700">
                You selected: <span className="font-black text-[#0B3C5D]">{selectedCategory.title} ({selectedCategory.hindiTitle})</span>
              </p>
            ) : (
              <p className="text-xs font-semibold text-slate-400">
                Please tap a work category to proceed to KYC verification.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCategory}
            className={`w-full sm:w-auto sm:min-w-[280px] min-h-[56px] py-4 px-8 rounded-2xl border-2 border-black font-extrabold text-base flex items-center justify-center gap-2 shadow-sharp transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              selectedCategory
                ? 'bg-[#0B3C5D] text-white hover:bg-[#07263b] cursor-pointer'
                : 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{t.continue}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
