import React, { useState } from 'react';
import { Volume2, Sparkles, Plus, Equal, ArrowRight, Lightbulb, Play } from 'lucide-react';
import { COLORS_DATA, COLOR_FORMULAS } from '../data/colorsData';
import { ColorItem } from '../types';
import { soundFX } from '../utils/audio';

interface ColorLearnCardsProps {
  onStartLab: () => void;
  onStartDuel: () => void;
}

export const ColorLearnCards: React.FC<ColorLearnCardsProps> = ({ onStartLab, onStartDuel }) => {
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLORS_DATA[0]);
  const primaryColors = COLORS_DATA.filter((c) => c.type === 'primary');
  const secondaryColors = COLORS_DATA.filter((c) => c.type === 'secondary');

  const handleSelectColor = (color: ColorItem) => {
    setSelectedColor(color);
    soundFX.playPop();
    soundFX.speak(`${color.name}. ${color.typeLabel}. ${color.description}`);
  };

  const handleSymbolClick = (symbol: { name: string; fact: string; emoji: string }) => {
    soundFX.playSparkle();
    soundFX.speak(`${symbol.name}. ${symbol.fact}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      
      {/* Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>İlkokul Görsel Sanatlar & Renk Bilgisi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ana ve Ara Renklerin Büyülü Dünyasına Hoş Geldin!
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Doğada kendi başına var olan <strong>3 Ana Renk</strong> (Kırmızı, Sarı, Mavi) ve onların sihirli birleşimiyle oluşan <strong>3 Ara Renk</strong> (Yeşil, Turuncu, Mor) ile eğlenerek öğrenmeye hazır mısın?
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="btn-intro-lab"
              onClick={() => {
                soundFX.playPop();
                onStartLab();
              }}
              className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>🧪 Sihirli Laboratuvarı Aç</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </button>
            <button
              id="btn-intro-duel"
              onClick={() => {
                soundFX.playPop();
                onStartDuel();
              }}
              className="px-5 py-2.5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 text-white font-extrabold text-sm backdrop-blur-md border border-white/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>👥 İkili Grup Oyununa Başla</span>
            </button>
          </div>
        </div>

        {/* Decorative background badges */}
        <div className="absolute -right-6 -bottom-10 opacity-20 text-[180px] pointer-events-none select-none">
          🎨
        </div>
      </div>

      {/* 1. SECTION: ANA RENKLER (PRIMARY COLORS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-8 bg-rose-500 rounded-full" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                1. Ana Renkler (Temel Renkler)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Doğada saf halde bulunan, hiçbir rengin karışımıyla elde edilemeyen 3 ana renk!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryColors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <div
                key={color.id}
                id={`card-primary-${color.id}`}
                onClick={() => handleSelectColor(color)}
                className={`relative group p-5 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'bg-white shadow-xl scale-102 border-slate-900 ring-4 ring-slate-900/10'
                    : 'bg-white/80 hover:bg-white shadow-xs hover:shadow-md border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    {color.typeLabel}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.speak(`${color.name}. Bu bir ana renktir.`);
                    }}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Sesli Dinle"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Big Color Orb */}
                <div className="flex items-center gap-4 my-3">
                  <div
                    className="w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center text-2xl border-2 border-white/50 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  >
                    <Sparkles className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800">{color.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{color.englishName}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                  {color.description}
                </p>

                {/* Symbols Grid */}
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Eğlenceli Semboller (Tıkla & Dinle):
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {color.symbols.map((sym, idx) => (
                      <button
                        key={idx}
                        id={`btn-symbol-${color.id}-${idx}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSymbolClick(sym);
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-100 text-left transition-colors group/sym"
                      >
                        <span className="text-lg group-hover/sym:scale-125 transition-transform">{sym.emoji}</span>
                        <span className="text-xs font-bold text-slate-700 truncate">{sym.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. SECTION: ARA RENK FORMÜLLERİ (SECONDARY COLOR FORMULAS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-8 bg-emerald-500 rounded-full" />
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              2. Ara Renkler & Sihirli Karışım Formülleri
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              İki ana rengi eşit miktarda karıştırdığımızda yeni bir ara renk elde ederiz!
            </p>
          </div>
        </div>

        {/* Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLOR_FORMULAS.map((formula) => (
            <div
              key={formula.id}
              id={`formula-card-${formula.id}`}
              className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Formula Equation Row */}
              <div className="flex items-center justify-between gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                {/* Color 1 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-xl shadow-xs border border-white flex items-center justify-center font-bold text-white text-xs"
                    style={{ backgroundColor: formula.color1Hex }}
                  />
                  <span className="text-xs font-bold text-slate-700 mt-1">{formula.color1}</span>
                </div>

                <Plus className="w-4 h-4 text-slate-400 font-bold" />

                {/* Color 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-xl shadow-xs border border-white flex items-center justify-center font-bold text-white text-xs"
                    style={{ backgroundColor: formula.color2Hex }}
                  />
                  <span className="text-xs font-bold text-slate-700 mt-1">{formula.color2}</span>
                </div>

                <Equal className="w-4 h-4 text-slate-400 font-bold" />

                {/* Result Color */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-11 h-11 rounded-xl shadow-sm border-2 border-white flex items-center justify-center text-lg animate-pulse"
                    style={{ backgroundColor: formula.resultHex }}
                  >
                    {formula.emoji}
                  </div>
                  <span className="text-xs font-black text-slate-900 mt-1">{formula.result}</span>
                </div>
              </div>

              {/* Mnemonic / Memory Tip */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-900">
                  {formula.mnemonic}
                </p>
              </div>

              {/* Sound Action */}
              <button
                onClick={() => {
                  soundFX.playSuccessChime();
                  soundFX.speak(`${formula.color1} ve ${formula.color2} birleşince ${formula.result} oluşur!`);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Formülü Sesli Dinle</span>
              </button>
            </div>
          ))}
        </div>

        {/* Secondary Colors Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {secondaryColors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <div
                key={color.id}
                id={`card-secondary-${color.id}`}
                onClick={() => handleSelectColor(color)}
                className={`relative group p-5 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'bg-white shadow-xl scale-102 border-slate-900 ring-4 ring-slate-900/10'
                    : 'bg-white/80 hover:bg-white shadow-xs hover:shadow-md border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {color.typeLabel}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.speak(`${color.name}. Bu bir ara renktir. ${color.formula?.color1} ile ${color.formula?.color2} karışımıdır.`);
                    }}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Sesli Dinle"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 my-3">
                  <div
                    className="w-16 h-16 rounded-2xl shadow-inner flex items-center justify-center text-2xl border-2 border-white/50 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  >
                    <Sparkles className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800">{color.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{color.englishName}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                  {color.description}
                </p>

                {/* Symbols Grid */}
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Eğlenceli Semboller (Tıkla & Dinle):
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {color.symbols.map((sym, idx) => (
                      <button
                        key={idx}
                        id={`btn-secondary-sym-${color.id}-${idx}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSymbolClick(sym);
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-100 text-left transition-colors group/sym"
                      >
                        <span className="text-lg group-hover/sym:scale-125 transition-transform">{sym.emoji}</span>
                        <span className="text-xs font-bold text-slate-700 truncate">{sym.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pedagogical Summary Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Öğretmen & Öğrenci Notu</span>
          <h4 className="text-lg sm:text-xl font-black">Renkleri Karıştırarak Test Etmeye Hazır mısın?</h4>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Sihirli Laboratuvarda tüpleri kazana damlatabilir veya arkadaşınla İkili Grup Oyununda yarışıp yıldız ve kupalar kazanabilirsin!
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundFX.playPop();
              onStartLab();
            }}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Laboratuvara Git</span>
          </button>
        </div>
      </div>

    </div>
  );
};
