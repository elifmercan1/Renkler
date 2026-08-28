import React from 'react';
import { Palette, Sparkles, Volume2, VolumeX, Award, HelpCircle, Users, Beaker, Layers, PlayCircle, BookOpen } from 'lucide-react';
import { GameMode } from '../types';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  totalStars: number;
  totalTrophies: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onOpenCertificate: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  totalStars,
  totalTrophies,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  onOpenCertificate,
  onOpenGuide,
}) => {
  const modes: Array<{ id: GameMode; label: string; icon: React.ReactNode; color: string }> = [
    { id: 'learn', label: 'Renkleri Tanı', icon: <BookOpen className="w-4 h-4" />, color: 'hover:text-amber-600' },
    { id: 'lab', label: 'Sihirli Laboratuvar', icon: <Beaker className="w-4 h-4" />, color: 'hover:text-emerald-600' },
    { id: 'duel', label: 'İkili Grup Oyunu', icon: <Users className="w-4 h-4" />, color: 'hover:text-rose-600' },
    { id: 'matching', label: 'Sembol Eşle', icon: <Layers className="w-4 h-4" />, color: 'hover:text-sky-600' },
    { id: 'quest', label: 'Kupa Macerası', icon: <PlayCircle className="w-4 h-4" />, color: 'hover:text-purple-600' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div 
              id="app-logo-brand" 
              onClick={() => onSelectMode('learn')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-sky-400 p-0.5 shadow-sm transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Palette className="w-5 h-5 text-rose-500 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-1">
                    Renk Dünyası
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">İlkokul</span>
                  </h1>
                </div>
                <p className="text-xs text-slate-500 font-medium">Ana & Ara Renkler Eğitsel Macera</p>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                id="btn-sound-toggle-mobile"
                onClick={onToggleSound}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>
              <button
                id="btn-open-guide-mobile"
                onClick={onOpenGuide}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                title="Bilgi ve Rehber"
              >
                <HelpCircle className="w-4 h-4 text-sky-600" />
              </button>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {modes.map((mode) => {
              const isActive = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  id={`nav-tab-${mode.id}`}
                  onClick={() => {
                    soundFX.playPop();
                    onSelectMode(mode.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs scale-102 ring-2 ring-slate-900/10'
                      : `bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 ${mode.color}`
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side: Badges, Rewards & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Stars Counter */}
            <div 
              id="header-stars-badge"
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 font-extrabold text-sm shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              <span>{totalStars} Yıldız</span>
            </div>

            {/* Trophies Counter */}
            <div 
              id="header-trophies-badge"
              className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200/80 rounded-xl text-purple-900 font-extrabold text-sm shadow-2xs"
            >
              <span className="text-sm">🏆</span>
              <span>{totalTrophies} Kupa</span>
            </div>

            {/* Sound Toggle */}
            <button
              id="btn-sound-toggle-desktop"
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Sesler Açık (Tıkla ve Kapat)' : 'Sesler Kapalı (Tıkla ve Aç)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Speech Toggle */}
            <button
              id="btn-speech-toggle"
              onClick={onToggleSpeech}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                speechEnabled
                  ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={speechEnabled ? 'Sesli Okuma Açık' : 'Sesli Okuma Kapalı'}
            >
              {speechEnabled ? '🗣️ Sesli Oku' : '🤫 Sessiz'}
            </button>

            {/* Certificate Button */}
            <button
              id="btn-open-certificate"
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition-transform"
              title="Öğrenci Başarı Belgesi Oluştur"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Sertifika Al</span>
            </button>

            {/* Guide Button */}
            <button
              id="btn-open-guide-desktop"
              onClick={onOpenGuide}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 transition-colors"
              title="Pedagojik Rehber & Renk Kuralları"
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
