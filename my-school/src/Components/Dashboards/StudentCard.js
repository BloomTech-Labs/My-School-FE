import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import { Image, Grid, Box, Heading } from "@chakra-ui/core";


function StudentCard({student, family}) {
  
  const [ surname, setSurname] = useState('');
  const history = useHistory();
  setSurname(family.name);

  const pushToPortfolio = (id) => {
    history.push(`/portfolio/${id}`);
  };
 

  return (
      <Box>
      <Heading>{surname} Family</Heading>
    <Grid
      templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
      alignItems='left'
      className="student-cards"
      fontFamily= {fontN}
    >
      <Box>
          <Box onClick={() => pushToPortfolio(student.id)} width="100%" fontSize='1.2rem' fontWeight='500'>
              <Image src='' />
          <Heading>{student.name}'s Portfolio </Heading>
          <p>Child_Name`</p>
          </Box>

          <Box textAlign="left">
              LAST ACTIVITY:
              Submitted_date SUBMITTED submitted_title
          </Box>
      </Box>)
        })}
    </Grid>
    </Box>
  );
}

export default StudentCard;
