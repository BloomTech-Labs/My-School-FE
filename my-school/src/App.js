import React from 'react';
import './App.css';
import TopNav from './Components/Dashboards/Nav/TopNav';
import MainContainer from './Components/Dashboards/MainContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from './Styles/theme';
import ReactGA from "react-ga";
import Landing from './Components/EnterUser/Landing';
import AuthPage from './Components/EnterUser/AuthPage';

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
              <Route exact path= '/' >
                <Landing />
              </Route>
              <Route path='/login'>
                <AuthPage login={true} />
              </Route>
              <Route path='/signup'>
                <AuthPage login={false} />
              </Route>
              <Route path='/dashboard'>
                <TopNav />
                <Route>
                <MainContainer />
                </Route>
                <Route>
                  <PortfolioContainer />
                </Route>
              </Route>
            </Router>
          </div>
        </ThemeProvider>
  );
};

export default App;