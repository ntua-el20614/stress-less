import React from 'react';
import BreathingExercise from './BreathingEx';
import MemoryExercise from './MemoryEx';
import Tetris_main from './tetris/main';
import brbImage from './img/brb.png';
import logo from './img/favicon.ico';
const Header = ({ onLogin }) => {
  const logoStyle = {
    height: '4rem',
    marginLeft: '0.5rem',
  };
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
      <h1><img style={logoStyle} src={logo} alt="Logo"/> StressLess </h1>
      <button onClick={onLogin} style={{ padding: '0.5rem 1rem', cursor: 'pointer', width: '100px', height: '30px' }}>
        Login
      </button>
    </header>
  );
};

function Homepage() {
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const exerciseBoxStyle = {
    border: '2px solid #ccc',
    margin: '10px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: 'calc(50% - 20px)',
  };

  const exercisesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const mainStyle = {
    padding: '0 1rem', // Reduced padding around the main content
  };

  const titleStyle = {
    marginBottom: '0.5rem', // Reduce the bottom margin of the title
  };

  const imageStyle = {
    marginTop: '1rem', // Add some space above the image
    alignSelf: 'center', // Aligns the image to the center of the page
    maxWidth: '10%', // Makes the image responsive

    cursor: 'pointer',
  };
  //<h3 style={titleStyle}>Home Page</h3>        

  return (
    <div className="App">
      <Header onLogin={handleLogin} />
      <main className="App-main" style={mainStyle}>

        <img style={imageStyle} src={brbImage} alt="BRB" />
        <div style={exercisesContainerStyle}>
          <div style={exerciseBoxStyle}>
            <BreathingExercise onStart={() => console.log('Breathing exercise started')} />
          </div>
          <div style={exerciseBoxStyle}>
            <MemoryExercise onStart={() => console.log('Memory exercise started')} />
          </div>
        </div>
        <Tetris_main/>
      </main>
    </div>
  );
}

export default Homepage;
