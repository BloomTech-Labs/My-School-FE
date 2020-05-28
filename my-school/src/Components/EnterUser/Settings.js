import React from 'react';
import axios from 'axios';
import { Box, Avatar } from '@chakra-ui/core';

export const Settings = (user) => {

    const handleUpdate = () => {
        axios.put('')
        .then()
        .catch()
    };

    const handleDeleteAccount = () => {
        axios.delete('')
        .then()
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
                Email: {user.email} <span onCLick={handleUpdate} value='email'>Update</span>
                Password:  {user.password} <span onCLick={handleUpdate} value='password'>Update</span>
                <span onClick={handleDeleteAccount}>Delete Account</span>
            </Box>
        </Box>
    )
}