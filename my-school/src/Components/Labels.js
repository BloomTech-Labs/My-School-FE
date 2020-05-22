import React from 'react';
import '../App.css';
import {
    Grid,
    Box
} from '@chakra-ui/core';
import fontN from '../assets/Nunito_Sans/Nunito Sans Regular.ttf';


export default function Labels() {

    return (
        <header>
            <Grid
                templateColumns=".75fr .25fr 1fr .5fr .5fr"
                alignItems='center'
                className="activity-card"
                fontFamily={fontN}
                width="100%"
                bg="#DBE8FB"
            >
                <Box textAlign="center"  w="100%" h="10" >
                    <p>Assignment Title</p>
                </Box>
                <Box textAlign="center" w="100%" h="10" >
                    <p>Duration</p>
                </Box>
                <Box textAlign="center" w="100%" h="10" >
                    <p>Subject</p>
                </Box>
                <Box textAlign="center" w="100%" h="10" >
                    <p>Submitted</p>
                </Box>
                <Box w="100%" h="10" >
                    <span />
                </Box>
            </Grid>
        </header>
    )

};