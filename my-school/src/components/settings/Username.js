import React from "react";
import { Flex, Text, FormLabel, Input } from "@chakra-ui/core";

const Username = ({ handleInputs, user }) => {
  return (
    <Flex
      paddingLeft="7rem"
      paddingTop="2.5rem"
      className="settings-box"
      direction="row"
      alignItems="center"
    >
      <Text paddingRight="1rem" w="10vw">
        Username:
      </Text>
      <FormLabel htmlFor="username"></FormLabel>
      <Input
        name="username"
        id="username"
        type="text"
        placeholder={`Enter username`}
        value={user.username}
        w="20vw"
        onChange={handleInputs}
      ></Input>
    </Flex>
  );
};

export default Username;
