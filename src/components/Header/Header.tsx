import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  text-transform: uppercase;
  text-align: center;
  position: relative;
  color: white;

  &:after {
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    height: 3px;
    background: rgb(254, 0, 215);
    background: linear-gradient(
      90deg,
      rgba(254, 0, 215, 1) 0%,
      rgba(0, 106, 255, 1) 100%
    );
  }
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Toy robot</h1>
    </HeaderWrapper>
  );
};
