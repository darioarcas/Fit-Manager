import React from 'react';
import ReactDOM from 'react-dom/client';
import { FitManagerAppPublico } from './FitManagerAppPublico';
import './styles/style.scss'; // npm i sass

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FitManagerAppPublico />
  </React.StrictMode>
);
