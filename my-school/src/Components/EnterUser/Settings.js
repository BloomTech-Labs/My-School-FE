import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {  getUserByID, getFamilyByID } from '../../actions/actions-users';
import { Box, Button, Avatar } from '@chakra-ui/core';

const Settings = ({ user, getFamilyByID}) => {

     const id = (user.id); 

    const handleUpdate = () => {
        axios.put(`https://my-school-v1.herokuapp.com/api/users/${id}`)
        .then( res => getUserByID(user.id))
        .catch()
    };

    const handleDeleteAccount = () => {
        axios.delete(`https://my-school-v1.herokuapp.com/api/users/${id}`)
        .then( res => getFamilyByID(user.family_id))
        .catch()
    };

    return(
        <Box>
            <Box>
                <Avatar/>
                {user.name}
                Primary Account
            </Box>
            <Box>
                Email: {user.email} <span onClick={handleUpdate} value='email'>Update</span>
            </Box>
            <Box>
                Password:  {user.password} <span onClick={handleUpdate} value='password'>Update</span>
            </Box>
            <Box>
                <Button onClick={handleDeleteAccount}>Delete Account</Button>
            </Box>
        </Box>
    )
}


const mapStateToProps = (state) => {
    return {
      user: state.usersReducer.user,
      isLoading: state.usersReducer.isLoading,
      error: state.usersReducer.error,
    };
  };
  
  export default connect(mapStateToProps , { getFamilyByID })(Settings);
  