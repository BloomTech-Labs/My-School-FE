import React from 'react';
import {
    Flex,
    Box,
    Image,
    Text
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
                {!login ? 
                <Text 
                    fontSize={["0", "0", "2rem", "2.25rem"]} 
                    color="white" 
                    width="40%" 
                    position="absolute" 
                    top="30%" 
                    left={["0", "0", "56%", "52%"]}
                >
                    Finally, a portfolio builder that isn't a glorified spreadsheet
                </Text> : null}

                <Image src={AuthPageImg} h="100vh" w="100%" alt="blue background design with red and yellow circles" />
            </Box>
        </Flex>
    )
}

export default AuthPage; 