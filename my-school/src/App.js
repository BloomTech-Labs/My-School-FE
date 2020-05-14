import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import AddActivityForm from './Components/Forms/AddActivityForm';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <div className="App">
          This is the app.
          <AddActivityForm />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
