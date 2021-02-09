import React from 'react';

import { Title } from '../Title/Title';

export const Controls: React.FC = () => {
  return (
    <div>
      <Title>Commands</Title>
      <ul>
        <li>PLACE X,Y,F</li>
        <li>MOVE</li>
        <li>LEFT</li>
        <li>RIGHT</li>
        <li>REPORT</li>
      </ul>
      <strong>Example:</strong>
      <pre>
        PLACE 1,1,WEST
        <br />
        MOVE
        <br />
        MOVE
        <br />
        LEFT
        <br />
        REPORT
      </pre>
    </div>
  );
};
