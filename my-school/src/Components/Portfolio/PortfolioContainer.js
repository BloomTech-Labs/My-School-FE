
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";
import MyDocument from "./PDFExporter";


const PortfolioContainer = ({ activities, getAllActivitiesForUser, user}) => {

  const id = Number(localStorage.getItem('student_id')) || Number(localStorage.getItem('userId'));

    useEffect(() => {
      getAllActivitiesForUser(id)
    }, [getAllActivitiesForUser, user, id])

  return (
    <div>
      <PortfolioHeader />
      <PortfolioBody activities={activities}/>     
      <Route exact path="/export">
        <MyDocument activities={activities} />
      </Route>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser }) (PortfolioContainer);
