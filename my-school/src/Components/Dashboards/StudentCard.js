import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import fontN from "../../assets/Nunito_Sans/Nunito Sans Regular.ttf";
import { Image, Grid, Box, Heading } from "@chakra-ui/core";
import axios from 'axios';

function StudentCard({student}) {
  const [ family, setFamily ] = useState("")
  const history = useHistory();


  const pushToPortfolio = (id) => {
    history.push(`/portfolio/${student.id}`);
  };

  const getFamilyName = (id) => {
    axios.get(`https://my-school-v1.herokuapp.com/api/families/${student.family_id}`)
    .then(res => {
      console.log(res.data)
      setFamily(res.data.name)})
      .catch(err => {
        console.log(err, 'student card error')
      })
  }
 

  return (
      <Box>
      <Heading>{family} Family</Heading>
    <Grid
      templateColumns=".75fr .25fr 1fr .5fr .25fr .25fr"
      alignItems='left'
      className="student-cards"
      fontFamily= {fontN}
    >
      <Box>
          <Box onClick={() => pushToPortfolio(student.id)} width="100%" fontSize='1.2rem' fontWeight='500'>
              <Image src='' />
          <Heading>Child_Name's Portfolio </Heading>
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
