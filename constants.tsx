import { ComputerPart, ComponentType, ComputerLevel } from './types';
import { Monitor, Keyboard, Mouse, Speaker, Printer, Cpu, HardDrive, CircuitBoard, Calculator, Battery, Fan, Box, MemoryStick, Gamepad2 } from 'lucide-react';

export const EXTERNAL_PARTS: ComputerPart[] = [
  {
    id: 'monitor',
    name: {
      fr: 'Écran',
      en: 'Screen',
      ar: 'شاشة'
    },

    action: 'Voir',
    description: {
      fr: "C'est comme une télé pour l'ordinateur.",
      en: "It's like a TV for the computer.",
      ar: "إنها مثل التلفاز للحاسوب."
    },
    facts: {
      fr: [
        "Il te permet de voir tes dessins et tes photos.",
        "C'est grâce à lui que tu peux regarder des dessins animés.",
        "Il s'allume pour te montrer ce que fait l'ordinateur.",
        "Ne mets pas tes doigts dessus pour le garder propre !"
      ],
      en: [
        "It lets you see your drawings and photos.",
        "You can watch cartoons on it.",
        "It lights up to show you what the computer is doing."
      ],
      ar: [
        "تسمح لك برؤية رسوماتك وصورك.",
        "بفضلها يمكنك مشاهدة الرسوم المتحركة.",
        "تضيء لتريك ما يفعله الحاسوب."
      ]
    },
    type: ComponentType.OUTPUT,
    iconName: 'Monitor',
    color: 'bg-blue-400'
  },
  {
    id: 'keyboard',
    name: {
      fr: 'Clavier',
      en: 'Keyboard',
      ar: 'لوحة المفاتيح'
    },
    wordSearchName: {
      fr: 'Clavier',
      en: 'Keyboard',
      ar: 'مفاتيح'
    },
    action: 'Taper',
    description: {
      fr: "Il sert à écrire des lettres et des chiffres.",
      en: "Used to write letters and numbers.",
      ar: "تستخدم لكتابة الحروف والأرقام."
    },
    facts: {
      fr: [
        "Tu peux l'utiliser pour écrire ton prénom.",
        "Il a toutes les lettres de l'alphabet, de A à Z.",
        "La plus grande touche s'appelle la barre d'espace.",
        "C'est comme le stylo de l'ordinateur."
      ],
      en: [
        "You can use it to write your name.",
        "It has all the letters from A to Z.",
        "The biggest button is the space bar."
      ],
      ar: [
        "يمكنك استخدامه لكتابة اسمك.",
        "يحتوي على جميع الحروف والأرقام.",
        "أكبر زر يسمى زر المسافة."
      ]
    },
    type: ComponentType.INPUT,
    iconName: 'Keyboard',
    color: 'bg-green-400'
  },
  {
    id: 'mouse',
    name: {
      fr: 'Souris',
      en: 'Mouse',
      ar: 'فأرة'
    },
    wordSearchName: {
      fr: 'Souris',
      en: 'Mouse',
      ar: 'فارة'
    },
    action: 'Déplacer',
    description: {
      fr: "Elle sert à cliquer sur les images.",
      en: "Used to click on pictures.",
      ar: "تستخدم للنقر على الصور."
    },
    facts: {
      fr: [
        "Elle déplace la petite flèche sur l'écran.",
        "Quand tu bouges la souris avec ta main, la flèche bouge aussi.",
        "On clique sur ses boutons pour choisir des jeux.",
        "Elle a souvent une petite lumière rouge en dessous."
      ],
      en: [
        "It moves the little arrow on the screen.",
        "When you move your hand, the arrow moves too.",
        "You click its buttons to choose games."
      ],
      ar: [
        "تحرك السهم الصغير على الشاشة.",
        "عندما تحرك يدك، يتحرك السهم أيضاً.",
        "ننقر على أزرارها لاختيار الألعاب."
      ]
    },
    type: ComponentType.INPUT,
    iconName: 'Mouse',
    color: 'bg-yellow-400'
  },
  {
    id: 'tower',
    name: {
      fr: 'Unité Centrale',
      en: 'Central Unit',
      ar: 'الوحدة المركزية'
    },
    wordSearchName: {
      fr: 'Centrale',
      en: 'Unit',
      ar: 'مركزية'
    },
    action: 'Réfléchir',
    description: {
      fr: "C'est le cerveau qui fait tout fonctionner.",
      en: "It's the brain that runs everything.",
      ar: "إنها العقل الذي يشغل كل شيء."
    },
    facts: {
      fr: [
        "C'est le boîtier qui réfléchit pour faire marcher l'ordinateur.",
        "C'est le chef qui commande l'écran et le clavier.",
        "On appuie sur son bouton pour allumer l'ordinateur.",
        "C'est elle qui calcule tout ce qui se passe dans tes jeux."
      ],
      en: [
        "It is the brain of the computer.",
        "You plug the keyboard and mouse here.",
        "There is a button to turn on the computer."
      ],
      ar: [
        "إنها العقل المدبر للحاسوب.",
        "هنا نربط لوحة المفاتيح والفأرة.",
        "يوجد زر لتشغيل الحاسوب هنا.",
        "إنها تحسب كل ما يحدث في ألعابك."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'Box',
    color: 'bg-purple-400'
  },
  {
    id: 'speakers',
    name: {
      fr: 'Haut-parleurs',
      en: 'Speakers',
      ar: 'مكبرات الصوت'
    },
    wordSearchName: {
      fr: 'Parleurs',
      en: 'Speakers',
      ar: 'مكبرات'
    },
    action: 'Écouter',
    description: {
      fr: "C'est par ici que sort le son.",
      en: "The sound comes from here.",
      ar: "منه يخرج الصوت والموسيقى."
    },
    facts: {
      fr: [
        "Ils te permettent d'entendre la musique des jeux.",
        "Tu peux monter ou baisser le volume.",
        "C'est par ici que sort le son de l'ordinateur.",
        "Sans eux, tu n'entendrais rien du tout !"
      ],
      en: [
        "They let you hear music from games.",
        "You can turn the volume up or down.",
        "The computer sound comes out of them."
      ],
      ar: [
        "يسمح لك بسماع الموسيقى من الألعاب.",
        "يمكنك رفع أو خفض الصوت.",
        "منه يخرج صوت الحاسوب."
      ]
    },
    type: ComponentType.OUTPUT,
    iconName: 'Speaker',
    color: 'bg-orange-400'
  },
  {
    id: 'printer',
    name: {
      fr: 'Imprimante',
      en: 'Printer',
      ar: 'طابعة'
    },

    action: 'Imprimer',
    description: {
      fr: "Elle sort tes dessins sur du papier.",
      en: "Prints your drawings on paper.",
      ar: "تطبع رسوماتك على الورق."
    },
    facts: {
      fr: [
        "Elle met l'image de l'écran sur une feuille.",
        "Elle a besoin d'encre et de papier pour travailler.",
        "Attention, ça ne va pas aussi vite que l'écran !",
        "Tu peux imprimer tes coloriages avec elle."
      ],
      en: [
        "It puts the screen image on paper.",
        "It needs ink and paper to work.",
        "You can print your coloring pages with it."
      ],
      ar: [
        "تضع صورة الشاشة على الورق.",
        "تحتاج إلى حبر وورق لتعمل.",
        "يمكنك طباعة رسوماتك بها."
      ]
    },
    type: ComponentType.OUTPUT,
    iconName: 'Printer',
    color: 'bg-pink-400'
  }
];

export const INTERNAL_PARTS: ComputerPart[] = [
  {
    id: 'motherboard',
    name: {
      fr: 'Carte Mère',
      en: 'Motherboard',
      ar: 'اللوحة الأم'
    },
    wordSearchName: {
      fr: 'Carte',
      en: 'Carte',
      ar: 'لوحة'
    },
    action: 'Connecter',
    description: {
      fr: "C'est la grande planche verte où tout est branché.",
      en: "It's the big green board where everything connects.",
      ar: "إنها اللوحة الكبيرة التي يربط فيها كل شيء."
    },
    facts: {
      fr: [
        "Elle relie tous les composants entre eux, comme des routes dans une ville.",
        "Sans elle, le processeur ne pourrait pas parler à la mémoire.",
        "C'est la plus grande pièce à l'intérieur de l'ordinateur."
      ],
      en: [
        "It connects all parts together like roads in a city.",
        "Without it, parts cannot talk to each other.",
        "It is the biggest part inside the computer."
      ],
      ar: [
        "تربط جميع الأجزاء ببعضها مثل الطرق في المدينة.",
        "بدونها لا تستطيع الأجزاء التحدث مع بعضها.",
        "إنها أكبر قطعة داخل الحاسوب."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'CircuitBoard',
    color: 'bg-emerald-500'
  },
  {
    id: 'cpu',
    name: {
      fr: 'Processeur',
      en: 'Processor (CPU)',
      ar: 'المعالج'
    },
    wordSearchName: {
      fr: 'Processeur',
      en: 'CPU',
      ar: 'معالج'
    },
    action: 'Calculer',
    description: {
      fr: "C'est le véritable cerveau de l'ordinateur.",
      en: "It is the real brain of the computer.",
      ar: "إنه العقل الحقيقي للحاسوب."
    },
    facts: {
      fr: [
        "Il fait des milliards de calculs chaque seconde.",
        "Il est tout petit mais très puissant.",
        "Il chauffe beaucoup quand il travaille, c'est pour ça qu'il a un ventilateur.",
        "C'est lui qui décide ce que l'écran doit afficher."
      ],
      en: [
        "It does billions of calculations every second.",
        "It gets hot when working.",
        "It is the boss of the computer."
      ],
      ar: [
        "يقوم بملايين العمليات الحسابية في الثانية.",
        "يصبح ساخناً عند العمل.",
        "إنه رئيس الحاسوب."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'Cpu',
    color: 'bg-blue-600'
  },
  {
    id: 'ram',
    name: {
      fr: 'Mémoire Vive (RAM)',
      en: 'RAM Memory',
      ar: 'الذاكرة العشوائية'
    },
    wordSearchName: {
      fr: 'Mémoire',
      en: 'RAM',
      ar: 'ذاكرة'
    },
    action: 'Mémoriser',
    description: {
      fr: "C'est la table de travail du processeur.",
      en: "It's the processor's work desk.",
      ar: "إنها طاولة عمل المعالج."
    },
    facts: {
      fr: [
        "Elle garde les informations dont l'ordinateur a besoin tout de suite.",
        "Quand on éteint l'ordinateur, elle oublie tout !",
        "Plus il y a de RAM, plus l'ordinateur peut faire de choses en même temps."
      ],
      en: [
        "It holds info the computer needs right now.",
        "It forgets everything when you turn off the computer.",
        "More RAM means doing more things at once."
      ],
      ar: [
        "تحفظ المعلومات التي يحتاجها الحاسوب الآن.",
        "تنسى كل شيء عند إطفاء الحاسوب.",
        "المزيد من الذاكرة يعني القيام بمهام أكثر."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'MemoryStick',
    color: 'bg-green-500'
  },
  {
    id: 'hdd',
    name: {
      fr: 'Disque Dur',
      en: 'Hard Drive',
      ar: 'القرص الصلب'
    },
    wordSearchName: {
      fr: 'Disque',
      en: 'Drive',
      ar: 'قرص'
    },
    action: 'Stocker',
    description: {
      fr: "C'est la bibliothèque où sont rangés tous tes fichiers.",
      en: "It's the library where all your files are kept.",
      ar: "إنها المكتبة التي تحفظ فيها كل ملفاتك." // Corrected translation
    },
    facts: {
      fr: [
        "Il garde tes photos et tes jeux même quand l'ordinateur est éteint.",
        "C'est comme un grand placard pour ranger des milliers de livres.",
        "Il peut stocker beaucoup plus d'informations que la mémoire vive."
      ],
      en: [
        "It keeps your data even when power is off.",
        "Like a big closet for files.",
        "It stores much more than RAM."
      ],
      ar: [
        "يحفظ بياناتك حتى عند انقطاع الكهرباء.",
        "مثل خزانة كبيرة للملفات.",
        "يخزن أكثر بكثير من الذاكرة العشوائية."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'HardDrive',
    color: 'bg-indigo-500'
  },
  {
    id: 'gpu',
    name: {
      fr: 'Carte Graphique',
      en: 'Graphics Card',
      ar: 'بطاقة الرسومات'
    },
    wordSearchName: {
      fr: 'Graphique',
      en: 'GPU',
      ar: 'رسومات'
    },
    action: 'Dessiner',
    description: {
      fr: "C'est l'artiste qui dessine les images à l'écran.",
      en: "It's the artist that draws images on screen.",
      ar: "إنه الفنان الذي يرسم الصور على الشاشة."
    },
    facts: {
      fr: [
        "Elle est très importante pour les jeux vidéo en 3D.",
        "Elle aide le processeur à afficher de belles images.",
        "Les ordinateurs de jeux ont souvent de très grosses cartes graphiques."
      ],
      en: [
        "Very important for 3D games.",
        "It helps show beautiful pictures.",
        "Gaming PCs have big graphics cards."
      ],
      ar: [
        "مهمة جداً للألعاب ثلاثية الأبعاد.",
        "تساعد في عرض صور جميلة.",
        "حواسيب الألعاب تملك بطاقات قوية."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'Gamepad2',
    color: 'bg-red-500'
  },
  {
    id: 'psu',
    name: {
      fr: 'Alimentation',
      en: 'Power Supply',
      ar: 'مزود الطاقة'
    },
    wordSearchName: {
      fr: 'Aliment',
      en: 'Power',
      ar: 'طاقة'
    },
    action: 'Nourrir',
    description: {
      fr: "Elle donne l'électricité à tous les composants.",
      en: "It gives electricity to all parts.",
      ar: "يمد جميع الأجزاء بالكهرباء."
    },
    facts: {
      fr: [
        "Elle transforme le courant de la prise pour l'ordinateur.",
        "Sans elle, rien ne s'allume.",
        "Il y a beaucoup de câbles qui sortent d'elle."
      ],
      en: [
        "Takes power from the wall.",
        "Without it, nothing turns on.",
        "Has many cables coming out."
      ],
      ar: [
        "يأخذ الطاقة من الحائط.",
        "بدونه لا يعمل شيء.",
        "يخرج منه الكثير من الأسلاك."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'Battery',
    color: 'bg-yellow-500'
  },
  {
    id: 'fan',
    name: {
      fr: 'Ventilateur',
      en: 'Fan',
      ar: 'مروحة'
    },
    wordSearchName: {
      fr: 'Ventilo',
      en: 'Fan',
      ar: 'مروحة'
    },
    action: 'Refroidir',
    description: {
      fr: "Il garde l'ordinateur au frais.",
      en: "It keeps the computer cool.",
      ar: "تبقي الحاسوب بارداً."
    },
    facts: {
      fr: [
        "Il tourne très vite pour chasser l'air chaud.",
        "C'est lui qui fait du bruit 'vvvvvv' quand l'ordi travaille fort.",
        "Le processeur a toujours besoin d'un ventilateur ou d'un radiateur."
      ],
      en: [
        "Spins fast to push hot air away.",
        "Makes the humming noise.",
        "Essential for the processor."
      ],
      ar: [
        "تدور بسرعة لطرد الهواء الساخن.",
        "تصدر صوت الطنين.",
        "ضرورية للمعالج."
      ]
    },
    type: ComponentType.PROCESSING,
    iconName: 'Fan',
    color: 'bg-cyan-500'
  }
];

export const getIcon = (name: string, size: number = 24, className: string = '') => {
  const props = { size, className };
  switch (name) {
    case 'Monitor': return <Monitor {...props} />;
    case 'Keyboard': return <Keyboard {...props} />;
    case 'Mouse': return <Mouse {...props} />;
    case 'Speaker': return <Speaker {...props} />;
    case 'Printer': return <Printer {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Box': return <Box {...props} />;
    case 'HardDrive': return <HardDrive {...props} />;
    case 'CircuitBoard': return <CircuitBoard {...props} />;
    case 'MemoryStick': return <MemoryStick {...props} />;
    case 'Battery': return <Battery {...props} />;
    case 'Fan': return <Fan {...props} />;
    case 'Gamepad2': return <Gamepad2 {...props} />;
    default: return <Monitor {...props} />;
  }
};

export const getPartsForLevel = (level: ComputerLevel): ComputerPart[] => {
  return level === 'internal' ? INTERNAL_PARTS : EXTERNAL_PARTS;
};