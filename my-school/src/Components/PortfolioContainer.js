import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './PortfolioHeader';
import PortfolioLog from './PortfolioLog';
import AddActivityForm from './AddActivityForm';


export default function EntryList(){

//BODY --> NAV(STAYS) + MAIN CONTAINER(CHANGES)
//MAIN CONTAINER --> PORTFOLIO CONTAINER + ADD FORM ( + OTHER FUNCTIONS)
//PORTFOLIO CONTAINER --> HEADER (STAYS) + LOG (CHANGES)

  return (
   <Router>
     <Header />
     <Route path='/portfolio' component={PortfolioLog} />
     <Route path ='/addactivity' component={AddActivityForm} />
   </Router>
  );
}
