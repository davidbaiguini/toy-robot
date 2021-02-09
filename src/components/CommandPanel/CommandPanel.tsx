import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ACTION_TYPE, RobotContext } from '../../context/robot/RobotContext';
import { isValidAction } from '../../context/robot/robotReducer';
import { Button } from '../Button/Button';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;
  border: solid 1px black;
  border-radius: 5px;
`;

export const parseCommand = (commandList: string) => {
  const commandArray = commandList
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x);

  const x = commandArray.reduce<any[]>((acc, c) => {
    const [command, args] = c.split(' ');

    if (isValidAction(command as ACTION_TYPE)) {
      const parsedCommand = args
        ? [
            command,
            args.split(',').map((a) => (isNaN(a as any) ? a : parseInt(a))),
          ]
        : [command];

      acc.push(parsedCommand);
    }

    return acc;
  }, []);

  return x;
};

export const CommandPanel: React.FC = () => {
  const [commandList, setCommandList] = useState('');
  const { robotDispatcher, robotState } = useContext(RobotContext);

  return (
    <div>
      <h3>The command Panel</h3>
      <div>Please enter the commands below</div>
      <div>
        <TextArea
          placeholder="Enter commands such as: PLACE 0,0,NORTH"
          onChange={(event) => {
            setCommandList(event.target.value);
          }}
        />
      </div>
      <ButtonContainer>
        <Button>Clear</Button>
        <Button
          onClick={() =>
            parseCommand(commandList).forEach((command) => {
              console.log(command[0], command[1]);
              // @ts-ignore
              robotDispatcher({
                type: command[0],
                payload: command[1],
              });
            })
          }
        >
          Run
        </Button>
      </ButtonContainer>
      <div>
        <pre>{JSON.stringify(robotState, null, 2)}</pre>
      </div>
    </div>
  );
};
