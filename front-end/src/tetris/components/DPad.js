



// src/tetris/components/DPad.js
import React from 'react';
import { StyledDPad } from './styles/StyledDPad';

const DPad = ({ onUp, onLeft, onRight, onDown }) => (
  <StyledDPad>
    <div onClick={onUp}>⟳</div>
    <div className="horizontal-buttons">
      <div onClick={onLeft}>←</div>
      <div onClick={onDown}>↓</div>
      <div onClick={onRight}>→</div>
    </div>
  </StyledDPad>
);

export default DPad;
