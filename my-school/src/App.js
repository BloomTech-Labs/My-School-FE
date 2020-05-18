import React from 'react';
// import './App.css';
import TopNav from './Components/TopNav';
// import ActivityContainer from './Components/ActivityContainer';
import PortfolioLog from './Components/PortfolioLog';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";

function App() {


  return (
        <ThemeProvider>
          <CSSReset />
          <div className="App">
           
            <Router>
            <TopNav />
            <Box>
            <p>This is the app.</p>
            <PortfolioLog />
            </Box>
            </Router>

          </div>
        </ThemeProvider>
     
  );
}

export default App;