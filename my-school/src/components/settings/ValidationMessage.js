import React from "react";
import { Text, Icon } from "@chakra-ui/core";

const ValidationMessage = ({ color, message, icon }) => {
  return (
    <Text color={color} paddingLeft="21vw">
      <Icon name={icon} size="24px" color={color} /> {message}
    </Text>
  );
};

export default ValidationMessage;

//"red.500"
