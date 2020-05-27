import React from 'react';
import { Box, Heading, Link, Button, Flex } from "@chakra-ui/core";


const Landing = () => {

    return(
        <Box bg="myschoolblue" color='white'  textAlign='center' width='100%' height='100%' overflow='hidden'>
            
            <Heading margin=' 20px 0 20px 0'>
                WELCOME -- to new users; + simple how-to images
            </Heading>

            <Link href = '/signup' bg='systemgreen' margin='10px' padding='10px' borderColor='transparent' borderRadius='15%'>Register</Link>
            <Link href = '/login' bg='systemgreen' margin='10px' padding='10px' borderColor='transparent' borderRadius='15%'>Sign In</Link>     
            <Box className='landing' height='500px'></Box>
        </Box>
    )
}

export default Landing;