import React from 'react';
import styled from 'styled-components';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Board } from './components/Board/Board';
import { Controls } from './components/Controls/Controls';
import { CommandPanel } from './components/CommandPanel/CommandPanel';
import { RobotContextProvider } from './context/robot/RobotContext';

const PageWrapper = styled.div`
  background-color: #111827;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.section`
  padding: 25px;
  flex: 1;
  background: white;
  margin: 40px;
  border-radius: 5px;
`;

export const App: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <PageContainer>
        <RobotContextProvider boardSize={5}>
          <Board />
          <Controls />
          <CommandPanel />
        </RobotContextProvider>
      </PageContainer>
      <Footer />
    </PageWrapper>
  );
};
