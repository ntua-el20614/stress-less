import React, { useEffect, useState } from "react";
import logo from './img/favicon.ico';

const Header = () => {
  const logoStyle = {
    height: '4rem',
    marginLeft: '0.5rem',
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h1><img style={logoStyle} src={logo} alt="Logo" /> StressLess</h1>
    </header>
  );
};

const GameStats = () => {
  const [gameStats, setGameStats] = useState([]);
  const [userPreferences, setUserPreferences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const response = await fetch('http://localhost:1045/stats/game_feedback');
        const data = await response.json();
        const stats = data.map(stat => ({
          ...stat,
          gameName: stat.gameID === 1 ? 'Tetris' : 'Memory Game'
        }));
        setGameStats(stats);
      } catch (error) {
        console.error('Error fetching game stats:', error);
      }
    };

    const fetchUserPreferences = async () => {
      try {
        let id = 1;
        let keepFetching = true;
        let allPreferences = [];

        while (keepFetching) {
          const response = await fetch(`http://localhost:1045/users/preference?userID=${id}`);
          const data = await response.json();
          if (data.length > 0) {
            allPreferences.push(data);
            id++;
          } else {
            keepFetching = false;
          }
        }
        setUserPreferences(allPreferences);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };

    fetchGameStats();
    fetchUserPreferences();
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < userPreferences.length - 1 ? prev + 1 : prev));
  };

  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        <h2>Game Statistics</h2>
        <ul>
          {gameStats.map(stat => (
            <li key={stat.gameID}>
              {stat.gameName}: Average Stress Reduction {stat.averageStressReduction}
            </li>
          ))}
        </ul>
        <h2>User Preferences</h2>
        {userPreferences.length > 0 && (
          <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <button onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '20px', zIndex: 1 }}>←</button>
            <div style={{ display: 'flex', transition: 'transform 0.3s', transform: `translateX(-${currentIndex * 100}%)` }}>
              {userPreferences.map((prefs, index) => (
                <div key={index} style={{ width: '100%', flexShrink: 0 }}>
                  <ul>
                    {prefs.map((pref, idx) => (
                      <li key={idx}>
                        {pref.gameName}: Total Seconds - {pref.totalSeconds}, Percentage - {pref.percentage}%
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '20px', zIndex: 1 }}>→</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;
