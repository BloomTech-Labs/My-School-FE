import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const NavLeft = () => {
  return (
      <Link to="/">
        <Flex direction='column' align='center'>
        <Text fontSize="1.6rem" color="white" height='1.8rem'>
          MySchool
        </Text>
        <svg
          width="100"
          height="10"
          viewBox="0 0 80 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="2.5"
            height="30"
            rx="1.1452"
            transform="matrix(-1.57167e-06 1 -1 -1.2157e-09 79.8664 0.354675)"
            fill="#FB6542"
          />
          <rect
            width="2.5"
            height="30"
            rx="1.1452"
            transform="matrix(-1.57167e-06 1 -1 -1.2157e-09 54.7541 0.354675)"
            fill="#FFBB00"
          />
          <rect
            width="2.5"
            height="30"
            rx="1.1452"
            transform="matrix(-1.57167e-06 1 -1 -1.2157e-09 29.9459 0.354675)"
            fill="#375E97"
          />
        </svg>
        </Flex>
        </Link>
        
      
    
  );
};
export default NavLeft;
