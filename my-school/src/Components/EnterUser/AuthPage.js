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
            >
                {!login ? 
                <Text 
                    fontSize={["0", "0", "2rem", "2.25rem"]} 
                    color="white" 
                    width="40%" 
                    position="absolute" 
                    top="30%" 
                    left={["0", "0", "56%", "52%"]}
                    zIndex="100"
                >
                    Finally, a portfolio builder that isn't a glorified spreadsheet
                </Text> : null}

                <Image src={AuthPageImg}  w={["0", "0", "50%", "60%"]} alt="blue background design with red and yellow circles" position="fixed"  bottom="0" right="0" />
            </Box>
        </Flex>
    )
}

export default AuthPage; 