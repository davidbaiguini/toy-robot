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

const WidgetContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Widget = styled.section`
  padding: 25px;
  flex: 1;
  background: white;
  margin: 40px;
  border-radius: 5px;
`;

const BoardContainer = styled.section`
  padding: 25px;
  flex: 1;
  background: white;
  margin: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;

export const App: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <RobotContextProvider boardSize={5}>
        <WidgetContainer>
          <BoardContainer>
            <Board />
          </BoardContainer>
          <Widget>
            <Controls />
            <CommandPanel />
          </Widget>
        </WidgetContainer>
      </RobotContextProvider>
      <Footer />
    </PageWrapper>
  );
};
