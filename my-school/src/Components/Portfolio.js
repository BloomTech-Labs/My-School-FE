import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PortfolioHeader from './PortfolioHeader';
import PortfolioLog from './PortfolioLog';
import AddActivityForm from './AddActivity/AddActivityForm';

const Portfolio = () => {


    return(
        <div>
            <Router>
  
            <Route ><PortfolioHeader /></Route>
            <div>
            <Switch>
            <Route  path='/portfolio'><PortfolioLog /></Route>
            <Route  path='/add'><AddActivityForm /></Route>
            </Switch>
            </div>
        
            </Router>
        </div>
    )
};

export default Portfolio;