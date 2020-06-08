import React from "react";
import { Flex, Image, IconButton, Heading, Text, Box } from "@chakra-ui/core";
import placeholder from "../../assets/placeholder_img.png";
import {connect} from 'react-redux';
import {getAllActivitiesForUser} from '../../Redux/actions/actions-portfolio'
import moment from 'moment';
import {useHistory} from 'react-router-dom'

const StudentCard = ({ student, familyName, activities }) => {
  const history = useHistory()

  const lastActivity = activities.sort((a, b) => b.created_at - a.created_at)

  const pushToPortfolio = (id) => {
    localStorage.setItem('student_id', id);
    history.push(`/portfolio/${id}`);
  };

  return (
    <Flex width={['90vw', '90vw', '400px', '25vw']} direction="column" border="1px solid #ededed" borderRadius='15px' padding='1%' height={['30vh', '30vh', '30vh', '18vh']} justify='space-evenly'>
      <Flex justify='space-between'>
        <Image src={placeholder} size="45px" rounded="full" flexWrap="wrap" />
        <Flex direction="column" width="70%">
          <Heading as="h3" fontSize='1.2rem'>{student.name}'s Portfolio</Heading>
          <Text>{student.name} {familyName && familyName}</Text>
          </Flex>
          <IconButton icon="arrow-right" width='15%' variant='ghost' variantColor='blue' onClick={() => pushToPortfolio(student.id)}/>

      </Flex>
      <Flex direction='column'>
      <Text fontWeight='800' fontSize='.9rem'>LAST ACTIVITY</Text>
  {lastActivity[0] && <Text>{moment(lastActivity[0].created_at).format('ll').toUpperCase()} SUBMITTED {lastActivity[0].name}</Text>}
      </Flex>
    </Flex>
  );
};

//{moment(props.activity.completion_date).format("ll").toUpperCase()}

const mapStateToProps = (state) => {
  return {
    activities: state.portfolioReducer.activities
  }
}

export default connect(mapStateToProps, {getAllActivitiesForUser})(StudentCard)
