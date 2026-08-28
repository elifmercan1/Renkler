import { ColorItem, Question, Trophy } from '../types';

export const COLORS_DATA: ColorItem[] = [
  // ANA RENKLER (PRIMARY COLORS)
  {
    id: 'kirmizi',
    name: 'Kırmızı',
    englishName: 'Red',
    hex: '#EF4444',
    bgClass: 'bg-red-500',
    textClass: 'text-red-600',
    borderClass: 'border-red-500',
    type: 'primary',
    typeLabel: 'Ana Renk',
    description: 'Doğada saf halde bulunan en canlı ana renklerden biridir. Başka renklerin karışımıyla elde edilemez!',
    symbols: [
      { name: 'Kırmızı Elma', emoji: '🍎', iconName: 'Apple', fact: 'Elmalar kırmızı rengini güneş ışığı sayesinde alır!' },
      { name: 'Sevgi Kalbi', emoji: '❤️', iconName: 'Heart', fact: 'Kırmızı kalp sıcaklık ve sevgiyi sembolize eder.' },
      { name: 'Tatlı Çilek', emoji: '🍓', iconName: 'Strawberry', fact: 'Çilekler yaz mevsiminin kırmızı ana renkli meyvesidir.' },
      { name: 'Ateş & Güç', emoji: '🔥', iconName: 'Flame', fact: 'Ateş kıvılcımları kırmızının enerjisini taşır.' },
    ],
  },
  {
    id: 'sari',
    name: 'Sarı',
    englishName: 'Yellow',
    hex: '#FACC15',
    bgClass: 'bg-yellow-400',
    textClass: 'text-amber-600',
    borderClass: 'border-yellow-400',
    type: 'primary',
    typeLabel: 'Ana Renk',
    description: 'Işığın ve güneşin ana rengidir. Çok neşeli ve enerjiktir!',
    symbols: [
      { name: 'Parlak Güneş', emoji: '☀️', iconName: 'Sun', fact: 'Güneş dünyamızı sarı ışıklarıyla ısıtır ve aydınlatır.' },
      { name: 'Işıltılı Yıldız', emoji: '⭐', iconName: 'Star', fact: 'Gökyüzündeki sarı yıldızlar bize yol gösterir.' },
      { name: 'Sarı Limon', emoji: '🍋', iconName: 'Citrus', fact: 'Limon ferahlatıcı C vitamini dolu sarı bir meyvedir.' },
      { name: 'Sevimli Civciv', emoji: '🐥', iconName: 'Bird', fact: 'Yeni doğan civcivler yumuşacık sarı tüylere sahiptir.' },
    ],
  },
  {
    id: 'mavi',
    name: 'Mavi',
    englishName: 'Blue',
    hex: '#3B82F6',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-500',
    type: 'primary',
    typeLabel: 'Ana Renk',
    description: 'Gökyüzünün ve derin denizlerin ana rengidir. Huzur ve sakinlik verir.',
    symbols: [
      { name: 'Su Damlası', emoji: '💧', iconName: 'Droplet', fact: 'Su damlaları hayatımızın en değerli kaynağıdır.' },
      { name: 'Mavi Bulut', emoji: '☁️', iconName: 'Cloud', fact: 'Masmavi gökyüzünde beyaz ve mavi tonlu bulutlar yüzer.' },
      { name: 'Deniz Dalgası', emoji: '🌊', iconName: 'Waves', fact: 'Okyanuslar mavi rengiyle dünyamızın büyük kısmını kaplar.' },
      { name: 'Mavi Gezegen', emoji: '🌍', iconName: 'Globe', fact: 'Dünyamıza uzaydan bakıldığında "Mavi Gezegen" denir.' },
    ],
  },

  // ARA RENKLER (SECONDARY COLORS)
  {
    id: 'yesil',
    name: 'Yeşil',
    englishName: 'Green',
    hex: '#22C55E',
    bgClass: 'bg-green-500',
    textClass: 'text-green-600',
    borderClass: 'border-green-500',
    type: 'secondary',
    typeLabel: 'Ara Renk',
    description: 'Sarı ve Mavi ana renklerinin sihirli birleşimiyle oluşur!',
    formula: {
      color1: 'Sarı',
      color2: 'Mavi',
      color1Hex: '#FACC15',
      color2Hex: '#3B82F6',
    },
    symbols: [
      { name: 'Yeşil Yaprak', emoji: '🍃', iconName: 'Leaf', fact: 'Yapraklar güneş ışığı ile fotosentez yaparak yeşil kalır.' },
      { name: 'Uğurlu Yonca', emoji: '🍀', iconName: 'Clover', fact: 'Dört yapraklı yeşil yonca şans sembolüdür.' },
      { name: 'Sevimli Kurbağa', emoji: '🐸', iconName: 'Frog', fact: 'Kurbağalar doğada kamufle olmak için yeşil renklidir.' },
      { name: 'Yeşil Ağaç', emoji: '🌳', iconName: 'Tree', fact: 'Ormanlar dünyamızın yeşil akciğerleridir.' },
    ],
  },
  {
    id: 'turuncu',
    name: 'Turuncu',
    englishName: 'Orange',
    hex: '#F97316',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-500',
    type: 'secondary',
    typeLabel: 'Ara Renk',
    description: 'Kırmızı ve Sarı ana renklerinin sıcak birleşimiyle doğar!',
    formula: {
      color1: 'Kırmızı',
      color2: 'Sarı',
      color1Hex: '#EF4444',
      color2Hex: '#FACC15',
    },
    symbols: [
      { name: 'Sulu Portakal', emoji: '🍊', iconName: 'Orange', fact: 'Portakal ismini renginden alan nefis bir kış meyvesidir.' },
      { name: 'Tatlı Havuç', emoji: '🥕', iconName: 'Carrot', fact: 'Tavşanların en sevdiği turuncu ara renkli sebze havuçtur.' },
      { name: 'Kurnaz Tilki', emoji: '🦊', iconName: 'Fox', fact: 'Tilkilerin kürkü sıcak turuncu tonlarındadır.' },
      { name: 'Bal Kabağı', emoji: '🎃', iconName: 'Pumpkin', fact: 'Bal kabağı sonbaharın en neşeli turuncu sembolüdür.' },
    ],
  },
  {
    id: 'mor',
    name: 'Mor',
    englishName: 'Purple',
    hex: '#A855F7',
    bgClass: 'bg-purple-500',
    textClass: 'text-purple-600',
    borderClass: 'border-purple-500',
    type: 'secondary',
    typeLabel: 'Ara Renk',
    description: 'Kırmızı ve Mavi ana renklerinin asil ve sihirli karışımıyla meydana gelir!',
    formula: {
      color1: 'Kırmızı',
      color2: 'Mavi',
      color1Hex: '#EF4444',
      color2Hex: '#3B82F6',
    },
    symbols: [
      { name: 'Tatlı Üzüm', emoji: '🍇', iconName: 'Grape', fact: 'Mor üzümler salkım salkım yetişir ve çok lezzetlidir.' },
      { name: 'Mor Patlıcan', emoji: '🍆', iconName: 'Eggplant', fact: 'Patlıcan parlak mor kabuğuyla bilinen harika bir sebzedir.' },
      { name: 'Sihirli Kelebek', emoji: '🦋', iconName: 'Butterfly', fact: 'Mor kelebekler kanatlarında büyüleyici desenler taşır.' },
      { name: 'Güzel Çiçek', emoji: '🌸', iconName: 'Flower', fact: 'Menekşeler ve lavantalar mor rengin en zarif örnekleridir.' },
    ],
  },
];

