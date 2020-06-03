import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getFamilyByID } from '../../actions/actions-users';
import StudentCard from './StudentCard';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { Box, Button } from '@chakra-ui/core';

const AdminDash = ({ user, isLoading }) => {
     
  const history = useHistory();

  const [ students, setStudents ] = useState([]);

  useEffect( _ => {
    ReactGA.initialize("UA-156199574-5")
    ReactGA.pageview("/dashboard")
  },[])

  useEffect(() =>{
    //the user will not be hard coded once we add dynamic routes and logins
    axios.get(`https://my-school-v1.herokuapp.com/api/families/4`)
    .then( res=> {
      console.log('admindash', res.data.people)
      const family = res.data.people;
      //What am I doing wrong here.....
      setStudents(family.filter(s => s.user_type_id=2))
    })
  }, []);


  const addStudent = () => {
    history.push('/addstudent')
  };
  

  if(students.length > 0){        
    return(
      <div className='student-list'>

      {isLoading === true ? <Loader color={'#329795'} /> : 

        (students.map(student =>{
          if(student.user_type_id === 2){
            return(
              <StudentCard 
              key={student.id} 
              student={student} 
              className='card' />
            )
          } else if(student.user_type_id === 1){
            return null
          }
        }))
      }
      
    
      <Box as={Button} onClick={addStudent}> + Add new student</Box>
      </div>
    )
  } else {

    return(
      <Box as={Button} onClick={addStudent}> + Add new student</Box>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    family: state.usersReducer.family,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps , { getFamilyByID })(AdminDash);
