import { createRoot } from 'react-dom/client';
import MenuHeader from './components/MenuHeader';
import Pomodoro from './components/Pomodoro';

const root = createRoot(document.body);
root.render(
  <main className="theme main">
    <MenuHeader />
    <Pomodoro />
  </main>
);