import React, { useState } from 'react';
import './screens.css';
import { useSpring, animated } from 'react-spring';

const WelcomeScreen = ({ fetchTargetWord, winLose, rowIndex, targetWord, setCurrentGuess, setGuessHistory, setLettersGuessed, setLettersCorrect, setLettersPosition, setRowIndex, setWinLose }) => {
    const handleRestart = () => {
        setCurrentGuess('') 
        setGuessHistory([]) 
        setLettersGuessed([]) 
        setLettersCorrect([]) 
        setLettersPosition([]) 
        setRowIndex(1)
        setWinLose(null)
        fetchTargetWord();
    }
  return (
    <div> 
        {winLose == 'Won' && (
            <div className='endModal'>
                <h2 className="white">Congratulations!</h2>
                <div className='subMessage'>You Win!</div>
                <div className='subMessage'>It took you {rowIndex - 1} guesses to guess that the target word was {targetWord}</div>
                <button className='playAgain' onClick={handleRestart}>Play Again</button>
            </div>
        )}
        {winLose == 'Loss' && (
            <div className='endModal'>
                <h1 className="white">Better Luck Next Time</h1>
                <div className='subMessage'>You've used all {rowIndex - 1} guesses. The target word was {targetWord}</div>
                <button className='playAgain' onClick={handleRestart}>Play Again</button>
            </div>
        )}
    </div>
  );
};

export default WelcomeScreen;
