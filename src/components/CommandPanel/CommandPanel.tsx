import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ACTION_TYPE, RobotContext } from '../../context/robot/RobotContext';
import { isValidAction } from '../../context/robot/robotReducer';
import { Button } from '../Button/Button';
import { Title } from '../Title/Title';

const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  > button {
    margin-right: 20px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  min-height: 50px;
  border: solid 1px black;
  border-radius: 5px;
`;

// type TParsedCommand = [ACTION_TYPE, (string | number)[]?][];
export const parseCommand = (commandList: string) => {
  const commandArray = commandList
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x);

  return commandArray.reduce<any[]>((acc, c) => {
    const [command, args] = c.split(' ');

    if (isValidAction(command as ACTION_TYPE)) {
      const parsedCommand = args
        ? [
            command,
            args
              .split(',')
              .filter((a) => a)
              .map((a) => (isNaN(a as any) ? a : parseInt(a))),
          ]
        : [command];

      acc.push(parsedCommand);
    }

    return acc;
  }, []);
};

export const CommandPanel: React.FC = () => {
  const [commandList, setCommandList] = useState('');
  const { robotDispatcher } = useContext(RobotContext);

  return (
    <Panel>
      <Title>Please enter the commands below</Title>
      <div>
        <TextArea
          rows={6}
          placeholder="Enter commands such as: PLACE 0,0,NORTH"
          onChange={(event) => {
            setCommandList(event.target.value);
          }}
          value={commandList}
        />
      </div>
      <ButtonContainer>
        <Button
          onClick={() =>
            parseCommand(commandList).forEach((command) => {
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
        <Button onClick={() => setCommandList('')}>Clear</Button>
      </ButtonContainer>
      {/* <div>
        <pre>{JSON.stringify(robotState, null, 2)}</pre>
      </div> */}
    </Panel>
  );
};
