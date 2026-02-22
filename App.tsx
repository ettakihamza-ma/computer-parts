import React, { useState } from 'react';
import { AppView, ComputerLevel, Language } from './types';
import { EXTERNAL_PARTS, INTERMEDIATE_PARTS, getPartsForLevel } from './constants';
import { LevelSelection } from './components/LevelSelection';
import { HomeView } from './components/HomeView';
import { PlayMenu } from './components/PlayMenu';
import { LearnMode } from './components/LearnMode';
import { FindGame } from './components/FindGame';
import { MemoryGame } from './components/MemoryGame';
import { WordSearchGame } from './components/WordSearchGame';
import { SaveTheRobotGame } from './components/SaveTheRobotGame';
import { InputOutputGame } from './components/InputOutputGame';
import { DeskView } from './components/DeskView';
import { InternalView } from './components/InternalView';
import { PeripheralsView } from './components/PeripheralsView';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<ComputerLevel | null>(null);
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [language, setLanguage] = useState<Language>('fr');

  const currentParts = currentLevel ? getPartsForLevel(currentLevel) : EXTERNAL_PARTS;

  const handleLevelSelect = (level: ComputerLevel) => {
    setCurrentLevel(level);
    setView(AppView.HOME);
  };

  const goLevelSelection = () => {
    setCurrentLevel(null);
    setView(AppView.HOME);
  };

  const goHome = () => setView(AppView.HOME);
  const goPlayMenu = () => setView(AppView.PLAY_MENU);

  if (!currentLevel) {
    return <LevelSelection language={language} setLanguage={setLanguage} onSelectLevel={handleLevelSelect} />;
  }

  switch (view) {
    case AppView.HOME:
      return (
        <HomeView
          language={language}
          setLanguage={setLanguage}
          currentLevel={currentLevel}
          onNavigate={setView}
          onBack={goLevelSelection}
        />
      );
    case AppView.PLAY_MENU:
      return (
        <PlayMenu
          language={language}
          onNavigate={setView}
          onBack={goHome}
        />
      );
    case AppView.LEARN:
      return (
        <LearnMode
          parts={currentParts}
          language={language}
          onBack={goHome}
        />
      );
    case AppView.GAME_FIND:
      return (
        <FindGame
          parts={currentParts}
          language={language}
          onBack={goPlayMenu}
        />
      );
    case AppView.GAME_MEMORY:
      return (
        <MemoryGame
          parts={currentParts}
          language={language}
          onBack={goPlayMenu}
        />
      );
    case AppView.GAME_WORDSEARCH:
      return (
        <WordSearchGame
          parts={currentParts}
          language={language}
          onBack={goPlayMenu}
        />
      );
    case AppView.GAME_ROBOT:
      return (
        <SaveTheRobotGame
          parts={currentParts}
          language={language}
          onBack={goPlayMenu}
        />
      );
    case AppView.GAME_INPUT_OUTPUT:
      // Combine EXTERNAL + INTERMEDIATE for the sorting game to have enough items
      const combinedParts = [...EXTERNAL_PARTS, ...INTERMEDIATE_PARTS];
      return (
        <InputOutputGame
          parts={combinedParts}
          language={language}
          onBack={goPlayMenu}
        />
      );
    case AppView.DESK:
      if (currentLevel === 'internal') {
        return <InternalView parts={currentParts} language={language} onBack={goHome} />;
      }
      if (currentLevel === 'intermediate') {
        return <PeripheralsView parts={currentParts} language={language} onBack={goHome} />;
      }
      return <DeskView parts={currentParts} language={language} onBack={goHome} />;
    default:
      return null;
  }
}