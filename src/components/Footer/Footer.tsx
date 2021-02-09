import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  text-align: center;
  padding: 5px;
  font-size: 14px;
  color: #e5e7eb;
  a {
    color: #e5e7eb;
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <a href="https://github.com/davidbaiguini/toy-robot">Github</a>
    </FooterWrapper>
  );
};
