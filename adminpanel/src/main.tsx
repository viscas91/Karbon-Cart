import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './shell/src/components/App.tsx'
import { store } from './common/src/store.ts';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme()}>
    <CssBaseline />
    <Provider store={store}> 
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
