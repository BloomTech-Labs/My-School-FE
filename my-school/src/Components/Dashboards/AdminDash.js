import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { getFamily } from '../../Redux/actions/actions-users'
import { Box, Button, Heading } from '@chakra-ui/core';

const AdminDash = ({ user, isLoading, family, familyName }) => {
  const history = useHistory();

  useEffect(_ => {
    ReactGA.initialize("UA-156199574-5")
    ReactGA.pageview("/dashboard")
  }, [])

  const addStudent = () => {
    history.push('/add-student')
  };

  return (
    <>
      <Heading>{user.familyName} Family</Heading>

      <div className='student-list'>

        {isLoading === true ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <Loader color={'#375E97'} height='75vh' />
          </div>
        ) :

          (family.map(student => {
            return student.user_type_id === 2 &&
              (
                <StudentCard
                  key={student.id}
                  student={student}
                  className='card'
                  familyName={familyName} />
              )
          }))
        }

        <Box as={Button} onClick={addStudent}> + Add new student</Box>
      </div>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    familyName: state.usersReducer.familyName,
    family: state.usersReducer.family,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps, { getFamily })(AdminDash);
