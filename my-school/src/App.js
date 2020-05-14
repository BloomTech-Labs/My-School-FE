import React from 'react';
// import logo from './logo.svg';
import AddActivityForm from './Components/AddActivityForm';
import './App.css';
import TopNav from './Components/TopNav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function App() {
  return (
    <body>
    <TopNav />
    <Router>
      <ThemeProvider>
        <CSSReset />
        <div className="App">
          This is the app.
          <Route path='/' component={} />
          <Route path='/portfolio'component={PortfolioContainer}/>
          <Route path='/addactivity' component={AddActivityForm} />
        </div>
      </ThemeProvider>
    </Router>
    </body>
  );
}

export default App;