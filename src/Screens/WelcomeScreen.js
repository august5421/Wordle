import React, { useState } from 'react';
import './screens.css';
import { useSpring, animated } from 'react-spring';

const WelcomeScreen = ({ setGameState }) => {
  const [isOffscreen, setIsOffscreen] = useState(false);
  const handleStart = () => {
    setIsOffscreen(!isOffscreen);
    
  }
  const slideAnimation = useSpring({
    transform: isOffscreen ? 'translateY(100%)' : 'translateY(0%)',
    config: { tension: 200, friction: 20 },
    onRest: () => {
        if (isOffscreen) {
            setGameState('game');
        }
      },
  });

  return (
    <animated.div style={slideAnimation} className='welcomeContainer'>
      <span className="heading">Wordle</span>
      <span className="message">Get 6 chances to guess a 5-letter word.</span>
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </animated.div>
  );
};

export default WelcomeScreen;
