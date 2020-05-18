import React from 'react';
// import './App.css';
import TopNav from './Components/TopNav';
import ActivityContainer from './Components/ActivityContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function App() {


  return (
        <ThemeProvider>
          <CSSReset />
          <div className="App">
            <TopNav />
            <Router>
            <p>This is the app.</p>
            <Route exact path='/portfolio/'component={ActivityContainer}/>
            </Router>
          </div>
        </ThemeProvider>
     
  );
}

export default App;