import React, { useState, useEffect } from 'react';
import './Components.css';

const Keyboard = ({ currentGuess, setCurrentGuess, tryGuess, guessHistory, lettersGuessed, lettersCorrect, lettersPosition }) => {
  const handleKeyPress = (key) => {
    setCurrentGuess((prevGuess) => {
        const newGuess = prevGuess + key;
        return newGuess.slice(0, 5); 
      });
  };

  const handleBackspace = () => {
    setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
  };

  const handleSubmission = () => {
    tryGuess();
  };
  const keyRowOne = ['q','w','e','r','t','y','u','i','o','p']
  const keyRowTwo = ['a','s','d','f','g','h','j','k','l']
  const keyRowThree = ['z','x','c','v','b','n','m']
  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
      const keyPressed = event.key.toLowerCase();
      switch (keyPressed) {
        case 'backspace':
          handleBackspace();
          break;
        case 'enter':
          handleSubmission();
          break;
        case 'q':
        case 'w':
        case 'e':
        case 'r':
        case 't':
        case 'y':
        case 'u':
        case 'i':
        case 'o':
        case 'p':
        case 'a':
        case 's':
        case 'd':
        case 'f':
        case 'g':
        case 'h':
        case 'j':
        case 'k':
        case 'l':
        case 'z':
        case 'x':
        case 'c':
        case 'v':
        case 'b':
        case 'n':
        case 'm':
          handleKeyPress(keyPressed);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);

    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, [currentGuess]);

  return (
    <div className="qwerty-keyboard">
      <div className="button-row">
        {keyRowOne.map((letter)=>(
            <button className={`button ${lettersGuessed.includes(letter) ? 'not-exists' : ''} ${lettersCorrect.includes(letter) ? 'correct-position' : ''} ${lettersPosition.includes(letter) ? 'exists-position' : ''}`}
            onClick={() => handleKeyPress(letter)}>
                {letter}
            </button>
        ))}
      </div>
      <div className="button-row">
        {keyRowTwo.map((letter)=>(
            <button className={`button ${lettersGuessed.includes(letter) ? 'not-exists' : ''} ${lettersCorrect.includes(letter) ? 'correct-position' : ''} ${lettersPosition.includes(letter) ? 'exists-position' : ''}`}
            onClick={() => handleKeyPress(letter)}>
                {letter}
            </button>
        ))}
      </div>
      <div className="button-row">
        <button className="button" onClick={handleSubmission}>
          ENTER
        </button>
        {keyRowThree.map((letter)=>(
            <button className={`button ${lettersGuessed.includes(letter) ? 'not-exists' : ''} ${lettersCorrect.includes(letter) ? 'correct-position' : ''} ${lettersPosition.includes(letter) ? 'exists-position' : ''}`}
            onClick={() => handleKeyPress(letter)}>
                {letter}
            </button>
        ))}
        <button className="button" onClick={handleBackspace}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            className="game-icon"
            data-testid="icon-backspace"
          >
            <path
              fill="white"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
