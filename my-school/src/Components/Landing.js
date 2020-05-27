import React from 'react';
import { Box, Heading, Link } from "@chakra-ui/core";

const Landing = () => {

    return(
        <body>
            <Box>
                <Heading>
                    WELCOME -- to new users; + simple how-to images
                </Heading>
            </Box>
            <Box>
                
                <Link to = '/register'>Register</Link>
            
            </Box>
        </body>
    )
}

export default Landing;