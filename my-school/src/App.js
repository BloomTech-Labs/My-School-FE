import React from 'react';
// import './App.css';
import TopNav from './Components/TopNav';
// import ActivityContainer from './Components/ActivityContainer';
import Portfolio from './Components/Portfolio';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import ReactGA from "react-ga"

function App() {

  React.useEffect( _ => {
    ReactGA.initialize("UA-156199574-5")
    ReactGA.event({category: "App", action: "App loaded" })
  },[])

  return (
        <ThemeProvider>
          <CSSReset />
          <div className="App">
            <Router>
              <TopNav />
              <Box>
                <Portfolio />
              </Box>
            </Router>
          </div>
        </ThemeProvider>
  );
}

export default App;