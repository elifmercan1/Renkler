import React, { useState } from 'react';
import { X, Award, Printer, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalStars: number;
  totalTrophies: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  totalStars,
  totalTrophies,
}) => {
  const [studentName, setStudentName] = useState('Sevgili Öğrenci / Takım');
  const [teacherName, setTeacherName] = useState('Görsel Sanatlar & Sınıf Öğretmeni');
  const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFX.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input Bar (Hidden in Print) */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3 print:hidden">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Sertifikayı Özelleştir</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Öğrenci veya Grup Adı:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Öğretmen Adı / Unvanı:</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* PRINTABLE DIPLOMA / CERTIFICATE */}
        <div className="border-8 border-double border-amber-400 p-6 sm:p-8 rounded-2xl text-center space-y-5 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/40 relative overflow-hidden">
          
          {/* Certificate Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>İLKOKUL RENK BİLGİSİ VE SANAT BAŞARI BELGESİ</span>
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase font-serif">
              Renk Ustası Sertifikası
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-2" />
          </div>

          {/* Body content */}
          <div className="space-y-3 text-slate-700">
            <p className="text-xs text-slate-500 font-medium">Bu belge, başarı gösteren</p>
            <div className="text-xl sm:text-2xl font-black text-rose-600 underline decoration-amber-400 decoration-2 underline-offset-8">
              {studentName}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-lg mx-auto pt-2">
              tarafından <strong>Ana Renkler</strong> (Kırmızı, Sarı, Mavi) ve <strong>Ara Renkler</strong> (Yeşil, Turuncu, Mor) ile eğlenceli sembollerin interaktif etkinliklerini ve ikili grup oyunlarını üstün başarıyla tamamladığı için verilmiştir.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{totalStars} Yıldız</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>{totalTrophies} Kupa</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-end justify-between pt-6 border-t border-amber-200 text-left text-xs font-bold text-slate-600">
            <div>
              <p className="text-[11px] text-slate-400">Tarih:</p>
              <p className="text-slate-800">{today}</p>
            </div>

            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-md text-xl border-2 border-white">
              🏅
            </div>

            <div className="text-right">
              <p className="text-[11px] text-slate-400">Onaylayan:</p>
              <p className="text-slate-800">{teacherName}</p>
            </div>
          </div>

        </div>

        {/* Print & Action Buttons */}
        <div className="flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Kapat
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
        </div>

      </div>
    </div>
  );
};
