import React, { useEffect, useRef } from 'react';
import './Components.css';

const GameGrid = ({ currentGuess, rowIndex, guessHistory }) => {
    
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.guess')).slice(-5);
  
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('flip');
        if (element.classList.contains('correct')) {
          if (!element.classList.contains('correct-position')) {
            element.classList.add('correct-position');
          }
        } else if (element.classList.contains('exists')) {
          if (!element.classList.contains('exists-position')) {
            element.classList.add('exists-position');
          }
        } else if (element.classList.contains('notExists')) {
          if (!element.classList.contains('not-exists')) {
            element.classList.add('not-exists');
          }
        }
      }, index * 250); 
    });
  }, [guessHistory]);
  
    const renderGrid = () => {
        const grid = [];
        for (let row = 1; row <= 6; row++) {
          const rowTiles = [];
          for (let col = 1; col <= 5; col++) {
            if (row === rowIndex) {
              if (col <= currentGuess.length) {
                const letter = currentGuess[col - 1];
                rowTiles.push(
                  <div className="gridCol animated" key={`col-${col}`}>
                    {letter}
                  </div>
                );
              } else {
                rowTiles.push(<div className="gridCol" key={`col-${col}`} />);
              }
            } else if (row < rowIndex && guessHistory.length >= row) {
                const previousGuess = guessHistory[row - 1];
                const letter = previousGuess.guess[col - 1];
                const flag = previousGuess.flags[col - 1];
        
                let className = 'gridCol';
                if (flag === 'correct') {
                  className += ' guess correct';
                } else if (flag === 'exists') {
                  className += ' guess exists';
                } else {
                    className += ' guess notExists'
                }
        
                rowTiles.push(
                  <div className={className} key={`col-${col}`}>
                    {letter}
                  </div>
                );
              } else {
                rowTiles.push(<div className="gridCol" key={`col-${col}`} />);
              }
            }
            grid.push(
              <div className="gridRow" key={`row-${row}`}>
                {rowTiles}
              </div>
            );
          }
        
          return grid;
        };
      

  return <div className="gridContainer">{renderGrid()}</div>;
};

export default GameGrid;
