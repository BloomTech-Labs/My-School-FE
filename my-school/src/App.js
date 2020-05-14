import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <div className="App">
          This is the app.
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
