import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #e5e7eb;
`;

export const Footer: React.FC = () => {
  return <FooterWrapper>This will be the Footer</FooterWrapper>;
};
