import React from 'react';
// import './App.css';
import TopNav from './Components/TopNav';

import ActivityContainer from './Components/ActivityContainer';
import AddActivityForm from './Components/Forms/AddActivityForm';
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
            <p>This is the app.</p>
            <Route exact path='/'component={ActivityContainer}/>
            {/* <Route path='/register' component={} />
                <Route path='/settings' component={} /> */}
            <Route path='/addentry' component={AddActivityForm} />
          </div>
        </ThemeProvider>
      </Router>
    </body>
  );
}

export default App;