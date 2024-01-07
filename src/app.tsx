import React from 'react';
import { createRoot } from 'react-dom/client';
import MenuHeader from './components/MenuHeader';
import Pomodoro from './pages/Pomodoro';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.Fragment>
    <MenuHeader />
    <Pomodoro />
  </React.Fragment>
);