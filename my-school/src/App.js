import React from 'react';
import './App.css';
import TopNav from './Components/TopNav';
import Portfolio from './Components/Portfolio';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import customTheme from './Styles/theme';
import ReactGA from "react-ga";
import Login from './Components/login.js'
import Register from './Components/RegistrationForm.js'

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
                <Login/>
              </Route>
              <Switch>
                <Route path = '/register'>
                  <Register />
                </Route>
              <Route exact path='/'>
                <TopNav />
                <Box>
                  <Portfolio />
                </Box>
              </Route>
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
  );
}

export default App;