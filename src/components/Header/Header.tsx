import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  border: 1px solid blue;
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Toy robot</h1>
    </HeaderWrapper>
  );
};
