<div align="center">
<img width="800" alt="Explorateur Numérique - Application Preview" src="./public/app_banner.png" />
</div>

# 🖥️ Explorateur Numérique - Computer Device

**Explorateur Numérique** est une application web éducative conçue pour les élèves du primaire. Elle permet de découvrir et d'apprendre les noms des composants essentiels d'un ordinateur de manière interactive et ludique.

🌍 **Multilingue** : Entièrement disponible en **Français 🇫🇷**, **Anglais 🇺🇸** et **Arabe 🇲🇦**.

---

## ✨ Fonctionnalités

### 📖 Apprentissage (Learn Mode)
Une interface visuelle où chaque composant est présenté avec son nom, une description simple et des anecdotes amusantes.

### 🖼️ Vue Bureau (Desk View)
Une exploration spatiale d'un bureau virtuel ! Cliquez sur les équipements (écran, clavier, souris, unité centrale, haut-parleurs, imprimante) pour entendre leur nom et voir s'afficher l'étiquette correspondante.

### 🎮 Jeux (Play Mode)
- **Cherche et Trouve** : Un défi de rapidité pour identifier les composants nommés. Les icônes se mélangent après chaque bonne réponse !
- **Jeu de Mémoire** : Pour associer les paires d'équipements tout en écoutant leur prononciation.
- **Mots Mêlés** : Une grille interactive pour retrouver le vocabulaire informatique.
- **Sauve le Robot** : Une version bienveillante du pendu où il faut aider un robot à garder sa batterie en devinant les lettres !

---

## 🛠️ Stack Technique

- **Framework** : [React.js](https://reactjs.org/) avec [Vite](https://vitejs.dev/)
- **Architecture** : Modulaire (Composants séparés pour chaque jeu/vue)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) pour une interface moderne et responsive.
- **Icons** : [Lucide React](https://lucide.dev/)
- **Audio** : [ElevenLabs](https://elevenlabs.io/) pour une synthèse vocale de haute qualité dans les trois langues.
- **Développement** : "Vibe coded" avec l'aide de **Google AI Studio**.
- **Hébergement** : Déployé sur **Vercel**.

---

## 🚀 Installation Locale

### Prérequis
- [Node.js](https://nodejs.org/) (v16+)

### Étapes
1. **Cloner le projet**
   ```bash
   git clone https://github.com/ettakihamza-ma/computer-parts.git
   cd computer-parts
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   Ouvrez votre navigateur sur `http://localhost:3000`.

---

## 🤝 Contribution
Ce projet est open-source. N'hésitez pas à proposer des améliorations, des nouveaux jeux ou des corrections de traduction via des Pull Requests !

---

## 📝 Historique des Versions

### Version 1.4 (13/02/2026)
**Refactoring Majeur & Améliorations UX**
- 🏗️ **Architecture Modulaire** : Refonte complète du code (`App.tsx` scindé en multiples composants) pour une meilleure maintenabilité et évolutivité.
- 🟡 **Amélioration Mots Mêlés** : Les lettres partagées entre deux mots s'affichent désormais en jaune (mélange vert/orange) pour éviter la confusion.
- ✅ **Validation Intelligente** : Le jeu Mots Mêlés ne signale plus une erreur prématurément tant que la sélection reste une possibilité valide (préfixe d'un mot).
- 🧹 **Nettoyage de Code** : Suppression du code mort et optimisation des imports.

### Version 1.3 (12/02/2026)
**Corrections et Améliorations :**
- � **Correctif Mots Mêlés (critique)** : La sélection de lettres s'accumulait indéfiniment et bloquait la validation des mots.
- � **Feedback visuel** : Ajout d'un flash rouge quand une sélection est incorrecte.
- � **Mélange Cherche et Trouve** : Les icônes sont mélangées après chaque bonne réponse.
- � **Son** : Ajout de l'audio `good_answer` dans le jeu Cherche et Trouve.

### Version 1.2 (10/02/2026)
**Nouveautés et Améliorations :**
- 🕒 **Timers de Jeu** : Ajout d'un chronomètre.
- 🏷️ **Nouveau Titre** : "Explorateur Numérique".
- 🐛 **Correctifs Mots Mêlés** : Support complet des noms arabes.

### Version 1.1 (09/02/2026)
**Améliorations du support de la langue arabe :**
- ✅ Ajout des lettres arabes manquantes.
- ✅ Correction de l'affichage RTL.

---

## ❤️ Crédits
Développé avec passion par **Hamza Ettaki**.  
Retrouvez-moi sur LinkedIn : [linkedin.com/in/ettaki/](https://www.linkedin.com/in/ettaki/)

---
*Ce projet a été réalisé en utilisant des outils d'IA générative pour accélérer le développement et la création de contenu (Vibe Coding).*
