import React, { useEffect, useState } from  'react';
import axios from 'axios';
import { Box, Image, Avatar, Heading, IconButton, Flex } from '@chakra-ui/core';


export default function TopNav() {

  const [ user, setUser ] = useState({});

  useEffect(() => {
    //the user will not be hard coded once we add dynamic routes and logins
    axios.get('https://my-school-v1.herokuapp.com/api/users/3') 
    .then(res =>{
      setUser(res.data)
    })
    .catch(err => console.log(err))
  }, []);


    return (
      <nav className="top-nav">
        
        <Box bg="papayawhip" w="100%" >
          <Flex direction="row" align="center">
          <Flex align="flex-start">
          {/* logo link to landing page? */}
          <a href="http://www.myschoolathome.io"><Image src='https://myschoolathome.io/static/media/logo100-100.ba4f14e7.svg' alt='MySchool logo'/></a>
          </Flex>
          <Flex align="flex-end">
          {/* Image linked to current user account https://my-school-v1.herokuapp.com/api/users/3/ */}
          <Avatar size="md" src={user.profile_picture} alt="user avatar" />

          {/* Name linked to current user account https://my-school-v1.herokuapp.com/api/users/3/*/}
          <Heading as="h3" size="lg" alt="user name" >{user.name}</Heading>

          {/* Gear icon for parent users -- route body to account settings */}
          <IconButton variantColor="teal" aria-label="Account Settings" icon="settings"/>
          </Flex>
          </Flex>
          </Box>
       
      </nav>
    );
  }