
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../Redux/actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";


const PortfolioContainer = ({ activities, getAllActivitiesForUser, user }) => {

  const studentId = useParams().id

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getAllActivitiesForUser(studentId);
    return () => {
      isMounted = false
    }
  }, [getAllActivitiesForUser, studentId]);

  return (
    <div>
      <PortfolioHeader />
      <PortfolioBody activities={activities} studentId={studentId}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(PortfolioContainer);
