import React, { useState } from 'react';
import { Sparkles, RotateCcw, Volume2, CheckCircle2, Award, Zap, Beaker } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface ColorLabProps {
  onEarnStars: (amount: number) => void;
}

interface Drop {
  id: number;
  color: 'kirmizi' | 'sari' | 'mavi';
  name: string;
  hex: string;
}

export const ColorLab: React.FC<ColorLabProps> = ({ onEarnStars }) => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [targetQuest, setTargetQuest] = useState<{
    id: string;
    name: string;
    hex: string;
    formula: string;
    needed: ['kirmizi' | 'sari' | 'mavi', 'kirmizi' | 'sari' | 'mavi'];
    rewardClaimed: boolean;
  }>({
    id: 'yesil',
    name: 'Yeşil İksir',
    hex: '#22C55E',
    formula: 'Sarı + Mavi',
    needed: ['sari', 'mavi'],
    rewardClaimed: false,
  });

  const availableColors = [
    { id: 'kirmizi', name: 'Kırmızı', hex: '#EF4444', emoji: '🍎', border: 'border-red-400', bg: 'bg-red-500', shadow: 'shadow-red-500/30' },
    { id: 'sari', name: 'Sarı', hex: '#FACC15', emoji: '☀️', border: 'border-yellow-400', bg: 'bg-yellow-400', shadow: 'shadow-yellow-500/30' },
    { id: 'mavi', name: 'Mavi', hex: '#3B82F6', emoji: '💧', border: 'border-blue-400', bg: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
  ] as const;

  const targetRecipes = [
    { id: 'yesil', name: 'Yeşil İksir 🍃', hex: '#22C55E', formula: 'Sarı + Mavi', needed: ['sari', 'mavi'] as ['sari', 'mavi'] },
    { id: 'turuncu', name: 'Turuncu İksir 🍊', hex: '#F97316', formula: 'Kırmızı + Sarı', needed: ['kirmizi', 'sari'] as ['kirmizi', 'sari'] },
    { id: 'mor', name: 'Mor İksir 🍇', hex: '#A855F7', formula: 'Kırmızı + Mavi', needed: ['kirmizi', 'mavi'] as ['kirmizi', 'mavi'] },
  ];

  // Calculate current mixture result
  const colorCounts = {
    kirmizi: drops.filter((d) => d.color === 'kirmizi').length,
    sari: drops.filter((d) => d.color === 'sari').length,
    mavi: drops.filter((d) => d.color === 'mavi').length,
  };

  let mixedColorHex = '#E2E8F0'; // Empty slate
  let mixedName = 'Boş Deney Kabı';
  let isSecondary = false;
  let explanation = 'Henüz renk damlatılmadı. Aşağıdaki ana renk tüplerinden iki renk seçip kaba damlat!';

  const activeColors = Object.entries(colorCounts).filter(([_, count]) => count > 0);

  if (activeColors.length === 1) {
    const [color] = activeColors[0];
    if (color === 'kirmizi') {
      mixedColorHex = '#EF4444';
      mixedName = 'Saf Kırmızı (Ana Renk)';
      explanation = 'Kapta sadece kırmızı ana renk var. Yanına sarı veya mavi damlatarak ara renk elde etmeyi dene!';
    } else if (color === 'sari') {
      mixedColorHex = '#FACC15';
      mixedName = 'Saf Sarı (Ana Renk)';
      explanation = 'Kapta sadece sarı ana renk var. Mavi eklersen Yeşil, kırmızı eklersen Turuncu olur!';
    } else if (color === 'mavi') {
      mixedColorHex = '#3B82F6';
      mixedName = 'Saf Mavi (Ana Renk)';
      explanation = 'Kapta sadece mavi ana renk var. Sarı eklersen Yeşil, kırmızı eklersen Mor olur!';
    }
  } else if (activeColors.length === 2) {
    const hasRed = colorCounts.kirmizi > 0;
    const hasYellow = colorCounts.sari > 0;
    const hasBlue = colorCounts.mavi > 0;

    if (hasYellow && hasBlue) {
      mixedColorHex = '#22C55E';
      mixedName = 'Harika! YEŞİL (Ara Renk) 🍃';
      isSecondary = true;
      explanation = 'Sarı (Güneş) + Mavi (Su) = Yeşil (Doğa)! İki ana rengin birleşimiyle muhteşem bir ara renk oluşturdun!';
    } else if (hasRed && hasYellow) {
      mixedColorHex = '#F97316';
      mixedName = 'Muazzam! TURUNCU (Ara Renk) 🍊';
      isSecondary = true;
      explanation = 'Kırmızı (Ateş) + Sarı (Güneş) = Turuncu (Portakal)! Sıcak ana renkler birleşti ve Turuncu ara rengi doğdu!';
    } else if (hasRed && hasBlue) {
      mixedColorHex = '#A855F7';
      mixedName = 'Sihirli! MOR (Ara Renk) 🍇';
      isSecondary = true;
      explanation = 'Kırmızı (Kalp) + Mavi (Deniz) = Mor (Üzüm & Menekşe)! Asil ve büyüleyici bir ara renk yarattın!';
    }
  } else if (activeColors.length === 3) {
    mixedColorHex = '#78350F';
    mixedName = 'Kahverengi Karmaşası 🍂';
    explanation = 'Üç ana rengi birden karıştırdın! Tüm ana renkler birleştiğinde toprak ve kahverengi tonları oluşur.';
  }

  // Check target mission completion
  const checkTargetCompletion = () => {
    if (targetQuest.rewardClaimed) return;
    const hasNeeded1 = colorCounts[targetQuest.needed[0]] > 0;
    const hasNeeded2 = colorCounts[targetQuest.needed[1]] > 0;
    const hasOnlyTwo = activeColors.length === 2;

    if (hasNeeded1 && hasNeeded2 && hasOnlyTwo) {
      soundFX.playTrophyFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [targetQuest.hex, '#FACC15', '#38BDF8', '#F43F5E'],
      });
      onEarnStars(3);
      setTargetQuest((prev) => ({ ...prev, rewardClaimed: true }));
      soundFX.speak(`Tebrikler! ${targetQuest.name} başarıyla üretildi ve 3 yıldız kazandın!`);
    }
  };

  const handleAddDrop = (colorId: 'kirmizi' | 'sari' | 'mavi', colorName: string, hex: string) => {
    soundFX.playMixSound();
    const newDrop: Drop = {
      id: Date.now() + Math.random(),
      color: colorId,
      name: colorName,
      hex,
    };
    const updated = [...drops, newDrop];
    setDrops(updated);

    // Speak color
    soundFX.speak(`${colorName} damlatıldı`);

    // Check if combo made
    setTimeout(() => {
      checkTargetCompletion();
    }, 400);
  };

  const handleReset = () => {
    soundFX.playPop();
    setDrops([]);
  };

  const handleSelectTargetQuest = (recipe: typeof targetRecipes[0]) => {
    soundFX.playPop();
    setTargetQuest({
      ...recipe,
      rewardClaimed: false,
    });
    setDrops([]);
    soundFX.speak(`Yeni görev: ${recipe.name}. ${recipe.formula} yaparak bu iksiri üret!`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      
      {/* Title & Challenge Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
            <Beaker className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Sihirli Renk Laboratuvarı
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Ana renk tüplerini damlat, sihirli ara renk iksirlerini keşfet!
            </p>
          </div>
        </div>

        {/* Target Recipe selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-600">İksir Görevi:</span>
          {targetRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handleSelectTargetQuest(recipe)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                targetQuest.id === recipe.id
                  ? 'bg-slate-900 text-white shadow-xs ring-2 ring-slate-900/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{recipe.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Mission Alert Bar */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center font-bold text-amber-800 text-sm">
            🎯
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Aktif İksir Hedefi</p>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-950 flex items-center gap-2">
              <span>{targetQuest.name} Üret</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900 font-bold">
                Formül: {targetQuest.formula}
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {targetQuest.rewardClaimed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tamamlandı! +3 Yıldız</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-200/60 px-3 py-1 rounded-xl">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Ödül: +3 Parlak Yıldız</span>
            </div>
          )}
        </div>
      </div>

      {/* The Laboratory Main Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Pipette Droppers */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. Ana Renk Tüpleri (Damlat)</span>
            </h3>
            
            <div className="space-y-3">
              {availableColors.map((color) => {
                const count = colorCounts[color.id];
                return (
                  <button
                    key={color.id}
                    id={`btn-drop-${color.id}`}
                    onClick={() => handleAddDrop(color.id, color.name, color.hex)}
                    className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all hover:scale-102 active:scale-98 shadow-xs hover:shadow-md ${color.border} bg-white hover:bg-slate-50`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white font-bold shadow-sm ${color.shadow}`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {color.emoji}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">{color.name} Damlat</h4>
                        <span className="text-[11px] font-semibold text-slate-400">Ana Renk Tüpü</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {count > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-black text-xs">
                          {count} Damla
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                        + Damlat
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              id="btn-reset-lab"
              onClick={handleReset}
              disabled={drops.length === 0}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                drops.length > 0
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kabı Temizle / Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Center: Big Magic Beaker / Cauldron */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-950 text-white shadow-2xl flex flex-col items-center border border-slate-700">
            
            {/* Glowing Aura Effect */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: mixedColorHex }}
            />

            {/* Top Beaker Rim */}
            <div className="relative z-10 w-44 h-8 rounded-full border-4 border-slate-400/80 bg-slate-700/50 mb-2 flex items-center justify-center">
              <span className="text-[11px] font-bold tracking-widest text-slate-300 uppercase">Sihirli Karışım</span>
            </div>

            {/* Beaker Body */}
            <div className="relative z-10 w-52 h-64 rounded-b-[40px] rounded-t-lg border-4 border-slate-400/60 bg-slate-900/80 overflow-hidden backdrop-blur-md shadow-inner flex flex-col justify-end p-2">
              
              {/* Measurement marks */}
              <div className="absolute top-6 left-3 space-y-4 select-none opacity-40 font-mono text-[10px]">
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-white" /> 300ml</div>
                <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-white" /> 200ml</div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-white" /> 100ml</div>
              </div>

              {/* Animated Liquid */}
              <div
                className="w-full rounded-b-[32px] transition-all duration-700 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
                style={{
                  height: drops.length === 0 ? '15%' : `${Math.min(30 + drops.length * 25, 95)}%`,
                  backgroundColor: mixedColorHex,
                }}
              >
                {/* Surface bubble animation */}
                {drops.length > 0 && (
                  <div className="absolute inset-x-0 top-0 h-4 bg-white/25 animate-pulse" />
                )}

                {/* Sparkling icon inside beaker */}
                <div className="p-3 rounded-full bg-black/20 backdrop-blur-xs text-white">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Mixture Result Box */}
            <div className="relative z-10 mt-6 w-full text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold">
                {isSecondary ? '✨ ARA RENK KEŞFEDİLDİ! ✨' : 'Deney Sonucu'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{mixedName}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-sm mx-auto leading-relaxed">
                {explanation}
              </p>

              {drops.length > 0 && (
                <button
                  onClick={() => {
                    soundFX.speak(`${mixedName}. ${explanation}`);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Açıklamayı Dinle</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
