import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Users, RefreshCw, Volume2, CheckCircle2, XCircle, Award, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getShuffledQuestions } from '../data/colorsData';
import { Question } from '../types';
import { soundFX } from '../utils/audio';

interface TwoPlayerDuelProps {
  onEarnStars: (amount: number) => void;
}

export const TwoPlayerDuel: React.FC<TwoPlayerDuelProps> = ({ onEarnStars }) => {
  // Game Setup & State
  const [team1Name, setTeam1Name] = useState('Kırmızı Yıldızlar');
  const [team2Name, setTeam2Name] = useState('Mavi Şimşekler');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Stars, setTeam1Stars] = useState(0);
  const [team2Stars, setTeam2Stars] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'roundFeedback' | 'gameOver'>('lobby');

  const [lastAnswerResult, setLastAnswerResult] = useState<{
    team: 1 | 2;
    isCorrect: boolean;
    explanation: string;
    selectedOption: string;
  } | null>(null);

  // Shuffle questions and their choices on game start
  const startNewGame = () => {
    soundFX.playPop();
    const shuffled = getShuffledQuestions();
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Stars(0);
    setTeam2Stars(0);
    setLastAnswerResult(null);
    setGameState('playing');

    soundFX.speak(`Oyun başladı! İlk soru geliyor: ${shuffled[0].prompt}`);
  };

  const currentQ = questions[currentQuestionIndex];

  // Team answers
  const handleTeamAnswer = (team: 1 | 2, optionIndex: number) => {
    if (gameState !== 'playing' || !currentQ) return;

    const chosenOption = currentQ.options[optionIndex];
    const isCorrect = chosenOption.isCorrect;

    if (isCorrect) {
      soundFX.playSuccessChime();
      soundFX.playSparkle();

      if (team === 1) {
        setTeam1Score((prev) => prev + 10);
        setTeam1Stars((prev) => prev + 1);
      } else {
        setTeam2Score((prev) => prev + 10);
        setTeam2Stars((prev) => prev + 1);
      }

      onEarnStars(2);

      // Micro confetti on correct answer
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: team === 1 ? 0.3 : 0.7, y: 0.6 },
        colors: team === 1 ? ['#EF4444', '#FACC15'] : ['#3B82F6', '#22C55E'],
      });

      soundFX.speak(`Doğru cevap ${team === 1 ? team1Name : team2Name}! ${chosenOption.explanation}`);
    } else {
      soundFX.playTryAgain();
      soundFX.speak(`Tekrar deneyin! ${chosenOption.explanation}`);
    }

    setLastAnswerResult({
      team,
      isCorrect,
      explanation: chosenOption.explanation,
      selectedOption: chosenOption.text,
    });

    setGameState('roundFeedback');
  };

  // Next round
  const handleNextRound = () => {
    soundFX.playPop();
    setLastAnswerResult(null);

    if (currentQuestionIndex + 1 < Math.min(questions.length, 8)) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGameState('playing');
      const nextQ = questions[currentQuestionIndex + 1];
      soundFX.speak(nextQ.prompt);
    } else {
      // Game Over
      setGameState('gameOver');
      soundFX.playTrophyFanfare();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
      onEarnStars(5);
    }
  };

  // Lobby Screen
  if (gameState === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>2 Kişilik / İkili Grup İnteraktif Mod</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            İkili Grup Renk Düellosu 🏆
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Sınıfta veya evde iki grup olarak yarışın! Ana ve ara renkler sorularını ilk doğru bilen grup yıldızları ve büyük kupayı kazanır.
          </p>
        </div>

        {/* Team Customization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Team 1 */}
          <div className="p-6 rounded-3xl bg-red-50 border-2 border-red-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-red-500/30">
                ⭐
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">1. Grup / Sol Taraf</span>
                <h3 className="text-lg font-black text-red-950">Grup Adını Belirle</h3>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Takım İsmi:</label>
              <input
                id="input-team-1-name"
                type="text"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-red-300 font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>
            <p className="text-xs text-red-700 font-medium">
              🍎 Kırmızı renkten güç alan neşeli kaşifler!
            </p>
          </div>

          {/* Team 2 */}
          <div className="p-6 rounded-3xl bg-blue-50 border-2 border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/30">
                ⚡
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">2. Grup / Sağ Taraf</span>
                <h3 className="text-lg font-black text-blue-950">Grup Adını Belirle</h3>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Takım İsmi:</label>
              <input
                id="input-team-2-name"
                type="text"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-blue-300 font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-blue-700 font-medium">
              💧 Mavi renkten ilham alan hızlı bilginler!
            </p>
          </div>

        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            id="btn-start-duel-game"
            onClick={startNewGame}
            className="px-8 py-4 rounded-3xl bg-gradient-to-r from-red-500 via-amber-500 to-blue-600 text-white font-black text-lg shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all"
          >
            🚀 Düelloyu Başlat! (8 Raunt)
          </button>
        </div>

      </div>
    );
  }

  // Game Over / Podium Screen
  if (gameState === 'gameOver') {
    const isTie = team1Score === team2Score;
    const winnerName = team1Score > team2Score ? team1Name : team2Name;
    const winnerStars = team1Score > team2Score ? team1Stars : team2Stars;

    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-xl space-y-6">
          
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-5xl shadow-lg animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">Oyun Bitti & Kupa Töreni</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isTie ? 'Dostluk Kazandı! Muhteşem Beraberlik! 🎉' : `Tebrikler ${winnerName}! 👑`}
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              İki grup da ana ve ara renkler konusunda harika bir performans sergiledi!
            </p>
          </div>

          {/* Results Comparison */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            
            <div className={`p-4 rounded-2xl border-2 ${team1Score >= team2Score ? 'bg-red-50 border-red-300 ring-2 ring-red-400' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="font-black text-slate-800 text-sm">{team1Name}</h4>
              <div className="text-2xl font-black text-red-600 my-1">{team1Score} Puan</div>
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{team1Stars} Yıldız</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 ${team2Score >= team1Score ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="font-black text-slate-800 text-sm">{team2Name}</h4>
              <div className="text-2xl font-black text-blue-600 my-1">{team2Score} Puan</div>
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{team2Stars} Yıldız</span>
              </div>
            </div>

          </div>

          {/* Rematch or Return */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={startNewGame}
              className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Yeniden Karşılaş</span>
            </button>
            <button
              onClick={() => setGameState('lobby')}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all"
            >
              <span>Takım İsimlerini Değiştir</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Active Gameplay Arena (Split Screen 2-Player UI)
  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6">
      
      {/* Top Match Bar */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
        
        {/* Team 1 Score */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            ⭐
          </div>
          <div>
            <h4 className="font-black text-slate-800 text-sm truncate max-w-[120px] sm:max-w-none">{team1Name}</h4>
            <div className="flex items-center gap-2">
              <span className="font-black text-red-600 text-sm">{team1Score} P</span>
              <span className="text-xs font-bold text-amber-700">({team1Stars} ⭐)</span>
            </div>
          </div>
        </div>

        {/* Round Badge */}
        <div className="flex flex-col items-center">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-black text-xs">
            Raunt {currentQuestionIndex + 1} / 8
          </span>
          <span className="text-[11px] font-bold text-slate-400 mt-0.5">İlk Doğru Basan Kazanır!</span>
        </div>

        {/* Team 2 Score */}
        <div className="flex items-center gap-3 text-right">
          <div>
            <h4 className="font-black text-slate-800 text-sm truncate max-w-[120px] sm:max-w-none">{team2Name}</h4>
            <div className="flex items-center gap-2 justify-end">
              <span className="font-black text-blue-600 text-sm">{team2Score} P</span>
              <span className="text-xs font-bold text-amber-700">({team2Stars} ⭐)</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            ⚡
          </div>
        </div>

      </div>

      {/* Center Question Showcase */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Soru {currentQuestionIndex + 1}</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black max-w-2xl mx-auto leading-snug">
          {currentQ.prompt}
        </h3>

        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => soundFX.speak(currentQ.prompt)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Soruyu Sesli Oku"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-medium">{currentQ.hint}</span>
        </div>
      </div>

      {/* Round Feedback / Pedagogical explanation overlay if answered */}
      {gameState === 'roundFeedback' && lastAnswerResult && (
        <div className={`p-5 rounded-3xl border-2 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200 ${
          lastAnswerResult.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            {lastAnswerResult.isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-amber-600 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm">
                  {lastAnswerResult.team === 1 ? team1Name : team2Name} {lastAnswerResult.isCorrect ? 'Doğru Bildi! 🌟' : 'Cevapladı:'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium mt-0.5">
                {lastAnswerResult.explanation}
              </p>
            </div>
          </div>

          <button
            id="btn-next-duel-round"
            onClick={handleNextRound}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-black text-xs sm:text-sm shadow-sm hover:bg-slate-800 active:scale-95 transition-all shrink-0"
          >
            Sonraki Soruya Geç ➔
          </button>
        </div>
      )}

      {/* 2-Player Split Screen Response Pods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT POD: Team 1 (Red) */}
        <div className="p-5 rounded-3xl bg-red-50/70 border-2 border-red-200 space-y-4">
          <div className="flex items-center justify-between border-b border-red-200/80 pb-2">
            <span className="font-extrabold text-sm text-red-900 flex items-center gap-2">
              <span>⭐ {team1Name} Paneli</span>
            </span>
            <span className="text-[11px] font-bold text-red-600 uppercase">Sol Oyuncu</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                id={`btn-t1-opt-${idx}`}
                disabled={gameState !== 'playing'}
                onClick={() => handleTeamAnswer(1, idx)}
                className="p-3.5 rounded-2xl bg-white hover:bg-red-500 hover:text-white border-2 border-red-200 font-bold text-slate-800 text-sm text-left transition-all active:scale-98 shadow-2xs hover:shadow-sm flex items-center justify-between group disabled:opacity-60"
              >
                <span>{opt.text}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-red-100 group-hover:bg-white/20 text-red-800 group-hover:text-white font-black">
                  Tıkla
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT POD: Team 2 (Blue) */}
        <div className="p-5 rounded-3xl bg-blue-50/70 border-2 border-blue-200 space-y-4">
          <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
            <span className="font-extrabold text-sm text-blue-900 flex items-center gap-2">
              <span>⚡ {team2Name} Paneli</span>
            </span>
            <span className="text-[11px] font-bold text-blue-600 uppercase">Sağ Oyuncu</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                id={`btn-t2-opt-${idx}`}
                disabled={gameState !== 'playing'}
                onClick={() => handleTeamAnswer(2, idx)}
                className="p-3.5 rounded-2xl bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-200 font-bold text-slate-800 text-sm text-left transition-all active:scale-98 shadow-2xs hover:shadow-sm flex items-center justify-between group disabled:opacity-60"
              >
                <span>{opt.text}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 group-hover:bg-white/20 text-blue-800 group-hover:text-white font-black">
                  Tıkla
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
