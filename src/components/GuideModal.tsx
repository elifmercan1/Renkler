import React from 'react';
import { X, BookOpen, Sparkles, Check, Users, Beaker, Lightbulb } from 'lucide-react';
import { COLOR_FORMULAS } from '../data/colorsData';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Öğretmen & Öğrenci Pedagojik Rehberi</h3>
            <p className="text-xs text-slate-500 font-medium">Ana ve ara renklerin ilkokul kazanımları ve kuralları</p>
          </div>
        </div>

        {/* Section 1: Ana Renkler */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <h4 className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>1. Ana Renkler Nedir?</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Doğada kendiliğinden bulunan, başka renklerin karışımıyla <strong>oluşturulamayan</strong> 3 temel renktir:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-bold text-xs">
            <div className="p-2 rounded-xl bg-red-100 text-red-900 border border-red-200">
              🍎 Kırmızı
            </div>
            <div className="p-2 rounded-xl bg-yellow-100 text-yellow-900 border border-yellow-200">
              ☀️ Sarı
            </div>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-900 border border-blue-200">
              💧 Mavi
            </div>
          </div>
        </div>

        {/* Section 2: Ara Renkler & Formüller */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
          <h4 className="font-extrabold text-sm text-purple-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>2. Ara Renkler ve Karışım Formülleri</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            İki ana rengin eşit miktarda karıştırılmasıyla elde edilen renklerdir:
          </p>
          <div className="space-y-1.5 pt-1 text-xs">
            {COLOR_FORMULAS.map((formula) => (
              <div key={formula.id} className="p-2 rounded-xl bg-white border border-purple-100 flex items-center justify-between font-bold">
                <span>{formula.color1} + {formula.color2} = <strong className="text-purple-900">{formula.result}</strong></span>
                <span className="text-xs font-semibold text-slate-500">{formula.mnemonic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Sınıf İçi İkili Grup Oyun Önerisi */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <h4 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>3. Sınıf İçi İkili Grup Etkinliği Nasıl Yapılır?</span>
          </h4>
          <ul className="text-xs text-slate-700 space-y-1.5 font-medium list-disc list-inside">
            <li>Öğrencileri 2şerli eşleştirin (Örn: Sıra arkadaşları veya Kırmızı/Mavi gruplar).</li>
            <li><strong>İkili Grup Oyunu</strong> sekmesini açarak her rauntta soruya ilk doğru basan takımın yıldız toplamasını sağlayın.</li>
            <li>Oyun sonunda en çok yıldızı toplayan takımlara <strong>Renk Ustası Sertifikası</strong> yazdırıp hediye edin!</li>
          </ul>
        </div>

        {/* Action Close */}
        <div className="text-right pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Anladım, Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
