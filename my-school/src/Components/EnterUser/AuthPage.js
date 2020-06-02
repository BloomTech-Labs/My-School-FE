import React from 'react';
import {
    Flex,
    Box,
    Image
} from '@chakra-ui/core';
import Login from './Login';
import Signup from './Signup';
import AuthPageImg from '../../assets/authPageImg.png';

const AuthPage = ({ login }) => {
    return (
        <Flex >
            {login ? <Login  /> : <Signup />}
            
            <Box
                bg="myschoolblue"
                w={["0", "0", "50%", "60%"]}
                h="100vh"
            >
                <Image src={AuthPageImg} h="100vh" w="100%" alt="blue background design with red and yellow circles" />
            </Box>
        </Flex>
    )
}

export default AuthPage; 