import React from 'react';
import './App.css';
import TopNav from './Components/TopNav';
import Portfolio from './Components/Portfolio';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import customTheme from './Styles/theme';
import ReactGA from "react-ga";
// import Login from './Components/login.js';
// import Signup from './Components/Signup';
import AuthPage from './Components/AuthPage';

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
              <Route path='/login'>
                <AuthPage login={true} />
              </Route>
              <Route path='/signup'>
                <AuthPage login={false} />
              </Route>
              <Route path='/'>
                <TopNav />
                <Box>
                  <Portfolio />
                </Box>
              </Route>
            </Router>
          </div>
        </ThemeProvider>
  );
}

export default App;