export const COLOR_FORMULAS = [
  {
    id: 'yesil_formula',
    result: 'Yeşil',
    resultHex: '#22C55E',
    color1: 'Sarı',
    color1Hex: '#FACC15',
    color2: 'Mavi',
    color2Hex: '#3B82F6',
    emoji: '🍃',
    mnemonic: 'Sarı Güneş + Mavi Deniz = Yeşil Doğa!',
  },
  {
    id: 'turuncu_formula',
    result: 'Turuncu',
    resultHex: '#F97316',
    color1: 'Kırmızı',
    color1Hex: '#EF4444',
    color2: 'Sarı',
    color2Hex: '#FACC15',
    emoji: '🍊',
    mnemonic: 'Kırmızı Kalp + Sarı Güneş = Sıcak Turuncu!',
  },
  {
    id: 'mor_formula',
    result: 'Mor',
    resultHex: '#A855F7',
    color1: 'Kırmızı',
    color1Hex: '#EF4444',
    color2: 'Mavi',
    color2Hex: '#3B82F6',
    emoji: '🍇',
    mnemonic: 'Kırmızı Ateş + Mavi Su = Sihirli Mor!',
  },
];

export const TROPHIES_LIST: Trophy[] = [
  {
    id: 'trophy_starter',
    title: 'Minik Kaşif Kupası',
    description: 'İlk 3 yıldızı toplayarak renk yolculuğuna başladın!',
    icon: '🥉',
    requiredStars: 3,
    unlocked: false,
    type: 'bronze',
  },
  {
    id: 'trophy_primary',
    title: 'Ana Renkler Ustası',
    description: 'Kırmızı, Sarı ve Mavi ana renklerini eksiksiz kavradın!',
    icon: '🥈',
    requiredStars: 8,
    unlocked: false,
    type: 'silver',
  },
  {
    id: 'trophy_chemist',
    title: 'Sihirli Simyacı Kupası',
    description: 'Renk laboratuvarında ara renk karışımlarını başarıyla çözdün!',
    icon: '🥇',
    requiredStars: 15,
    unlocked: false,
    type: 'gold',
  },
  {
    id: 'trophy_champion',
    title: 'Büyük Renk Şampiyonu',
    description: 'Tüm sembolleri, ana ve ara renkleri mükemmel şekilde tamamladın!',
    icon: '🏆',
    requiredStars: 25,
    unlocked: false,
    type: 'diamond',
  },
];

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getShuffledQuestions(): Question[] {
  return shuffleArray(QUIZ_QUESTIONS).map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Aşağıdakilerden hangisi bir "ANA RENK"tir?',
    category: 'type',
    options: [
      { text: 'Yeşil 🍃', hex: '#22C55E', emoji: '🍃', isCorrect: false, explanation: 'Yeşil bir ara renktir (Sarı + Mavi karışımıdır).' },
      { text: 'Kırmızı 🍎', hex: '#EF4444', emoji: '🍎', isCorrect: true, explanation: 'Tebrikler! Kırmızı, doğadaki 3 temel ana renkten biridir.' },
      { text: 'Turuncu 🍊', hex: '#F97316', emoji: '🍊', isCorrect: false, explanation: 'Turuncu bir ara renktir (Kırmızı + Sarı karışımıdır).' },
      { text: 'Mor 🍇', hex: '#A855F7', emoji: '🍇', isCorrect: false, explanation: 'Mor bir ara renktir (Kırmızı + Mavi karışımıdır).' },
    ],
    hint: 'İpucu: Ana renkler doğada kendiliğinden vardır (Kırmızı, Sarı, Mavi).',
  },
  {
    id: 2,
    prompt: 'SARI ☀️ ile MAVİ 💧 renklerini karıştırırsak hangi ARA RENK oluşur?',
    category: 'mix',
    targetColor: 'yesil',
    options: [
      { text: 'Turuncu 🍊', hex: '#F97316', emoji: '🍊', isCorrect: false, explanation: 'Turuncu için Kırmızı ile Sarı gerekir.' },
      { text: 'Mor 🍇', hex: '#A855F7', emoji: '🍇', isCorrect: false, explanation: 'Mor için Kırmızı ile Mavi gerekir.' },
      { text: 'Yeşil 🍃', hex: '#22C55E', emoji: '🍃', isCorrect: true, explanation: 'Harika! Sarı Güneş + Mavi Deniz = Yeşil Doğa!' },
      { text: 'Kırmızı 🍎', hex: '#EF4444', emoji: '🍎', isCorrect: false, explanation: 'Kırmızı bir ana renktir, karışımdan oluşmaz.' },
    ],
    hint: 'İpucu: Çimlerin ve ağaç yapraklarının rengini düşün!',
  },
  {
    id: 3,
    prompt: 'KIRMIZI ❤️ ile SARI ⭐ renkleri birleştiğinde ortaya hangi renk çıkar?',
    category: 'mix',
    targetColor: 'turuncu',
    options: [
      { text: 'Yeşil 🐸', hex: '#22C55E', emoji: '🐸', isCorrect: false, explanation: 'Yeşil, sarı ve mavinin birleşiminden doğar.' },
      { text: 'Turuncu 🥕', hex: '#F97316', emoji: '🥕', isCorrect: true, explanation: 'Süpersin! Kırmızı ve sarının sıcak dansı Turuncuyu oluşturur.' },
      { text: 'Mavi 🌊', hex: '#3B82F6', emoji: '🌊', isCorrect: false, explanation: 'Mavi temel bir ana renktir.' },
      { text: 'Mor 🍆', hex: '#A855F7', emoji: '🍆', isCorrect: false, explanation: 'Mor, kırmızı ve mavinin birleşiminden doğar.' },
    ],
    hint: 'İpucu: Havuç ve portakalın rengini hatırla!',
  },
  {
    id: 4,
    prompt: 'KIRMIZI 🍎 ile MAVİ 💧 renklerini karıştırdığımızda hangi sihirli renk oluşur?',
    category: 'mix',
    targetColor: 'mor',
    options: [
      { text: 'Sarı ☀️', hex: '#FACC15', emoji: '☀️', isCorrect: false, explanation: 'Sarı bir ana renktir.' },
      { text: 'Yeşil 🍀', hex: '#22C55E', emoji: '🍀', isCorrect: false, explanation: 'Yeşil için mavi ile sarı gerekir.' },
      { text: 'Turuncu 🦊', hex: '#F97316', emoji: '🦊', isCorrect: false, explanation: 'Turuncu için kırmızı ile sarı gerekir.' },
      { text: 'Mor 🍇', hex: '#A855F7', emoji: '🍇', isCorrect: true, explanation: 'Mükemmel! Kırmızı ve mavinin karışımı Mor rengini verir.' },
    ],
    hint: 'İpucu: Üzüm ve patlıcanın rengidir!',
  },
  {
    id: 5,
    prompt: 'Hangisi bir "ARA RENK"tir (İki ana rengin karışımıdır)?',
    category: 'type',
    options: [
      { text: 'Kırmızı 🍎', hex: '#EF4444', emoji: '🍎', isCorrect: false, explanation: 'Kırmızı bir Ana Renktir.' },
      { text: 'Turuncu 🍊', hex: '#F97316', emoji: '🍊', isCorrect: true, explanation: 'Doğru! Turuncu, Kırmızı ve Sarı ana renklerinin karışımıdır.' },
      { text: 'Sarı ☀️', hex: '#FACC15', emoji: '☀️', isCorrect: false, explanation: 'Sarı bir Ana Renktir.' },
      { text: 'Mavi 💧', hex: '#3B82F6', emoji: '💧', isCorrect: false, explanation: 'Mavi bir Ana Renktir.' },
    ],
    hint: 'İpucu: Ara renkler = Yeşil, Turuncu, Mor.',
  },
  {
    id: 6,
    prompt: 'Sevimli kurbağa 🐸 ve ağaç yaprakları 🍃 hangi renk grubuna aittir?',
    category: 'symbol',
    options: [
      { text: 'Sarı (Ana Renk) ⭐', hex: '#FACC15', emoji: '⭐', isCorrect: false, explanation: 'Sarı ana renktir fakat yapraklar yeşildir.' },
      { text: 'Kırmızı (Ana Renk) 🍎', hex: '#EF4444', emoji: '🍎', isCorrect: false, explanation: 'Kırmızı ana renktir.' },
      { text: 'Yeşil (Ara Renk) 🍃', hex: '#22C55E', emoji: '🍃', isCorrect: true, explanation: 'Tebrikler! Kurbağa ve yaprak yeşildir, yeşil bir ara renktir.' },
      { text: 'Mor (Ara Renk) 🍇', hex: '#A855F7', emoji: '🍇', isCorrect: false, explanation: 'Patlıcan mordur, kurbağa yeşildir.' },
    ],
    hint: 'İpucu: Doğadaki yeşillikler Sarı + Mavi karışımıdır.',
  },
  {
    id: 7,
    prompt: 'Güneş ☀️ ve Limon 🍋 hangi ana rengin sembolüdür?',
    category: 'symbol',
    options: [
      { text: 'Mavi (Ana Renk) 💧', hex: '#3B82F6', emoji: '💧', isCorrect: false, explanation: 'Mavi gökyüzü ve suyun rengidir.' },
      { text: 'Sarı (Ana Renk) ☀️', hex: '#FACC15', emoji: '☀️', isCorrect: true, explanation: 'Harika! Güneş ve limon parıldayan Sarı ana renktir.' },
      { text: 'Turuncu (Ara Renk) 🍊', hex: '#F97316', emoji: '🍊', isCorrect: false, explanation: 'Turuncu portakalın rengidir.' },
      { text: 'Yeşil (Ara Renk) 🍀', hex: '#22C55E', emoji: '🍀', isCorrect: false, explanation: 'Yeşil yaprakların rengidir.' },
    ],
    hint: 'İpucu: Neşeli ve sıcak ışık saçan ana renktir!',
  },
  {
    id: 8,
    prompt: 'Hangisi sadece ANA RENKLERDEN oluşan gruptur?',
    category: 'type',
    options: [
      { text: 'Yeşil - Turuncu - Mor 🌈', isCorrect: false, explanation: 'Bu üçlü ara renkler grubudur.' },
      { text: 'Kırmızı - Yeşil - Mavi 💡', isCorrect: false, explanation: 'Yeşil ana renk değil, ara renktir.' },
      { text: 'Kırmızı - Sarı - Mavi 🎨', isCorrect: true, explanation: 'Bravo! Bu üç renk doğanın 3 temel ana rengidir.' },
      { text: 'Sarı - Turuncu - Mavi 🎨', isCorrect: false, explanation: 'Turuncu ana renk değil, ara renktir.' },
    ],
    hint: 'İpucu: 3 temel ana renk: Kırmızı, Sarı ve Mavidir.',
  },
  {
    id: 9,
    prompt: 'Üzüm 🍇 ve Patlıcan 🍆 hangi ara rengi temsil eder?',
    category: 'symbol',
    options: [
      { text: 'Yeşil (Sarı + Mavi) 🍃', hex: '#22C55E', emoji: '🍃', isCorrect: false, explanation: 'Yeşil kurbağa ve yapraktır.' },
      { text: 'Turuncu (Kırmızı + Sarı) 🍊', hex: '#F97316', emoji: '🍊', isCorrect: false, explanation: 'Turuncu portakal ve havuçtur.' },
      { text: 'Mor (Kırmızı + Mavi) 🍇', hex: '#A855F7', emoji: '🍇', isCorrect: true, explanation: 'Muazzam! Üzüm ve patlıcan mor ara rengin harika sembolleridir.' },
      { text: 'Mavi (Ana Renk) 💧', hex: '#3B82F6', emoji: '💧', isCorrect: false, explanation: 'Mavi bir ana renktir.' },
    ],
    hint: 'İpucu: Kırmızı ile mavi boyayı karıştırınca elde ettiğimiz asil renktir.',
  },
  {
    id: 10,
    prompt: 'Ressam tuvaline TURUNCU 🍊 yapmak istiyor. Hangi iki tüp boyayı karıştırmalı?',
    category: 'mix',
    targetColor: 'turuncu',
    options: [
      { text: 'Sarı + Mavi 🎨', isCorrect: false, explanation: 'Sarı ve Mavi birleşince Yeşil olur.' },
      { text: 'Kırmızı + Sarı 🎨', isCorrect: true, explanation: 'Tebrikler! Kırmızı ve Sarı boya birleşince Turuncu boya elde edilir.' },
      { text: 'Kırmızı + Mavi 🎨', isCorrect: false, explanation: 'Kırmızı ve Mavi birleşince Mor olur.' },
      { text: 'Yeşil + Mor 🎨', isCorrect: false, explanation: 'İki ara rengi karıştırmak kahverengi tonları verir.' },
    ],
    hint: 'İpucu: Sıcak renkler: Kırmızı ve Sarı!',
  },
];
