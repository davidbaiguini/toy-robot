import { ACTION_TYPE, FACING, TRobotReducerActions } from './RobotContext';
import { robotReducer, isValidPosition } from './robotReducer';

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
    expect(isValidPosition([undefined, 0], 5)).toBe(false);
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
});
