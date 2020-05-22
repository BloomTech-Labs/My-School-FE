import React from "react";
import {Button} from '@chakra-ui/core';
import {Link} from 'react-router-dom'

const HeaderButton = ({ text, icon, location }) => {
  return (
    <Link to={location}>
    <Button leftIcon={icon} color="white" margin="10px" bg="#375E97" variant="solid">
      {text}
    </Button>
    </Link>
  );
};

export default HeaderButton