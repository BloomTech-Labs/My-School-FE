import React from "react";
import { Flex, Text, FormLabel, Input } from "@chakra-ui/core";

const PasswordConfirm = ({ handleInputs, user }) => {
  return (
    <Flex
      paddingLeft="7rem"
      className="settings-box"
      direction="row"
      alignItems="baseline"
    >
      <Text paddingRight="1rem" w="10vw">
        New Password Confirmation:
      </Text>
      <FormLabel htmlFor="passwordConfirm"></FormLabel>
      <Input
        name="passwordConfirm"
        id="passwordConfirm"
        type="password"
        placeholder="Confirm new password"
        value={user.passwordConfirm}
        w="20vw"
        onChange={handleInputs}
      ></Input>
    </Flex>
  );
};

export default PasswordConfirm;
