import { isNil } from 'ramda';

import {
  ACTION_TYPE,
  FACING,
  TRobotContext,
  TRobotReducerActions,
} from './RobotContext';

const DIRECTION = {
  NORTH: [0, 1],
  SOUTH: [0, -1],
  EAST: [1, 0],
  WEST: [-1, 0],
};

/**
 * Check if the position is valid
 */
export const isValidPosition = (
  position?: [number, number],
  boardSize?: number
): boolean => {
  const [x, y] = position || [];
  if (isNil(x) || isNil(y) || !boardSize) {
    return false;
  }
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
    return false;
  }
  return true;
};

/**
 * Check if the robot is present on the board
 */
export const isRobotPlaced = (
  position?: [number, number],
  facing?: FACING
): boolean => {
  if (Array.isArray(position) && position.length === 2) {
    const [x, y] = position;
    if (!isValidFacing(facing) || isNil(x) || isNil(y)) {
      return false;
    }
    return true;
  }

  return false;
};

/**
 * Type Guard and check that `facing` has a correct value
 */
const isValidFacing = (facing?: FACING): facing is FACING => {
  if (!facing) {
    return false;
  }
  return Object.values(FACING).indexOf(facing) !== -1;
};

/**
 * Calculate the next position based on the current position and what direction the robot is facing
 */
export const calculateNextPosition = (
  position?: [number, number],
  facing?: FACING
): [number, number] => {
  if (!position || !facing) {
    throw new Error("Couldn't calculate the next position");
  }
  const x = position[0] + DIRECTION[facing][0];
  const y = position[1] + DIRECTION[facing][1];
  return [x, y];
};

export const robotReducer = (
  state: TRobotContext['robotState'],
  action: TRobotReducerActions
): TRobotContext['robotState'] => {
  switch (action.type) {
    case ACTION_TYPE.place: {
      const { x, y, facing } = action.payload;
      const { boardSize } = state;
      if (!isValidPosition([x, y], boardSize)) {
        return state;
      }
      return {
        ...state,
        facing,
        position: [x, y],
      };
    }

    case ACTION_TYPE.move: {
      const { position, facing, boardSize } = state;
      if (!isRobotPlaced(position, facing)) {
        return state;
      }
      const nextPosition = calculateNextPosition(position, facing);
      if (!isValidPosition(nextPosition, boardSize)) {
        return state;
      }

      return { ...state, position: nextPosition };
    }

    default:
      throw new Error(`Action ${action.type} is not handled`);
  }
};
