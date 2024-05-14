import styled from 'styled-components';

export const StyledCell = styled.div`
  width: calc(90vw / ${props => Math.max(props.width, 10)}); // Minimum column count safeguard
  height: calc(90vw / ${props => Math.max(props.width, 10)}); // Same here
  min-width: 16px; // Set a minimum width to avoid too small cells
  min-height: 16px; // Set a minimum height
  background: rgba(${props => props.color}, 0.8);
  border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`;
