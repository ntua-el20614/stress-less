import React from 'react';
import styled from 'styled-components';

const DPadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const DPadButton = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

const DPadRow = styled.div`
  display: flex;
  justify-content: center;
`;

const DPad = ({ onUp, onLeft, onRight, onDown }) => (
  <DPadContainer>
    <DPadButton onClick={onUp}>↑</DPadButton>
    <DPadRow>
      <DPadButton onClick={onLeft}>←</DPadButton>
      <DPadButton onClick={onDown}>↓</DPadButton>
      <DPadButton onClick={onRight}>→</DPadButton>
    </DPadRow>
  </DPadContainer>
);

export default DPad;
