import React, { useState, useEffect } from 'react';
import Keyboard from '../Components/Keyboard';
import GameGrid from '../Components/GameGrid';
import './screens.css';

const GameScreen = ({targetWord, setGameState, setWinLose, rowIndex, setRowIndex, currentGuess, setCurrentGuess, guessHistory, setGuessHistory, lettersGuessed, setLettersGuessed, lettersCorrect, setLettersCorrect, lettersPosition, setLettersPosition}) => {
  const [errors, setErrors] = useState(null);
  const tryGuess = async () => {
    if (currentGuess.length <= 4) {
      setErrors('Not Enough Letters');
      setTimeout(() => {
        const errorDiv = document.getElementById('errorDiv');
        errorDiv.classList.add('fade-out');
        setTimeout(() => {
          setErrors(null);
        }, 100);
      }, 1000);
    } else if (currentGuess.length > 4) {
      try {
        const response = await fetch(`https://api.datamuse.com/words?sp=${currentGuess}`);
        const data = await response.json();
        if (data[0].word === currentGuess) {
          const targetChars = targetWord.toLowerCase().split('');
          const guessChars = currentGuess.toLowerCase().split('');
          const flags = Array(5).fill('');
          const correctIndices = [];
          for (let i = 0; i < 5; i++) {
            if (targetChars[i] === guessChars[i]) {
              flags[i] = 'correct'; 
              setLettersCorrect((prevLetter) => [...prevLetter, guessChars[i]])
              correctIndices.push( guessChars[i])
            }
          }
          for (let i = 0; i < 5; i++) {
            if (targetChars.includes(guessChars[i])) {
              if (!correctIndices.includes(guessChars[i])) {
                flags[i] = 'exists'; 
                setLettersPosition((prevLetter) => [...prevLetter, guessChars[i]])
              }
            } else {
              setLettersGuessed((prevLetter) => [...prevLetter, guessChars[i]])
            }
          }
          setGuessHistory((prevHistory) => [...prevHistory, { guess: currentGuess, flags }]);
          setCurrentGuess('');
          setRowIndex(rowIndex + 1);
          if (currentGuess === targetWord) {
            setTimeout(() => {
              setGameState('end')
              setWinLose('Won')
            }, 1000);
          } else if (rowIndex === 6) {
            setTimeout(() => {
              setGameState('end')
              setWinLose('Loss')
            }, 1000);
          }
        } else {
          setErrors('Not A Real Word');
          setTimeout(() => {
            const errorDiv = document.getElementById('errorDiv');
            errorDiv.classList.add('fade-out');
            setTimeout(() => {
              setErrors(null);
            }, 100);
          }, 1000);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div className='gameContainer'>
      <h1 className="white">Wordle</h1>
      <GameGrid currentGuess={currentGuess} rowIndex={rowIndex} guessHistory={guessHistory} />
      <Keyboard 
        currentGuess={currentGuess} 
        setCurrentGuess={setCurrentGuess} 
        tryGuess={tryGuess} 
        guessHistory={guessHistory} 
        lettersGuessed={lettersGuessed}
        lettersCorrect={lettersCorrect}
        lettersPosition={lettersPosition}
      />
      {errors != null && (
        <div id='errorDiv' className='error-message'>
          {errors}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
