import React from 'react';
import './App.css';
import TopNav from './Components/TopNav';
import Portfolio from './Components/Portfolio';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import customTheme from './Styles/theme';
import ReactGA from "react-ga"

function App() {

  React.useEffect( _ => {
    ReactGA.initialize("UA-156199574-5")
    ReactGA.event({category: "App", action: "App loaded" })
  },[])

  return (
        <ThemeProvider theme={customTheme} >
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