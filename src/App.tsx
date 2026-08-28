import React, { useState, useEffect } from 'react';
import { GameMode } from './types';
import { Navbar } from './components/Navbar';
import { ColorLearnCards } from './components/ColorLearnCards';
import { ColorLab } from './components/ColorLab';
import { TwoPlayerDuel } from './components/TwoPlayerDuel';
import { SymbolMatchingGame } from './components/SymbolMatchingGame';
import { TrophyQuest } from './components/TrophyQuest';
import { CertificateModal } from './components/CertificateModal';
import { GuideModal } from './components/GuideModal';
import { soundFX } from './utils/audio';
import { TROPHIES_LIST } from './data/colorsData';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('learn');
  const [totalStars, setTotalStars] = useState<number>(() => {
    const saved = localStorage.getItem('renk_stars');
    return saved ? parseInt(saved, 10) : 4; // Start with friendly initial stars
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Save stars to local storage
  useEffect(() => {
    localStorage.setItem('renk_stars', totalStars.toString());
  }, [totalStars]);

  // Calculate unlocked trophies
  const unlockedTrophiesCount = TROPHIES_LIST.filter(
    (t) => totalStars >= t.requiredStars
  ).length;

  const handleEarnStars = (amount: number) => {
    setTotalStars((prev) => prev + amount);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setSoundEnabled(next);
  };

  const handleToggleSpeech = () => {
    const next = !speechEnabled;
    setSpeechEnabled(next);
    soundFX.setSpeechEnabled(next);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        totalStars={totalStars}
        totalTrophies={unlockedTrophiesCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 max-w-7xl w-full mx-auto pb-12">
        {currentMode === 'learn' && (
          <ColorLearnCards
            onStartLab={() => setCurrentMode('lab')}
            onStartDuel={() => setCurrentMode('duel')}
          />
        )}

        {currentMode === 'lab' && (
          <ColorLab onEarnStars={handleEarnStars} />
        )}

        {currentMode === 'duel' && (
          <TwoPlayerDuel onEarnStars={handleEarnStars} />
        )}

        {currentMode === 'matching' && (
          <SymbolMatchingGame onEarnStars={handleEarnStars} />
        )}

        {currentMode === 'quest' && (
          <TrophyQuest
            totalStars={totalStars}
            onEarnStars={handleEarnStars}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xs py-5 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 justify-center">
            <span>🎨 Renk Dünyası &mdash; İlkokul Düzeyi Ana ve Ara Renkler Etkinlik Platformu</span>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>❤️ Kırmızı</span>
            <span>☀️ Sarı</span>
            <span>💧 Mavi</span>
            <span>🍃 Yeşil</span>
            <span>🍊 Turuncu</span>
            <span>🍇 Mor</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        totalStars={totalStars}
        totalTrophies={unlockedTrophiesCount}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

    </div>
  );
}
