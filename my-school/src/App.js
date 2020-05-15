import React from 'react';
import './App.css';
import TopNav from './Components/TopNav';
import AddActivityForm from './Components/AddActivityForm';
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
            <Route exact path='/' component={} />
            <Route path='/portfolio'component={PortfolioContainer}/>
            <Route path='/addactivity' component={AddActivityForm} />
          </div>
        </ThemeProvider>
      </Router>
    </body>
  );
}

export default App;