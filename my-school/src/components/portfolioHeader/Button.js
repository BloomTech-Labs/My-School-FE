import React from "react";
import {Button as CHButton} from '@chakra-ui/core';
import {Link as RRLink} from 'react-router-dom'

const Button = ({ text, icon, location }) => {
  return (
    <CHButton as={RRLink} to={location} leftIcon={icon} color="white" margin="10px" variantColor='btnBlue' variant="solid">
      {text}
    </CHButton>
  );
};

export default Button 