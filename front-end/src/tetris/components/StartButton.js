import React from 'react';
import styled from 'styled-components';

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 15px; // Reduced from 20px
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem; // Reduced from 1rem for mobile
  outline: none;
  cursor: pointer;
`;

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start</StyledStartButton>
);

export default StartButton;
