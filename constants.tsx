import { ComputerPart, ComponentType } from './types';
import { Monitor, Keyboard, Mouse, Speaker, Printer, Cpu } from 'lucide-react';

export const COMPUTER_PARTS: ComputerPart[] = [
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
    iconName: 'Cpu',
    color: 'bg-purple-400'
  },
  {
    id: 'speakers',
    name: {
      fr: 'Haut-parleurs',
      en: 'Speakers',
      ar: 'مكبرات الصوت'
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

export const getIcon = (name: string, size: number = 24, className: string = '') => {
  const props = { size, className };
  switch (name) {
    case 'Monitor': return <Monitor {...props} />;
    case 'Keyboard': return <Keyboard {...props} />;
    case 'Mouse': return <Mouse {...props} />;
    case 'Speaker': return <Speaker {...props} />;
    case 'Printer': return <Printer {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    default: return <Monitor {...props} />;
  }
};