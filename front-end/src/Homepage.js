import React, { useState } from 'react';
import BreathingExercise from './BreathingEx';
import GameBoard from './memgame/GameBoard';
import TetrisMain from './tetris/main';
import brbImage from './img/brb.png';
import logo from './img/favicon.ico';
import './App.css';

const Header = ({ onLogin }) => {
  const logoStyle = {
    height: '4rem',
    marginLeft: '0.5rem',
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1><img style={logoStyle} src={logo} alt="Logo" /> StressLess </h1>
      <button onClick={onLogin} style={{ padding: '0.5rem 1rem', cursor: 'pointer', width: '100px', height: '30px' }}>
        Login
      </button>
    </header>
  );
};

function Homepage() {
  const [activeExercise, setActiveExercise] = useState(null);

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleExerciseChange = () => {
    const exercises = ['breathing', 'memory', 'tetris'];
    let randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    while (randomExercise === activeExercise) {
      randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    }
    setActiveExercise(randomExercise);
  };

  const exercisesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const mainStyle = {
    
  };

  const imageStyle = {
    marginTop: '1rem',
    alignSelf: 'center',
    maxWidth: '10%',
    cursor: 'pointer',
  };

  return (
    <div className="App">
      <Header onLogin={handleLogin} />
      <main className="App-main" style={mainStyle}>
        <img onClick={handleExerciseChange} style={imageStyle} src={brbImage} alt="BRB" />
        <div style={exercisesContainerStyle}>
          {activeExercise === 'breathing' && <BreathingExercise onStart={() => console.log('Breathing exercise started')} />}
          {activeExercise === 'memory' && <GameBoard />} {/* Render GameBoard */}
          {activeExercise === 'tetris' && <TetrisMain />}
        </div>
      </main>
    </div>
  );
}

export default Homepage;
