import React from "react";
import "./App.css";
import TopNav from "./Components/Dashboards/Nav/TopNav";
import MainContainer from "./Components/Dashboards/MainContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "./Styles/theme";
import ReactGA from "react-ga";
import Landing from "./Components/EnterUser/Landing";
import AuthPage from "./Components/EnterUser/AuthPage";
import AddActivityForm from "./Components/Portfolio/Activity/AddActivity/AddActivityForm";
import PortfolioContainer from "./Components/Portfolio/PortfolioContainer";
import PDFExporter from './Components/Portfolio/PDFExporter'
import ActivityOverview from "./Components/Portfolio/Activity/ActivityOverview";
import StudentRegistration from './Components/studentRegister';

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
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path = '/login'>
            <AuthPage login={true} />
          </Route>
          <Route path='/signup'>
            <AuthPage login={false} />
          </Route>
          <Route path='/dashboard'>
            <TopNav />
            <MainContainer />
          </Route>
          <Route path='/settings'>
            <TopNav />
            {/*Account settings*/}
          </Route>
          <Route exact path='/portfolio/:id'>
            <TopNav />
            <PortfolioContainer />
          </Route>
          <Route path='/portfolio/:id/add'>
            <TopNav />
            <AddActivityForm />
          </Route>
          <Route path='/portfolio/:id/export'>
            <TopNav />
            <PDFExporter />
          </Route>
          <Route path='/activity/:id'>
            <TopNav />
            <ActivityOverview />
          </Route>
          <Route path='/addstudent'>
            <TopNav/>
            <StudentRegistration/>
          </Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
