import "./styles/theme.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./i18n";import { ThemeProvider } from "./context/ThemeContext";import './index.css';
import { ToastProvider } from './components/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <ThemeProvider><App /></ThemeProvider>
    </ToastProvider>
  </React.StrictMode>
);
import './styles/mobile-overrides.css';
import './registerSW';
import './registerSW';
