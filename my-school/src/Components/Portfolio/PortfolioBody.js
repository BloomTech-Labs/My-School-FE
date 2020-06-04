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
  const isParent = localStorage.getItem('student_id') ? true : false;
  const gridTemplateColumns = isParent ? ".75fr .25fr 1fr .5fr .25fr .25fr" : "1.25fr .25fr .25fr .25fr"
  const override = css`
    margin-top: 10rem;
  `;

  useEffect((_) => {
    ReactGA.initialize("UA-156199574-5");
    ReactGA.pageview("/portfolio");
  }, []);

  const id = Number(localStorage.getItem('student_id')) || Number(localStorage.getItem('userId'));

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getAllActivitiesForUser(id);
    return () => {
      isMounted = false
    }
  }, [getAllActivitiesForUser, id]);

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [activities]);

  return (
    <div className="portfolio-list">
      {isLoading === true ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader color={'#375E97'} css={override} height='75vh' />
        </div>
      ) : (
        <>
        <Grid
        templateColumns={gridTemplateColumns}
        alignItems='center'
        className="activity-card"
        fontWeight='800'
      >
          <Text>Name</Text>
          <Text>Subject</Text>
          <Text textAlign='center'>Duration</Text>
          <Text>Date</Text>
          {isParent && <Text>Options</Text>}
        </Grid>
          {sortedActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              className="card"
            />
          ))
        }
        {sortedActivities.length === 0 && isLoading === false ? 
        <Text textAlign='center' color='blue.900'>You currently have no entries in you're portfolio <br/> It's time to get to work!</Text>
        : ''}
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
