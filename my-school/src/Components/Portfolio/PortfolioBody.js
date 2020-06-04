import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllActivitiesForUser } from "../../actions/actions-portfolio.js";
import ActivityCard from "./Activity/ActivityCard";
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import {Grid, Text} from '@chakra-ui/core'

const PortfolioBody = ({ activities, getAllActivitiesForUser, isLoading, user }) => {
  const [sortedActivities, setSortedActivities] = useState([]);
  const override = css`
    margin-top: 10rem;
  `;

  useEffect((_) => {
    ReactGA.initialize("UA-156199574-5");
    ReactGA.pageview("/portfolio");
  }, []);

  const id = Number(localStorage.getItem('student_id'));

  useEffect(() => {
    getAllActivitiesForUser(id);
  }, [getAllActivitiesForUser]);

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [activities]);

  return (
    <div className="portfolio-list">
      {isLoading === true ? (
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height:'40vh'}}>
        <Loader color={'#375E97'} css={override} height='75vh'/>
        </div>
      ) : (
        <>
        <Grid
        templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
        alignItems='center'
        className="activity-card"
        fontWeight='800'
      >
          <Text>Activity</Text>
          <Text>Duration</Text>
          <Text textAlign='center'>Subject</Text>
          <Text>Date</Text>
        </Grid>
        {sortedActivities.map((activity) => {
          return (
            <ActivityCard
            key={activity.id}
            activity={activity}
            className="card"
          />
          )
        })}
        </>
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
