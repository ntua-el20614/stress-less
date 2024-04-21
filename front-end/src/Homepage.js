import React from 'react';
import BreathingExercise from './BreathingEx';
import MemoryExercise from './MemoryEx';
import Tetris_main from './tetris/main';

const Header = ({ onLogin }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
      <h1>StressLess</h1>
      <button onClick={onLogin} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Login
      </button>
    </header>
  );
};

function Homepage() {
  const handleLogin = () => {
    console.log('Login clicked');
  };

  // Adjusted box style for exact fit
  const exerciseBoxStyle = {
    border: '2px solid #ccc',
    margin: '10px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    // Adjust width to account for margins
    width: 'calc(50% - 20px)', // Assuming 10px margin on each side
  };

  // Container style remains the same
  const exercisesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div className="App">
      <Header onLogin={handleLogin} />
      <main className="App-main">
        <h3>Home Page</h3>
        <div style={exercisesContainerStyle}>
          <div style={exerciseBoxStyle}>
            <BreathingExercise onStart={() => console.log('Breathing exercise started')} />
          </div>
          <div style={exerciseBoxStyle}>
            <MemoryExercise onStart={() => console.log('Memory exercise started')} />
          </div>
        </div>
        <Tetris_main></Tetris_main>
      </main>
    </div>
  );
}

export default Homepage;
