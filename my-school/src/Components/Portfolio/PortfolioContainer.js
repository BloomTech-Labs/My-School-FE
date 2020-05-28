
import React, { useEffect } from "react";
import { Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";
import MyDocument from "./PDFExporter";
import AddActivityForm from './Activity/AddActivity/AddActivityForm';
import ActivityOverview from './Activity/ActivityOverview';

const PortfolioContainer = ({ activities, getAllActivitiesForUser, user }) => {

    useEffect(() => {
      console.log(user)
      if(user){
      getAllActivitiesForUser(user.id)}
    }, [user])

  return (
    <div>
    <PortfolioHeader />
    
    <PortfolioBody />     
    <Route path="/add" render={ props => <AddActivityForm />} />
    <Route exact path="/doc" render={ _ => <MyDocument activities={activities} /> } />
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
