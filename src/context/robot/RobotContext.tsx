import React, { createContext, useReducer, Dispatch, useEffect } from 'react';

import { robotReducer } from './robotReducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum FACING {
  north = 'NORTH',
  south = 'SOUTH',
  east = 'EAST',
  west = 'WEST',
}

export enum ACTION_TYPE {
  init = 'INIT',
  place = 'PLACE',
  move = 'MOVE',
  right = 'RIGHT',
  left = 'LEFT',
  report = 'REPORT',
}

type TPayload = {
  [ACTION_TYPE.init]: {
    size: number;
  };
  [ACTION_TYPE.place]: [x: number, y: number, facing: FACING];
  [ACTION_TYPE.move]: undefined;
  [ACTION_TYPE.left]: undefined;
  [ACTION_TYPE.right]: undefined;
  [ACTION_TYPE.report]: undefined;
};

export type TRobotReducerActions = ActionMap<TPayload>[keyof ActionMap<TPayload>];

export type TRobotContext = {
  robotState: {
    position?: [number, number];
    boardSize?: number;
    board?: string[][];
    facing?: FACING;
  };
  robotDispatcher: Dispatch<TRobotReducerActions>;
};

const initialState: TRobotContext['robotState'] = {
  boardSize: 0,
  board: [[]],
};

export const RobotContext = createContext<TRobotContext>({
  robotState: initialState,
  robotDispatcher: () => null,
});

type RobotContextProviderProps = {
  children: React.ReactNode;
  boardSize: number;
};

export const RobotContextProvider: React.FC<RobotContextProviderProps> = ({
  children,
  boardSize,
}) => {
  const [robotState, robotDispatcher] = useReducer(robotReducer, initialState);

  useEffect(() => {
    robotDispatcher({ type: ACTION_TYPE.init, payload: { size: boardSize } });
  }, [robotDispatcher, boardSize]);

  return (
    <RobotContext.Provider value={{ robotState, robotDispatcher }}>
      {children}
    </RobotContext.Provider>
  );
};
