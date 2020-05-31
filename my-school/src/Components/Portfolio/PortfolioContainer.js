
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";
import MyDocument from "./PDFExporter";
import AddActivityForm from './Activity/AddActivity/AddActivityForm';
import ActivityOverview from './Activity/ActivityOverview';

const PortfolioContainer = ({ activities, getAllActivitiesForUser, user}) => {

    useEffect(() => {
      if(user){
      getAllActivitiesForUser(user.id)}
    }, [getAllActivitiesForUser, user])

  return (
    <div>
    <PortfolioHeader />
    
    <PortfolioBody />     
    <Route path="/add" render={ props => <AddActivityForm />} />
    <Route exact path="/export" render={ _ => <MyDocument activities={activities} /> } />
    <Route path='/activity/:id' render={props => <ActivityOverview activities={activities}/>}/>
 
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser }) (PortfolioContainer);
