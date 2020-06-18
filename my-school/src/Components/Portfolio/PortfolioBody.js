import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ActivityCard from "./Activity/ActivityCard";
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import { Grid, Text, Box } from '@chakra-ui/core'

const PortfolioBody = ({ activities, isLoading, user }) => {

  const [sortedActivities, setSortedActivities] = useState([]);
  const isParent = user.user_type_id === 1 ? true : false;
  const gridTemplateColumns = isParent ? "1fr .3fr .3fr .3fr .5fr " : "1fr .3fr .3fr .3fr"
  const override = css`
    margin-top: 10rem;
  `;

  useEffect((_) => {
    ReactGA.initialize("UA-156199574-5");
    ReactGA.pageview("/portfolio");
  }, []);

  useEffect(() => {
    const sorted = activities.sort((a, b) => b.id - a.id);
    setSortedActivities(sorted);
  }, [activities]);

  return (
    // <div className="portfolio-list">
    <Box my="36px" mx={["8px", "20px", "40px", "40px"]} color="gray.700">
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
              bg="gray.200"
            >
              <Text px="4px">Name</Text>
              <Text px="4px">Subject</Text>
              <Text px="4px">Duration</Text>
              <Text px="4px">Date</Text>
              {isParent && <Text px="4px" textAlign="center">Actions</Text>}
            </Grid>
            {sortedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isParent={isParent}
                className="card"
              />
            ))
            }
            {sortedActivities.length === 0 && isLoading === false ?
              <Text textAlign='center' color='blue.900' width='100%' my='5%'>You currently have no entries in your portfolio <br /> It's time to get to work!</Text>
              : ''}
          </>
        )}
    {/* </div> */}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    activities: state.portfolioReducer.activities,
    isLoading: state.portfolioReducer.isLoading,
    error: state.portfolioReducer.error,
  };
};

export default connect(mapStateToProps, {})(PortfolioBody);
