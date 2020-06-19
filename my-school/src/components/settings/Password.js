import React from "react";
import { Flex, Text, FormLabel, Input } from "@chakra-ui/core";

const Password = ({
  passwordField,
  user,
  handleInputs,
  setPasswordField,
  setUser,
}) => {
  const addPasswordField = () => {
    if (passwordField === false) {
      setPasswordField(true);
      setUser({
        ...user,
        password: "",
        passwordConfirm: "",
      });
    } else {
      return null;
    }
  };

  const closePasswordField = () => {
    setPasswordField(false);
    setUser({
      ...user,
      password: "password",
    });
  };

  return (
    <Flex
      paddingLeft="7rem"
      className="settings-box"
      direction="row"
      alignItems="center"
    >
      <Text paddingRight="1rem" w="10vw">
        {passwordField === true ? `New Password` : `Password`}:
      </Text>
      <FormLabel htmlFor="password"></FormLabel>
      <Input
        name="password"
        id="password"
        type="password"
        placeholder="Enter new password"
        value={user.password}
        onClick={addPasswordField}
        w="20vw"
        onChange={handleInputs}
      ></Input>
      <Text
        paddingLeft="1.5rem"
        color="blue"
        textDecoration="underline"
        onClick={closePasswordField}
      >
        {passwordField === true ? `Cancel` : null}
      </Text>
    </Flex>
  );
};

export default Password;
