import { parseCommand } from './CommandPanel';

describe('CommandPanel', () => {
  it('should parse PLACE command', () => {
    const input = `
        PLACE 0,0,NORTH
        `;
    expect(parseCommand(input)).toEqual([['PLACE', [0, 0, 'NORTH']]]);
  });
  it('should parse MOVE command', () => {
    const input = `MOVE`;
    expect(parseCommand(input)).toEqual([['MOVE']]);
  });
  it('should parse LEFT command', () => {
    const input = `LEFT`;
    expect(parseCommand(input)).toEqual([['LEFT']]);
  });
  it('should parse RIGHT command', () => {
    const input = `RIGHT`;
    expect(parseCommand(input)).toEqual([['RIGHT']]);
  });
  it('should parse REPORT command', () => {
    const input = `REPORT`;
    expect(parseCommand(input)).toEqual([['REPORT']]);
  });

  it('should parse multiple lines', () => {
    const input = `
        PLACE 0,0,NORTH
        PLACE 1,1,SOUTH
        MOVE
        LEFT
        RIGHT
        REPORT
        `;
    expect(parseCommand(input)).toEqual([
      ['PLACE', [0, 0, 'NORTH']],
      ['PLACE', [1, 1, 'SOUTH']],
      ['MOVE'],
      ['LEFT'],
      ['RIGHT'],
      ['REPORT'],
    ]);
  });

  it('should ignore unknown commands', () => {
    const input = `UNKNOWN`;
    expect(parseCommand(input)).toEqual([]);
  });

  it('should ignore empty lines', () => {
    const input = `
    MOVE

    LEFT

    `;
    expect(parseCommand(input)).toEqual([['MOVE'], ['LEFT']]);
  });
});
