  
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "./theme";
import ReactGA from "react-ga";
//Components
import PrivateRoute from './utils/PrivateRoute'
import Landing from './components/landingPage'
import LoginAndRegister from './components/loginAndRegister'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import Settings from './components/settings'
import StudentRegistration from './components/loginAndRegister/studentRegistration'
import AddActivityForm from './components/addActivity'
import PortfolioContainer from './components/portfolioContainer'
import PDFExporter from './components/pdf'
import ActivityOverview from './components/overviewCard'
function App() {
  React.useEffect((_) => {
    ReactGA.initialize("UA-156199574-5");
    ReactGA.event({ category: "App", action: "App loaded" });
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <div className="App">
        <Router >
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route path='/login'>
              <LoginAndRegister login={true} />
            </Route>
            <Route path='/signup'>
              <LoginAndRegister login={false} />
            </Route>
            <PrivateRoute>
              <Route path='/dashboard'>
                <Layout page={<Dashboard />} />
              </Route>
              <Route path='/settings/:id'>
                <Layout page={<Settings />} />
              </Route>
              <Route exact path='/portfolio/:id'>
                <Layout page={<PortfolioContainer />} />
              </Route>
              <Route path='/portfolio/:id/add'>
                <Layout page={<AddActivityForm />} />
              </Route>
              <Route path='/portfolio/:id/export'>
                <Layout page={<PDFExporter />} />
              </Route>
              <Route path='/activity/:id'>
                <Layout page={<ActivityOverview />} />
              </Route>
              <Route path='/add-student'>
                <Layout page={<StudentRegistration />} />
              </Route>
            </PrivateRoute> 
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;