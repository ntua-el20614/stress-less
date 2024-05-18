// src/tetris/components/styles/StyledDPad.js
import styled from 'styled-components';

export const StyledDPad = styled.div`
  position: absolute;
  bottom: 40px;   
  right: 55px;
  opacity: 0.7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    margin: 5px;
    width: 80px;  // Ensure all buttons have the same width
    height: 80px;  // Ensure all buttons have the same height
    background-color: rgba(51, 51, 51, 0.7);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;  // Adjust font size to be bigger
    border-radius: 50%;
    cursor: pointer;
  }

  .horizontal-buttons {
    display: flex;
    justify-content: center;
    width: 100%;  // Ensure horizontal buttons are properly aligned
  }
`;
