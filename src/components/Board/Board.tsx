import React from 'react';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  border: 1px solid red;
`;

export const Board: React.FC = () => {
  return <BoardWrapper>This will be the Board</BoardWrapper>;
};
