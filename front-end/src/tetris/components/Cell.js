import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type, width }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} width={width}>
    {console.log('Cell width:', width)}
  </StyledCell>
);

export default React.memo(Cell);
