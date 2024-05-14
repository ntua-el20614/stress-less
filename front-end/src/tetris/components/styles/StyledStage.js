import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(90vw / ${props => props.width} / 10) // Adjusted for better proportion
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 90vw;
  max-width: 90vw;
  background: #111;
`;
