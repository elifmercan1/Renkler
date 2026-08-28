import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Volume2, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getShuffledQuestions, TROPHIES_LIST } from '../data/colorsData';
import { Question } from '../types';
import { soundFX } from '../utils/audio';

interface TrophyQuestProps {
  totalStars: number;
  onEarnStars: (amount: number) => void;
  onOpenCertificate: () => void;
}

export const TrophyQuest: React.FC<TrophyQuestProps> = ({ totalStars, onEarnStars, onOpenCertificate }) => {
  const [questions, setQuestions] = useState<Question[]>(() => getShuffledQuestions());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (answered || !question) return;
    setSelectedOption(idx);
    setAnswered(true);

    const isCorrect = question.options[idx].isCorrect;
    if (isCorrect) {
      soundFX.playSuccessChime();
      soundFX.playSparkle();
      onEarnStars(2);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
      });

      soundFX.speak(`Doğru cevap! ${question.options[idx].explanation}`);
    } else {
      soundFX.playTryAgain();
      soundFX.speak(`Tekrar dene! ${question.options[idx].explanation}`);
    }
  };

  const handleNext = () => {
    soundFX.playPop();
    setSelectedOption(null);
    setAnswered(false);
    setShowHint(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
      soundFX.playTrophyFanfare();
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
      });
      onEarnStars(5);
    }
  };

  const handleRestart = () => {
    soundFX.playPop();
    setQuestions(getShuffledQuestions());
    setCurrentIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setShowHint(false);
    setCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Header & Trophy Showcase */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md">
              🏆
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Kupa & Yıldız Macerası
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Soruları doğru cevapla, yıldızları topla ve tüm kupaları aç!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-black text-sm flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{totalStars} Yıldız Kazanıldı</span>
            </div>
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {TROPHIES_LIST.map((trophy) => {
            const isUnlocked = totalStars >= trophy.requiredStars;
            return (
              <div
                key={trophy.id}
                className={`p-3.5 rounded-2xl border-2 transition-all text-center space-y-1 relative ${
                  isUnlocked
                    ? 'bg-amber-50 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-3xl my-1">{trophy.icon}</div>
                <h4 className="text-xs font-black text-slate-800 line-clamp-1">{trophy.title}</h4>
                <div className="text-[11px] font-bold text-slate-500">
                  {isUnlocked ? (
                    <span className="text-emerald-700 font-black">Açıldı ✅</span>
                  ) : (
                    <span>{trophy.requiredStars} ⭐ Gerekli</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Area */}
      {!completed ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-6">
          
          {/* Question Header & Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-400">
              <span>SORU {currentIdx + 1} / {questions.length}</span>
              <span>+2 Yıldız Kazan</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Prompt */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 relative">
            <h3 className="text-lg sm:text-xl font-black">{question.prompt}</h3>
            <button
              onClick={() => soundFX.speak(question.prompt)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Sesli Oku</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (answered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-400';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  id={`btn-quest-opt-${idx}`}
                  disabled={answered}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {answered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {answered && selectedOption !== null && (
            <div className={`p-4 rounded-2xl border-2 space-y-1 ${
              question.options[selectedOption].isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <h4 className="font-black text-sm">
                {question.options[selectedOption].isCorrect ? '🌟 Harika Bildin!' : '💡 Öğrenelim:'}
              </h4>
              <p className="text-xs sm:text-sm font-medium">
                {question.options[selectedOption].explanation}
              </p>
            </div>
          )}

          {/* Actions: Hint & Next Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              {!answered && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>{showHint ? question.hint : 'İpucu Göster'}</span>
                </button>
              )}
            </div>

            {answered && (
              <button
                id="btn-quest-next"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-md hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Sonraki Soru</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Completed Victory Screen */
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 text-center space-y-6 shadow-xl">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center text-5xl shadow-lg animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">Görev Tamamlandı</span>
            <h3 className="text-3xl font-black text-slate-800">
              Tebrikler! Gerçek Bir Renk Ustasısın!
            </h3>
            <p className="text-slate-600 text-sm font-medium max-w-md mx-auto">
              Ana ve ara renkler testini başarıyla bitirdin. Şimdi ismine özel Başarı Belgeni oluşturabilirsin!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenCertificate}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Başarı Sertifikasını Aç</span>
            </button>
            <button
              onClick={handleRestart}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Testi Tekrarla</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
