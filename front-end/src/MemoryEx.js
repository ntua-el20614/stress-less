import React, { useState } from 'react';

const MemoryExercise = ({ onStart }) => {
  const [currentWord, setCurrentWord] = useState('');
  const words = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'pineapple', 'strawberry', 'blueberry', 'watermelon', 'mango'];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const displayWords = () => {
    const shuffledWords = shuffleArray(words);
    shuffledWords.forEach((word, i) => {
      setTimeout(() => {
        setCurrentWord(word);
      }, i * 1000); // Adjust the timing as needed
    });
    // Clear the displayed word after the last word has been shown
    setTimeout(() => {
      setCurrentWord('');
    }, shuffledWords.length * 1000);
  }

  const startMemoryExercise = () => {
    onStart(); // Call the onStart prop function
    displayWords();
  }

  return (
    <div>
      <h2>Memory Exercise</h2>
      <button onClick={startMemoryExercise}>
        Start Exercise
      </button>
      {currentWord && <p>{currentWord}</p>}
    </div>
  );
}

export default MemoryExercise;
