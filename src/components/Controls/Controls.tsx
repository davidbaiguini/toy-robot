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
        PLACE 0,0,NORTH
        <br />
        MOVE
        <br />
        REPORT
      </pre>
    </div>
  );
};
