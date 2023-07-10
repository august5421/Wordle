import React, { useState, useEffect } from 'react';
import WelcomeScreen from './Screens/WelcomeScreen';
import './App.css';
import GameScreen from './Screens/GameScreen';
import EndingScreen from './Screens/EndingScreen';

const App = () => {
  const [gameState, setGameState] = useState('welcome');
  const [winLose, setWinLose] = useState(null);
  const [rowIndex, setRowIndex] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [lettersCorrect, setLettersCorrect] = useState([]);
  const [lettersPosition, setLettersPosition] = useState([]);
  const [targetWord, setTargetWord] = useState('');

  const fetchTargetWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
      if (!response.ok) {
        throw new Error('Failed to fetch target word');
      }
      const data = await response.json();
      setTargetWord(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTargetWord();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <GameScreen
          targetWord={targetWord}
          setGameState={setGameState}
          setWinLose={setWinLose}
          setRowIndex={setRowIndex}
          rowIndex={rowIndex}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          guessHistory={guessHistory}
          setGuessHistory={setGuessHistory}
          lettersGuessed={lettersGuessed}
          setLettersGuessed={setLettersGuessed}
          lettersCorrect={lettersCorrect}
          setLettersCorrect={setLettersCorrect}
          lettersPosition={lettersPosition}
          setLettersPosition={setLettersPosition}
        />
        {gameState === 'welcome' && (
          <WelcomeScreen setGameState={setGameState} />
        )}
        {gameState === 'end' && (
          <EndingScreen
            targetWord={targetWord}
            setGameState={setGameState}
            setWinLose={setWinLose}
            winLose={winLose}
            setRowIndex={setRowIndex}
            rowIndex={rowIndex}
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            guessHistory={guessHistory}
            setGuessHistory={setGuessHistory}
            lettersGuessed={lettersGuessed}
            setLettersGuessed={setLettersGuessed}
            lettersCorrect={lettersCorrect}
            setLettersCorrect={setLettersCorrect}
            lettersPosition={lettersPosition}
            setLettersPosition={setLettersPosition}
            fetchTargetWord={fetchTargetWord}
          />
        )}
      </div>
    </div>
  );
};

export default App;
