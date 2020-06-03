import React from "react";
import {Button} from '@chakra-ui/core';
import {Link as RRLink} from 'react-router-dom'

const HeaderButton = ({ text, icon, location }) => {
  return (
    <Button as={RRLink} to={location} leftIcon={icon} color="white" margin="10px" variantColor='btnBlue' variant="solid">
      {text}
    </Button>
  );
};

export default HeaderButton 