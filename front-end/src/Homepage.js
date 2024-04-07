import React from 'react';
import BreathingExercise from './BreathingEx';
import MemoryExercise from './MemoryEx';
// Define the Header component
const Header = ({ onLogin }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <h1>StressLess</h1>
      <button onClick={onLogin} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Login
      </button>
    </header>
  );
};

// Define the Homepage component that uses the Header
function Homepage() {
  // Placeholder login function
  const handleLogin = () => {
    console.log('Login clicked');
    // Here, you would add your logic to handle the login action,
    // such as showing a login modal or redirecting to a login page.
  };

  return (
    <div className="App">
      {/* Use the Header component and pass the handleLogin function as the onLogin prop */}
      <Header onLogin={handleLogin} />
      <main className="App-main">
        <h1>Home Page</h1>
        
        
        <BreathingExercise onStart={() => console.log('Breathing exercise started')} />
        <MemoryExercise onStart={() => console.log('Memory exercise started')} />
    
      </main>
    </div>
  );
}

export default Homepage;
