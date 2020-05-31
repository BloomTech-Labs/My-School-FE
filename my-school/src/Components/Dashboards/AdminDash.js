import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getFamilyByID, deleteStudent } from '../../actions/actions-users';
import StudentCard from './StudentCard';
import ReactGA from "react-ga";
import Loader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import StudentRegister from '../studentRegister';

const AdminDash = ({user, isLoading, getFamilyByID, deleteStudent}) => {
      const [students, setStudents] = useState([]);
      const override = css`
      margin-top: 10rem;
      `
      useEffect( _ => {
        ReactGA.initialize("UA-156199574-5")
        ReactGA.pageview("/dashboard")
      },[])

      useEffect(() => {
        getFamilyByID(3); 
        if(user.type_id === 2){
        setStudents(user)} else {
          console.log( "No students")
        }
      }, [getFamilyByID, user]);
      
    return(
      <div>
        <div className='student-list'>
          {isLoading === true ? <Loader color={'#329795'} css={override}/> : 
          (students.map(student =>(<StudentCard key={student.id} student={student} className='card' />)))}
        </div>
        <div>This is the Admin Dash which will be a list of kids portfolios</div>
        <div onClick={StudentRegister}>Add new student</div>
        <div onClick={deleteStudent}>Delete Portfolio</div>
        </div>
        
    )
};

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    isLoading: state.usersReducer.isLoading,
    error: state.usersReducer.error,
  };
};

export default connect(mapStateToProps , { getFamilyByID, deleteStudent })(AdminDash);
