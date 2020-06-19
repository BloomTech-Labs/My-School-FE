import React from 'react';
import {
    Flex,
    Box,
    Image,
    Text
} from '@chakra-ui/core';
import Login from './login';
import Signup from './signup';
import authPageImg from '../../assets/authPageImg.png';
import Logo from '../../assets/logo_white_bg.png';

const LoginAndRegister = ({ login }) => {
    const formTitle = {
        login: "Log In",
        signup: "Sign Up"
    };

    return (
        <Flex h="100vh">
            <Box w={["100%", "100%", "40%", "35%"]} mx="5%">
                <Image src={Logo} alt="MySchool logo" mt="32px" />
                <Box m="36px 0">
                    <Text
                        fontSize="1.125rem"
                        fontWeight="700"
                        color="gray.800"
                        textAlign="center"
                        mb="32px"
                    >
                        {login ? formTitle.login : formTitle.signup}
                    </Text>
                    {login ? <Login  /> : <Signup />}
                </Box>
            </Box>
            <Box
                bg="myschoolblue"
                w={["0", "0", "50%", "55%"]}
            >
                {!login ? 
                <Text 
                    fontSize={["0", "0", "2rem", "2.25rem"]} 
                    color="white" 
                    width="40%" 
                    position="fixed" 
                    top="30%" 
                    left={["0", "0", "56%", "52%"]}
                    zIndex="100"
                >
                    Finally, a portfolio builder that isn't a glorified spreadsheet
                </Text> : null}
                <Image src={authPageImg}  w={["0", "0", "50%", "55%"]} alt="blue background design with red and yellow circles" position="fixed"  bottom="0" right="0" />
            </Box>
        </Flex>
    )
}

export default LoginAndRegister; 