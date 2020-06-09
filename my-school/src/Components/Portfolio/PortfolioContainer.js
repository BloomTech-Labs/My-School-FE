
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../Redux/actions/actions-portfolio";
// Components
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";


const PortfolioContainer = ({ activities, getAllActivitiesForUser, family }) => {
  const studentId = useParams().id
  const student = family.filter(f => f.id === Number(studentId));

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getAllActivitiesForUser(studentId);
    return () => {
      isMounted = false
    }
  }, [getAllActivitiesForUser, studentId]);

  return (
    <div>
      <PortfolioHeader student={student}/>
      <PortfolioBody />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    family: state.usersReducer.family
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(PortfolioContainer);
