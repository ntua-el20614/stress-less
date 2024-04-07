import React, { useState, useEffect } from 'react';

function BreathingExercise() {
  const [phase, setPhase] = useState('Get Ready');
  const [countdown, setCountdown] = useState(3); // Initial 3-second countdown
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Countdown logic
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (active) {
      // Only transition phases if active
      nextPhase();
    }
    return () => clearTimeout(timer);
  }, [countdown, active]); // Depend on countdown and active

  useEffect(() => {
    // Start the exercise on component mount
    setActive(true);
    return () => {
      setActive(false); // Cleanup on component unmount
    };
  }, []);

  const phases = [
    { name: 'Breathe In', duration: 4 },
    { name: 'Hold', duration: 7 },
    { name: 'Breathe Out', duration: 8 },
    { name: 'Rest', duration: 0 }, // Add a rest phase to loop
  ];

  const nextPhase = () => {
    setPhase((currentPhase) => {
      const currentIndex = phases.findIndex(p => p.name === currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length; // Loop back to 0 after the last phase
      const nextPhase = phases[nextIndex];
      setCountdown(nextPhase.duration);
      return nextPhase.name;
    });
  };

  return (
    <div>
      <h2>Breathing Exercise</h2>
      <p>Follow the breathing instructions below:</p>
      <div>
        <strong>{phase}</strong>
        <p>{countdown}</p>
      </div>
    </div>
  );
}
export default BreathingExercise;