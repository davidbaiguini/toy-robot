import { reduce } from 'ramda';

import {
  ACTION_TYPE,
  FACING,
  TRobotContext,
  TRobotReducerActions,
} from './RobotContext';
import {
  robotReducer,
  isValidPosition,
  isRobotPlaced,
  calculateNextPosition,
  calculateNextFacing,
} from './robotReducer';

const applyActionsToRobotReducer = reduce(robotReducer);

describe('calculateNextFacing', () => {
  it('should be able to turn right', () => {
    expect(calculateNextFacing(FACING.north, 'right')).toBe(FACING.east);
    expect(calculateNextFacing(FACING.east, 'right')).toBe(FACING.south);
    expect(calculateNextFacing(FACING.south, 'right')).toBe(FACING.west);
    expect(calculateNextFacing(FACING.west, 'right')).toBe(FACING.north);
  });
  it('should be able to turn left', () => {
    expect(calculateNextFacing(FACING.north, 'left')).toBe(FACING.west);
    expect(calculateNextFacing(FACING.west, 'left')).toBe(FACING.south);
    expect(calculateNextFacing(FACING.south, 'left')).toBe(FACING.east);
    expect(calculateNextFacing(FACING.east, 'left')).toBe(FACING.north);
  });
});

describe('validatePosition', () => {
  it('should return true when the position is valid', () => {
    expect(isValidPosition([0, 0], 5)).toBe(true);
    expect(isValidPosition([0, 1], 5)).toBe(true);
    expect(isValidPosition([4, 4], 5)).toBe(true);
    expect(isValidPosition([3, 1], 5)).toBe(true);
    expect(isValidPosition([99, 99], 100)).toBe(true);
  });
  it('should return false when the position is not valid', () => {
    expect(isValidPosition([-1, 0], 5)).toBe(false);
    expect(isValidPosition([1, -1], 5)).toBe(false);
    expect(isValidPosition([10, 0], 10)).toBe(false);
    expect(isValidPosition([5, 5], 5)).toBe(false);
    expect(isValidPosition([0, 0], 0)).toBe(false);
    // @ts-expect-error
    expect(isValidPosition([undefined, 0], 5)).toBe(false);
  });
});

describe('isRobotPlaced', () => {
  it('should return true when the robot was placed', () => {
    expect(isRobotPlaced([0, 0], FACING.south)).toBe(true);
    expect(isRobotPlaced([0, 0], FACING.east)).toBe(true);
    expect(isRobotPlaced([0, 0], FACING.west)).toBe(true);
    expect(isRobotPlaced([99, 1], FACING.south)).toBe(true);
  });
  it('should return false when the position is not valid', () => {
    expect(isRobotPlaced([0, 0], undefined)).toBe(false);
    expect(isRobotPlaced(undefined, FACING.south)).toBe(false);
    // @ts-expect-error
    expect(isRobotPlaced([0, 0], 'SOUTHHHHHHH')).toBe(false);
    // @ts-expect-error
    expect(isRobotPlaced(1, FACING.south)).toBe(false);
  });
});

describe('calculateNextPosition', () => {
  it('should correctly calculate the next position of the robot', () => {
    expect(calculateNextPosition([0, 0], FACING.north)).toEqual([0, 1]);
    expect(calculateNextPosition([10, 5], FACING.north)).toEqual([10, 6]);
    expect(calculateNextPosition([10, 10], FACING.south)).toEqual([10, 9]);
    expect(calculateNextPosition([10, 10], FACING.west)).toEqual([9, 10]);
    expect(calculateNextPosition([10, 10], FACING.east)).toEqual([11, 10]);
  });
  it('should throw when the parameters are not valid', () => {
    expect(() => calculateNextPosition(undefined, FACING.north)).toThrow();
  });
});

describe('robotReducer', () => {
  describe('The PLACE action', () => {
    it('should place the robot', () => {
      const action: TRobotReducerActions = {
        type: ACTION_TYPE.place,
        payload: { x: 1, y: 2, facing: FACING.east },
      };
      const state = robotReducer({ boardSize: 5 }, action);

      expect(state).toStrictEqual({
        boardSize: 5,
        position: [1, 2],
        facing: 'EAST',
      });
    });
  });

  describe('The MOVE action', () => {
    it('Should move the robot', () => {
      const action: TRobotReducerActions = {
        type: ACTION_TYPE.move,
      };
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
        facing: FACING.north,
        position: [0, 0],
      };
      const newState = robotReducer(state, action);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [0, 1],
        facing: 'NORTH',
      });
    });
    it('should not move the robot if the new position is invalid', () => {
      const action: TRobotReducerActions = {
        type: ACTION_TYPE.move,
      };
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
        facing: FACING.south,
        position: [0, 0],
      };
      const newState = robotReducer(state, action);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [0, 0],
        facing: 'SOUTH',
      });
    });
  });

  describe('The LEFT action', () => {
    it('should rotate the robot to the left', () => {
      const action: TRobotReducerActions = {
        type: ACTION_TYPE.left,
      };
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
        facing: FACING.north,
        position: [0, 0] as [number, number],
      };
      const newState = robotReducer(state, action);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [0, 0],
        facing: FACING.west,
      });
    });
  });

  describe('The RIGHT action', () => {
    it('should rotate the robot to the right', () => {
      const action: TRobotReducerActions = {
        type: ACTION_TYPE.right,
      };
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
        facing: FACING.north,
        position: [0, 0] as [number, number],
      };
      const newState = robotReducer(state, action);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [0, 0],
        facing: FACING.east,
      });
    });
  });

  describe('should handle chained actions', () => {
    it('should place the robot in the right place', () => {
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
      };

      const action1: TRobotReducerActions = {
        type: ACTION_TYPE.place,
        payload: { x: 1, y: 1, facing: FACING.east },
      };
      const action2: TRobotReducerActions = {
        type: ACTION_TYPE.place,
        payload: { x: 2, y: 2, facing: FACING.south },
      };
      const action3: TRobotReducerActions = {
        type: ACTION_TYPE.move,
      };

      const newState = applyActionsToRobotReducer(state, [
        action1,
        action2,
        action3,
      ]);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [2, 1],
        facing: FACING.south,
      });
    });

    it('should not fall of the board', () => {
      const state: TRobotContext['robotState'] = {
        boardSize: 5,
      };

      const action1: TRobotReducerActions = {
        type: ACTION_TYPE.place,
        payload: { x: 0, y: 0, facing: FACING.south },
      };
      const action2: TRobotReducerActions = {
        type: ACTION_TYPE.move,
      };
      const action3: TRobotReducerActions = {
        type: ACTION_TYPE.left,
      };
      const action4: TRobotReducerActions = {
        type: ACTION_TYPE.move,
      };

      const newState = applyActionsToRobotReducer(state, [
        action1,
        action2,
        action3,
        action4,
      ]);

      expect(newState).toStrictEqual({
        boardSize: 5,
        position: [1, 0],
        facing: FACING.east,
      });
    });
  });
});
