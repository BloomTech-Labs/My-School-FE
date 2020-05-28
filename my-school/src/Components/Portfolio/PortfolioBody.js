import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../actions/actions-portfolio.js";
import ActivityCard from "./Activity/ActivityCard";
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";

const PortfolioBody = ({ activities, getAllActivitiesForUser, isLoading }) => {
  const [sortedActivities, setSortedActivities] = useState([]);
  const override = css`
    margin-top: 10rem;
  `;

  useEffect((_) => {
    ReactGA.initialize("UA-156199574-5");
    ReactGA.pageview("/portfolio");
  }, []);

  useEffect(() => {
    //the paramter passed in will not be hard coded once we make user login and dynamic routes
    getAllActivitiesForUser(3);
  }, []);

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [activities]);
  return (
    <div className="portfolio-list">
      {isLoading === true ? (
        <Loader color={"#329795"} css={override} />
      ) : (
        sortedActivities.map((activity) => {
          return (
            <ActivityCard
            key={activity.id}
            activity={activity}
            className="card"
          />
          )
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, { getAllActivitiesForUser })(
  PortfolioBody
);
