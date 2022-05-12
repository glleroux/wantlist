import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <MantineProvider theme={{ colorScheme: 'dark' }}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </MantineProvider>,
  document.getElementById('root')
);
