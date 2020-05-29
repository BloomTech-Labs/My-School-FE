import React from "react";
import { Box, Heading, Button, Flex, Icon } from "@chakra-ui/core";
import { Link as RRLink, Redirect } from "react-router-dom";

const Landing = () => {
  return (
    <>
    { localStorage.getItem('token') ? <Redirect to='/dashboard'/> : 
    <Box
    bg="myschoolblue"
    color="white"
    textAlign="center"
    width="100vw"
    height="100vh"
    overflow="hidden"
  >
    <Heading textAlign="center" paddingTop="5vh" marginBottom="5vh">
      Welcome to MySchool
    </Heading>
    <Flex align="center" justify="space-evenly" height="50vh">
      <Box bg="white" height="50vh" width="30vw">
        <Flex
        height='100%'
          direction="column"
          justify="space-evenly"
          align="center"
        >
          <Heading color="myschoolblue">Already have an account?</Heading>
          <Icon
            name="unlock"
            color="myschoolblue"
            size="20vh"
            textAlign="center"
          />
          <Button
            as={RRLink}
            to="/login"
            color="white"
            variant="solid"
            bg="myschoolorange"
            width="80%"
            fontSize="1.5rem"
          >
            Login
          </Button>
        </Flex>
      </Box>
      <Box bg="white" height="50vh" width="30vw">
      <Flex
        height='100%'
          direction="column"
          justify="space-evenly"
          align="center"
        >
          <Heading color="myschoolblue">Sign Your Family Up</Heading>
          <Icon
            name="edit"
            color="myschoolblue"
            size="20vh"
            textAlign="center"
          />
          <Button
            as={RRLink}
            to="/signup"
            color="white"
            variant="solid"
            bg="myschoolorange"
            width="80%"
            fontSize="1.5rem"
          >
            Register
          </Button>
        </Flex>
      </Box>
    </Flex>
    <Box className="landing" height="41vh" />
  </Box>
  }
   </>
  );
};


export default Landing;
