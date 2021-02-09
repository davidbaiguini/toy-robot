import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { RobotContext } from '../../context/robot/RobotContext';
import { ORIENTATION } from '../../context/robot/robotReducer';

// @ts-ignore
import robot from './robot.svg';

const BoardTitle = styled.h2`
  text-align: center;
  color: #fe00d7;
`;

const BoardWrapper = styled.div<{ boardSize: number }>`
  display: grid;
  grid-gap: 1px;
  ${(props) => css`
    grid-template-columns: repeat(${props.boardSize}, [col] 15vw);
    grid-template-rows: repeat(${props.boardSize}, [row] 15vw);
    @media (min-width: 1200px) {
      grid-template-columns: repeat(${props.boardSize}, [col] 5vw);
      grid-template-rows: repeat(${props.boardSize}, [row] 5vw);
    }
  `}
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  > div:nth-child(even) {
    background-color: #ea95dd1f;
  }
  > div:nth-child(odd) {
    background-color: #006aff59;
  }
`;

const BoardCell = styled.div`
  text-align: center;
  height: 100%;
`;

const Robot = styled.div<{ rotate: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  ${(props) => css`
    transform: rotate(${props.rotate}deg);
  `}
  & img {
    width: 70%;
  }
`;

const Report = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  color: #006aff;
`;

export const Board: React.FC = () => {
  const {
    robotState: { boardSize, position, facing, reported },
  } = useContext(RobotContext);

  if (!boardSize) return null;

  const xCoordinates = Array.from(Array(boardSize).keys());
  const yCoordinates = [...xCoordinates].reverse();

  return (
    <div>
      <BoardTitle>The board</BoardTitle>
      <BoardWrapper boardSize={boardSize}>
        {yCoordinates.map((x) =>
          xCoordinates.map((y) => (
            <BoardCell key={`${x}:${y}`}>
              {position && facing && position[0] === y && position[1] === x && (
                <Robot rotate={ORIENTATION[facing]}>
                  <img src={robot} alt="Robot" />
                </Robot>
              )}
            </BoardCell>
          ))
        )}
      </BoardWrapper>

      <Report>OUTPUT: {reported || '[]'}</Report>
    </div>
  );
};
