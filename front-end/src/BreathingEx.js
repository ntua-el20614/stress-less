import React, { useState, useEffect, useCallback } from 'react';

function BreathingExercise() {
  const phases = [
    { name: 'Breathe In', duration: 4 },
    { name: 'Hold', duration: 2 },
    { name: 'Breathe Out', duration: 4 },
    { name: 'Rest', duration: 20 },
  ];

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [active, setActive] = useState(false);

  const moveToNextPhase = useCallback(() => {
    setCurrentPhaseIndex(index => {
      const nextIndex = index === null ? 0 : (index + 1) % phases.length;
      setCountdown(phases[nextIndex].duration);
      return nextIndex;
    });
  }, [phases]); // Note that 'phases' is a static value and does not change

  useEffect(() => {
    let timer;
    if (active && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (active) {
      moveToNextPhase();
    }
    return () => clearTimeout(timer);
  }, [active, countdown, moveToNextPhase]); // Include moveToNextPhase here

  const startExercise = () => {
    if (!active) {
      setActive(true);
      moveToNextPhase();
    } else {
      setActive(false);
      setCurrentPhaseIndex(null);
    }
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = countdown / (phases[currentPhaseIndex]?.duration || 1) * circumference;

  const containerStyle = {
    position: 'fixed', // Use fixed to keep it always in view without scrolling
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust for the element's own size
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
        <h2>Breathing Exercise</h2>
        <button onClick={startExercise}>
            {active ? 'Stop Exercise' : 'Start Exercise'}
        </button>
        {active && currentPhaseIndex !== null && (
            <>
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{phases[currentPhaseIndex].name}</p>
                <svg width="200" height="200" viewBox="-100 -100 200 200">
                    {/* Background circle */}
                    <circle
                        stroke="grey"
                        fill="transparent"
                        strokeWidth="8"
                        r={radius}
                        cx="0"
                        cy="0"
                    />
                    {/* Progress circle */}
                    <circle
                      style={{
                        stroke: "blue",
                        fill: "transparent",
                        strokeWidth: "8"
                      }}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      r={radius}
                      cx="0"
                      cy="0"
                      transform="rotate(-90)"
                    />
                    {/* Text in the center */}
                    <text fill="#000" x="0" y="0" textAnchor="middle" dy="5">
                        {countdown}
                    </text>
                </svg>
            </>
        )}
    </div>
);
}

export default BreathingExercise;
