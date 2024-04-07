import React, { useState, useEffect } from 'react';

function BreathingExercise() {
  const phases = [
    { name: 'Breathe In', duration: 4 },
    { name: 'Hold', duration: 7 },
    { name: 'Breathe Out', duration: 8 },
    { name: 'Rest', duration: 30 },
  ];

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer;
    if (active && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (active) {
      moveToNextPhase();
    }
    return () => clearTimeout(timer);
  }, [active, countdown]);

  const moveToNextPhase = () => {
    setCurrentPhaseIndex(index => {
      const nextIndex = index === null ? 0 : (index + 1) % phases.length;
      setCountdown(phases[nextIndex].duration);
      return nextIndex;
    });
  };

  const startExercise = () => {
    if (!active) {
      setActive(true);
      moveToNextPhase();
    } else {
      setActive(false);
      setCurrentPhaseIndex(null);
    }
  };

  const circumference = 2 * Math.PI * 45; // Assuming the radius of the circle is 30
  const progress = countdown / (phases[currentPhaseIndex]?.duration || 1) * circumference;

return (
    <div>
        <h2>Breathing Exercise</h2>
        <button onClick={startExercise}>
            {active ? 'Stop Exercise' : 'Start Exercise'}
        </button>
        {active && currentPhaseIndex !== null && (
            <>
                <p style={{ fontWeight: 'bold' }}>{phases[currentPhaseIndex].name}</p>
                <svg width="100" height="100" viewBox="-50 -50 100 100">
                    {/* Background circle */}
                    <circle
                        stroke="grey"
                        fill="transparent"
                        strokeWidth="5"
                        r="45"
                        cx="0"
                        cy="0"
                    />
                    {/* Progress circle */}
                    <circle
                        stroke="blue"
                        fill="transparent"
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        r="45"
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
