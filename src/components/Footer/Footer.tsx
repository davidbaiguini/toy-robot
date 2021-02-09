import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  border: 1px solid blue;
`;

export const Footer: React.FC = () => {
  return <FooterWrapper>This will be the Footer</FooterWrapper>;
};
