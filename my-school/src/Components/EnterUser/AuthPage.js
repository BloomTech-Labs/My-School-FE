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
            {login ? <Login /> : <Signup />}
            <Box
                bg="myschoolblue"
                w={2/3}
                h="100vh"
            ></Box>
        </Flex>
    )
}

export default AuthPage; 