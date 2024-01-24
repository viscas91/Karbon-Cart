import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './shell/src/components/App.tsx'
import { store } from './common/src/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
)
