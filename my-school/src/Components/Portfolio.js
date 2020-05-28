
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioLog from "./PortfolioLog";
import MyDocument from "./PDFExporter";
import AddActivityForm from './AddActivity/AddActivityForm';
import ActivityOverview from './ActivityOverview';
import StudentRegister from './studentRegister';

const Portfolio = ({ activities, getAllActivitiesForUser }) => {

    useEffect(() => {
      getAllActivitiesForUser(3)
    }, [getAllActivitiesForUser])

  return (
    <div>
      <PortfolioHeader />
      <Route exact path="/try/portfolio/:id" component={PortfolioLog} />     
      <Route exact path="/try/add" render={ props => <AddActivityForm />} />
      <Route exact path="/try/doc" render={ _ => <MyDocument activities={activities} /> } />
      <Route path='/try/activity/:id' render={props => <ActivityOverview activities={activities}/>}/>
      <Route path='/try/studentregister' render={ props => <StudentRegister/>} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser }) (Portfolio);
