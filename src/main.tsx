import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* your app */}
      <Analytics />
    </>
  );
}

export default App;
