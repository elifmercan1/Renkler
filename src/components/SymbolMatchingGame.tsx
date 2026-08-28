import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Volume2, CheckCircle, Flame, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface SymbolMatchingGameProps {
  onEarnStars: (amount: number) => void;
}

interface SymbolCard {
  id: string;
  name: string;
  emoji: string;
  colorName: string;
  colorHex: string;
  type: 'primary' | 'secondary';
  typeLabel: string;
  fact: string;
}

const ALL_SYMBOLS: SymbolCard[] = [
  // Primary
  { id: 'elma', name: 'Kırmızı Elma', emoji: '🍎', colorName: 'Kırmızı', colorHex: '#EF4444', type: 'primary', typeLabel: 'Ana Renk', fact: 'Elma kırmızı bir ana renk meyvesidir.' },
  { id: 'gunes', name: 'Sarı Güneş', emoji: '☀️', colorName: 'Sarı', colorHex: '#FACC15', type: 'primary', typeLabel: 'Ana Renk', fact: 'Güneş sarı ana rengimizdir.' },
  { id: 'damla', name: 'Mavi Su Damlası', emoji: '💧', colorName: 'Mavi', colorHex: '#3B82F6', type: 'primary', typeLabel: 'Ana Renk', fact: 'Su damlaları ve deniz masmavidir.' },
  { id: 'cilek', name: 'Tatlı Çilek', emoji: '🍓', colorName: 'Kırmızı', colorHex: '#EF4444', type: 'primary', typeLabel: 'Ana Renk', fact: 'Çilek kırmızı bir ana renktir.' },
  { id: 'limon', name: 'Sarı Limon', emoji: '🍋', colorName: 'Sarı', colorHex: '#FACC15', type: 'primary', typeLabel: 'Ana Renk', fact: 'Limon parlak sarı bir ana renktir.' },
  { id: 'bulut', name: 'Mavi Bulut', emoji: '☁️', colorName: 'Mavi', colorHex: '#3B82F6', type: 'primary', typeLabel: 'Ana Renk', fact: 'Mavi gökyüzü ana rengimizdir.' },
  // Secondary
  { id: 'yaprak', name: 'Yeşil Yaprak', emoji: '🍃', colorName: 'Yeşil', colorHex: '#22C55E', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Yaprak yeşildir (Sarı + Mavi).' },
  { id: 'portakal', name: 'Sulu Portakal', emoji: '🍊', colorName: 'Turuncu', colorHex: '#F97316', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Portakal turuncudur (Kırmızı + Sarı).' },
  { id: 'uzum', name: 'Mor Üzüm', emoji: '🍇', colorName: 'Mor', colorHex: '#A855F7', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Üzüm mordur (Kırmızı + Mavi).' },
  { id: 'kurbaga', name: 'Yeşil Kurbağa', emoji: '🐸', colorName: 'Yeşil', colorHex: '#22C55E', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Kurbağa yeşil bir ara renktir.' },
  { id: 'havuc', name: 'Turuncu Havuç', emoji: '🥕', colorName: 'Turuncu', colorHex: '#F97316', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Havuç turuncu bir ara renktir.' },
  { id: 'patlican', name: 'Mor Patlıcan', emoji: '🍆', colorName: 'Mor', colorHex: '#A855F7', type: 'secondary', typeLabel: 'Ara Renk', fact: 'Patlıcan mor bir ara renktir.' },
];

export const SymbolMatchingGame: React.FC<SymbolMatchingGameProps> = ({ onEarnStars }) => {
  const [deck, setDeck] = useState<SymbolCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const startNewSession = () => {
    soundFX.playPop();
    const shuffled = [...ALL_SYMBOLS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setFeedback(null);
    setCompleted(false);

    soundFX.speak(`Sembol Eşleme oyunu başladı! Gelen sembolü doğru sepetine yerleştir!`);
  };

  useEffect(() => {
    startNewSession();
  }, []);

  const currentSymbol = deck[currentIndex];

  const handleChooseBasket = (chosenType: 'primary' | 'secondary') => {
    if (!currentSymbol || completed) return;

    const isCorrect = currentSymbol.type === chosenType;

    if (isCorrect) {
      soundFX.playSuccessChime();
      soundFX.playSparkle();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore((prev) => prev + 10 + newCombo * 2);
      onEarnStars(1);

      setFeedback({
        isCorrect: true,
        text: `Harika! ${currentSymbol.name} bir ${currentSymbol.typeLabel}dir! (${currentSymbol.fact})`,
      });
      soundFX.speak(`Doğru! ${currentSymbol.name} bir ${currentSymbol.typeLabel}dir.`);
    } else {
      soundFX.playTryAgain();
      setCombo(0);
      setFeedback({
        isCorrect: false,
        text: `Dikkat! ${currentSymbol.name} aslında bir ${currentSymbol.typeLabel}dir (${currentSymbol.colorName}).`,
      });
      soundFX.speak(`Tekrar hatırla: ${currentSymbol.name}, ${currentSymbol.typeLabel} grubundadır.`);
    }

    // Advance to next symbol
    setTimeout(() => {
      if (currentIndex + 1 < deck.length) {
        setCurrentIndex((prev) => prev + 1);
        setFeedback(null);
      } else {
        setCompleted(true);
        soundFX.playTrophyFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        onEarnStars(5);
      }
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Eğlenceli Sembolleri Ayıkla! 🍎🍃
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Gelen sembolü Ana Renk veya Ara Renk sepetine yolla!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {combo > 1 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-xl font-black text-xs animate-bounce">
              <Flame className="w-4 h-4" />
              <span>{combo}x Seri!</span>
            </div>
          )}
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-black text-xs">
            Skor: {score}
          </div>
          <button
            onClick={startNewSession}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Yeniden Başlat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Card */}
      {!completed && currentSymbol ? (
        <div className="space-y-6">
          
          {/* Symbol Inspection Stage */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200 text-center space-y-4 shadow-md relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
              <span>Sembol {currentIndex + 1} / {deck.length}</span>
            </div>

            {/* Big Symbol Emoji */}
            <div className="relative inline-block my-2">
              <div
                className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl shadow-inner border-4 border-white transition-transform hover:scale-105"
                style={{ backgroundColor: `${currentSymbol.colorHex}25` }}
              >
                <span className="animate-pulse">{currentSymbol.emoji}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800">{currentSymbol.name}</h3>
              <p className="text-sm text-slate-500 font-bold mt-1">
                Rengi: <span style={{ color: currentSymbol.colorHex }}>{currentSymbol.colorName}</span>
              </p>
            </div>

            {/* Read sound */}
            <button
              onClick={() => soundFX.speak(`${currentSymbol.name}. Rengi: ${currentSymbol.colorName}. Hangi renk grubuna aittir?`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Sesli Oku</span>
            </button>
          </div>

          {/* Feedback Bar */}
          {feedback && (
            <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold text-sm transition-all ${
              feedback.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Sorting Target Baskets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Basket 1: ANA RENKLER */}
            <button
              id="btn-basket-primary"
              onClick={() => handleChooseBasket('primary')}
              className="group p-6 rounded-3xl bg-amber-50 hover:bg-amber-500 border-4 border-amber-300 hover:border-amber-600 transition-all duration-200 shadow-md hover:shadow-xl active:scale-98 text-left space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl group-hover:scale-125 transition-transform">🧺</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 group-hover:bg-white text-amber-900 group-hover:text-amber-900 font-extrabold text-xs">
                  Temel
                </span>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-amber-950 group-hover:text-white">
                  ANA RENKLER SEPETİ
                </h4>
                <p className="text-xs text-amber-800 group-hover:text-amber-100 font-semibold mt-1">
                  (Kırmızı 🍎, Sarı ☀️, Mavi 💧)
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block w-full py-2.5 rounded-xl bg-white group-hover:bg-slate-900 text-amber-900 group-hover:text-white font-black text-xs sm:text-sm text-center shadow-xs">
                  Buraya Gönder ➔
                </span>
              </div>
            </button>

            {/* Basket 2: ARA RENKLER */}
            <button
              id="btn-basket-secondary"
              onClick={() => handleChooseBasket('secondary')}
              className="group p-6 rounded-3xl bg-purple-50 hover:bg-purple-500 border-4 border-purple-300 hover:border-purple-600 transition-all duration-200 shadow-md hover:shadow-xl active:scale-98 text-left space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl group-hover:scale-125 transition-transform">✨</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-200 group-hover:bg-white text-purple-900 group-hover:text-purple-900 font-extrabold text-xs">
                  Karışım
                </span>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-purple-950 group-hover:text-white">
                  ARA RENKLER SEPETİ
                </h4>
                <p className="text-xs text-purple-800 group-hover:text-purple-100 font-semibold mt-1">
                  (Yeşil 🍃, Turuncu 🍊, Mor 🍇)
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block w-full py-2.5 rounded-xl bg-white group-hover:bg-slate-900 text-purple-900 group-hover:text-white font-black text-xs sm:text-sm text-center shadow-xs">
                  Buraya Gönder ➔
                </span>
              </div>
            </button>

          </div>

        </div>
      ) : (
        /* Completed Stage */
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-md animate-bounce">
            🌟
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Tüm Sembolleri Başarıyla Ayıkladın!
            </h3>
            <p className="text-slate-600 text-sm font-medium">
              Ana ve ara renk sembollerini eksiksiz tamamladın. Toplam Skorun: <strong>{score}</strong>
            </p>
          </div>
          <button
            onClick={startNewSession}
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-md hover:bg-slate-800 active:scale-95 transition-all"
          >
            Yeniden Oyna 🔄
          </button>
        </div>
      )}

    </div>
  );
};
