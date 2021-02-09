import React from 'react';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Board } from './components/Board/Board';
import { Controls } from './components/Controls/Controls';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <section>
        <Board />
        <Controls />
      </section>
      <Footer />
    </div>
  );
};
