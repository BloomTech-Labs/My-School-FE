import React from 'react';
import {
    Flex,
    Box
} from '@chakra-ui/core';
import Login from './Login';
import Signup from './Signup';

const AuthPage = ({ login }) => {
    return (
        <Flex>
            {login ? <Login  /> : <Signup />}
            
            <Box
                bg="myschoolblue"
                w={2/3}
                h="100vh"
            >
                <svg height="100vh" width="100%" position="absolute" margin="0">
                    <circle cx="50vw" cy="130vh" r="359" fill="#FFBB00" />
                </svg>
{/* 
                <svg height="100vh" width="100%" position="absolute" margin="0" zIndex="10">
                    <circle cx="10vw" cy="1vh" r="435" fill="#FB6542"/>
                </svg> */}
            </Box>
        </Flex>
    )
}

export default AuthPage; 