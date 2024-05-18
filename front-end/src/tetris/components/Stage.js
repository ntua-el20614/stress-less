import React from 'react';
import { StyledStage } from './styles/StyledStage';
import Cell from './Cell';

const Stage = ({ stage }) => {
  const width = stage[0].length;  // This retrieves the number of cells horizontally
  const height = stage.length;  // This retrieves the number of cells vertically

  
  return (
    <StyledStage width={width} height={height}>
      {stage.map((row, y) => 
        row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />)
      )}
    
    </StyledStage>
  );
};

export default Stage;

