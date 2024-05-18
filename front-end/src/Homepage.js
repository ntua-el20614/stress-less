import React, { useState, useEffect } from 'react';
import BreathingExercise from './BreathingEx';
import TetrisMain from './tetris/main';
import brbImage from './img/brb.png';
import logo from './img/favicon.ico';
import GameBoard from './memgame/GameBoard';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = ({ onLogin }) => {
  const navigate = useNavigate();
  const logoStyle = {
    height: '4rem',
    marginLeft: '0.5rem',
  };

  const user = Cookies.get('userId');
  if (user && user !== 'null') {
    return (
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h1><img style={logoStyle} src={logo} alt="Logo" /> StressLess </h1>
        <button onClick={() => { Cookies.remove('userId'); navigate('/'); }} style={{ padding: '0.5rem 1rem', cursor: 'pointer', width: '100px', height: '30px' }}>
          Logout
        </button>
      </header>
    );
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1><img style={logoStyle} src={logo} alt="Logo" /> StressLess </h1>
      <button onClick={() => navigate('/login')} style={{ padding: '0.5rem 1rem', cursor: 'pointer', width: '100px', height: '30px' }}>
        Login
      </button>
    </header>
  );
};

function Homepage() {  const [activeExercise, setActiveExercise] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stressLevelBefore, setStressLevelBefore] = useState('');
  const [stressLevelAfter, setStressLevelAfter] = useState('');
  const [gamePlayed, setGamePlayed] = useState(false);  // Tracks if a game has been played
  const user = Cookies.get('userId');
  console.log('Game played:', gamePlayed);
  useEffect(() => {
    let chance = Math.random()<0.4;
    console.log('Game played:', gamePlayed, 'Chance:', chance);
    if (gamePlayed && chance) {
      setShowFeedback(true);
      setGamePlayed(false);  // Reset the game played flag
      setActiveExercise(null); // Clears the current game view
    }
  }, [activeExercise, gamePlayed, user]);


  const endSession = async () => {
    if (sessionID) {
      try {
        await fetch('http://localhost:1022/gamesess/end', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionID })
        });
      } catch (error) {
        console.log('Error ending session:', error);
      }
    }
  };

  const startSession = async (gameID) => {
    try {
      const userID = Cookies.get('userId');
      if (!userID) return;

      const response = await fetch('http://localhost:1022/gamesess/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, gameID })
      });
      const data = await response.json();
      if (response.ok) {
        setSessionID(data.sessionID);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log('Error starting session:', error);
    }
  };

  
  const handleFeedback = async () => {
    try {
      const response = await fetch('http://localhost:1022/gamesess/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionID, stressLevelBefore, stressLevelAfter })
      });

      if (response.ok) {
        console.log("Feedback sent successfully");
        setShowFeedback(false); // Hide the feedback form
        setGamePlayed(false);  // Reset the game played flag
      } else {
        throw new Error("Failed to send feedback");
      }
    } catch (error) {
      console.log('Error sending feedback:', error);
    }
  };


  
  const handleExerciseChange = () => {
    if (showFeedback) {
      setShowFeedback(false);
      return; // Prevent game switch during feedback
    }
    endSession();
    const exercises = ['breathing', 'memory', 'tetris'];
    let randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    while (randomExercise === activeExercise) {
      randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    }
    setActiveExercise(randomExercise);
    if (randomExercise === 'tetris' || randomExercise === 'memory') {
      const gameID = randomExercise === 'tetris' ? 1 : 2;
      setTimeout(() => {
        setGamePlayed(true);  // Mark that a game has been played
        startSession(gameID)
      }, 10000);
    }
  };

  return (
    <div className="App">
      <Header/>
      <main className="App-main">
        <img onClick={handleExerciseChange} style={{ marginTop: '1rem', alignSelf: 'center', maxWidth: '10%', cursor: 'pointer' }} src={brbImage} alt="BRB" />
        {!showFeedback && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {activeExercise === 'breathing' && <BreathingExercise onStart={() => console.log('Breathing exercise started')} />}
            {activeExercise === 'memory' && <GameBoard onStart={() => console.log('Memory exercise started')} />}
            {activeExercise === 'tetris' && <TetrisMain />}
          </div>
        )}
        {showFeedback && user && user !== 'null' && (
          <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', zIndex: 1000 }}>
            <h2>Feedback on your game experience</h2>
            <p>How stressed were you before the game? (1-10)</p>
            <input type="number" value={stressLevelBefore} onChange={e => setStressLevelBefore(e.target.value)} />
            <p>How stressed are you now after the game? (1-10)</p>
            <input type="number" value={stressLevelAfter} onChange={e => setStressLevelAfter(e.target.value)} />
            <p><button onClick={handleFeedback}>Submit Feedback</button></p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Homepage;
