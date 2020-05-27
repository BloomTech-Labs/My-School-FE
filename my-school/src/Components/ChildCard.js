import React, { useState, useEffect } from "react";
import fontN from "../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import { Image, Grid, Box, Heading } from "@chakra-ui/core";
import "../App.css";

function ChildCard() {



  const pushToPortfolio = (id) => {
    history.push(`/portfolio/${id}`);
  };

 

  return (
      <Box>
      <Heading>{Family_Name} Family</Heading>
    <Grid
      templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
      alignItems='left'
      className="child-card"
      fontFamily= {fontN}
    >
        {Children.map(k => {
            return(
                <Box>
                    <Box onClick={pushToPortfolio} width="100%" fontSize='1.2rem' fontWeight='500'>
                        <Image src='' />
                    <Heading>`${Child_Name}` Portfolio </Heading>
                    <p>`${Child_First_Name}{Child_Last_Name}`</p>
                    </Box>

                    <Box textAlign="left">
                        LAST ACTIVITY:
                        {Submitted_date} SUBMITTED {submitted_title}
                    </Box>
                </Box>)
        })}
    </Grid>
    </Box>
  );
}

export default ChildCard;
