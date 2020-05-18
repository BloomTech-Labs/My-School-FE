import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PortfolioHeader from './PortfolioHeader';
import PortfolioLog from './PortfolioLog';

const Portfolio = () => {


    return(
        <div>
            <Router>
  
            <Route ><PortfolioHeader /></Route>
            <Route><PortfolioLog /></Route>
        
            </Router>
        </div>
    )
};

export default Portfolio;