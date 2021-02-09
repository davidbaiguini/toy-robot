import { isNil } from 'ramda';

import {
  ACTION_TYPE,
  TRobotContext,
  TRobotReducerActions,
} from './RobotContext';

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

    default:
      throw new Error(`Action ${action.type} is not handled`);
  }
};
