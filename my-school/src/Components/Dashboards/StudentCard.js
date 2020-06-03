import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import { Image, Grid, Box, Heading, Text, Flex, Icon } from "@chakra-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import {getAllActivitiesForUser} from '../../actions/actions-portfolio'

function StudentCard({ student, familyName, ...props }) {
  const history = useHistory();
  const {getAllActivitiesForUser} = props

  const pushToPortfolio = (id) => {
    history.push(`/portfolio/${student.id}`);
  };

  useEffect(() => {
    getAllActivitiesForUser(student.id)
    console.log('running')
  }, [ getAllActivitiesForUser])

  return (
    // <Box border='1px solid black' width='33%'>
    //   <Grid
    //     templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
    //     alignItems="left"
    //     className="student-cards"
    //     fontFamily={fontN}
    //   >
    //     <Box>
    //       <Box
    //         onClick={() => pushToPortfolio(student.id)}
    //         width="100%"
    //         fontSize="1.2rem"
    //         fontWeight="500"
    //       >
    //         <Image src="" />
    //         <Text fontSize='1.5rem'>{student.name}'s Portfolio</Text>
    //         <p>Child_Name`</p>
    //       </Box>

    //       <Box textAlign="left">
    //         LAST ACTIVITY: Submitted_date SUBMITTED submitted_title
    //       </Box>
    //     </Box>
    //   </Grid>
    // </Box>
    <Flex width='33%' border='1px solid black'>
      <Box width='90%'>
      <Heading as='h3' fontSize='1.7rem'>
      {student.name}'s Portfolio
      </Heading>
      <Text>
        {`${student.name} ${familyName}`}
      </Text>
      <Heading as='h4' fontSize='1.2rem'>
        LAST ACTIVITY
      </Heading>
      <Text>{props.activities.length ? props.activities[0].date_completed : 'No Activities Logged Yet'}</Text>
      </Box>
      <Icon name='arrow-right' alignSelf='flex-end' my='25px'/>
    </Flex>
  );
}

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  }
}

export default connect(mapStateToProps, {getAllActivitiesForUser})(StudentCard)

