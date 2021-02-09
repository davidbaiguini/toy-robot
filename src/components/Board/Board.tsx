import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { RobotContext } from '../../context/robot/RobotContext';

const BoardWrapper = styled.div<{ boardSize: number }>`
  display: grid;
  grid-gap: 0;
  ${(props) => css`
    grid-template-columns: repeat(${props.boardSize}, [col] 10vw);
    grid-template-rows: repeat(${props.boardSize}, [row] 10vw);
  `}
  justify-content: center;
  align-content: center;
  margin: 0 auto;
`;

const BoardCell = styled.div`
  font-size: calc(5vw);
  padding-top: 1vw;
  text-align: center;
  border: 1px solid red;
`;

export const Board: React.FC = () => {
  const {
    robotState: { boardSize },
    robotDispatcher,
  } = useContext(RobotContext);

  if (!boardSize) return null;

  const yCoordinates = Array.from(Array(boardSize).keys());
  const xCoordinates = [...yCoordinates].reverse();

  return (
    <div>
      <h3>The board</h3>
      <BoardWrapper boardSize={boardSize}>
        {xCoordinates.map((x) =>
          yCoordinates.map((y) => (
            <BoardCell>
              [{x},{y}]
            </BoardCell>
          ))
        )}
      </BoardWrapper>
    </div>
  );
};
