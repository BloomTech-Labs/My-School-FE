import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getFamilyByID } from '../../actions/actions-users';
import StudentCard from './StudentCard';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";

import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/core';

const AdminDash = ({ user, isLoading }) => {
  const history = useHistory();
  const [ students, setStudents ] = useState([]);
  const [ familyName, setFamilyName ] = useState('');
  const id = localStorage.getItem('family_id')


  useEffect( _ => {
    ReactGA.initialize("UA-156199574-5")
    ReactGA.pageview("/dashboard")
  },[])

  useEffect(() =>{
    axios.get(`https://my-school-v1.herokuapp.com/api/families/${id}`)
    .then( res=> {
      setFamilyName(res.data.family.name)
      setStudents(res.data.people.filter(s => s.user_type_id===2))
      
    })
  }, [id]);


  const addStudent = () => {
    history.push('/addstudent')
  };
  

  if(students.length > 0){
    return(
      <>
      <Heading as='h3' margin='10'>{familyName || 'Your' } Family</Heading>
      <SimpleGrid className='student-list' minChildWidth='120px' min spacing='25px'>
      
      {isLoading === true ? <Loader color={'#329795'} /> : 

        (students.map(student =>{
            return(
              <StudentCard 
              key={student.id} 
              student={student} 
              className='card' 
              familyName={familyName}/>
             )
        }))
      }
      
    
      <Box as={Button} onClick={addStudent} className='card' minHeight='150px'> + Add new student</Box>
      </SimpleGrid>
      </>

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
