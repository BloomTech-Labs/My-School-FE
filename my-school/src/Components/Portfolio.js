
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioLog from "./PortfolioLog";
import MyDocument from "./PDFExporter";
import AddActivityForm from './AddActivity/AddActivityForm';
import ActivityOverview from './ActivityOverview';

const Portfolio = ({ activities, getAllActivitiesForUser }) => {

    useEffect(() => {
      getAllActivitiesForUser(3)
    }, [getAllActivitiesForUser])

  return (
    <div>
      <PortfolioHeader />
      <Switch>
      <Route path="/portfolio" component={PortfolioLog} />     
      <Route exact path="/add" render={ props => <AddActivityForm />} />
      <Route exact path="/doc" render={ _ => <MyDocument activities={activities} /> } />
      <Route path='/activity/:id' render={props => <ActivityOverview activities={activities}/>}/>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser }) (Portfolio);
