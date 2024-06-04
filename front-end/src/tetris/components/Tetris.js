// src/tetris/components/Tetris.js
import React, { useState } from 'react';
import Cookies from 'js-cookie';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import DPad from './DPad';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const dropPlayer = () => {
    drop();
    setDropTime(1000 / (level + 1));
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver && keyCode === 40) {
      setDropTime(1000 / (level + 1));
    }
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        //console.log('GAME OVER!!!');
        console.log('Final Score:', score);


        //get user id from cookie
        const userID = Cookies.get('userId');
        console.log('User ID:', userID);

        fetch(`http://localhost:1045/users/tetris_highscore/${userID}/${score}`)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
        
        
        
          setGameOver(true);
        setDropTime(null);
      } else {
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const move = (e) => {
    if (!gameOver) {
      e.preventDefault();
      const { keyCode } = e;
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
        <DPad
          onUp={() => playerRotate(stage, 1)}
          onLeft={() => movePlayer(-1)}
          onRight={() => movePlayer(1)}
          onDown={() => dropPlayer()}
        />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
