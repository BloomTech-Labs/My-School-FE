import React, { useState, useRef } from "react";
import { Flex, Button } from "@chakra-ui/core";
import DeleteUser from "./DeleteUser";

const SettingsButton = ({
  user,
  passwordField,
  EmailValidator,
  renderedUser,
  image,
  deleteAccount,
  deleteEntireFamily,
  id,
}) => {
  const [hover, setHover] = useState(false);
  const btnRef = useRef();

  return (
    <Flex
      paddingLeft="7rem"
      className="settings-box"
      justifyContent="space-around"
      w="30vw"
    >
      <Button
        m="1rem"
        type="submit"
        id="submit"
        isDisabled={
          (user.user_type_id === 2 &&
            passwordField === true &&
            user.password.length > 7 &&
            user.password === user.passwordConfirm &&
            user.name !== "" &&
            user.username !== "" &&
            user.username !== renderedUser.username &&
            user.name !== renderedUser.name) ||
          (user.user_type_id === 2 &&
            passwordField === false &&
            user.username !== renderedUser.username &&
            user.username !== "" &&
            user.name !== "") ||
          (user.user_type_id === 2 &&
            passwordField === true &&
            user.password.length > 7 &&
            user.password === user.passwordConfirm &&
            user.name !== "" &&
            user.username !== "") ||
          (user.user_type_id === 2 &&
            passwordField === false &&
            user.username !== "" &&
            user.name !== "" &&
            user.name !== renderedUser.name) ||
          (user.user_type_id === 2 &&
            passwordField === false &&
            user.name !== renderedUser.name &&
            user.username !== "" &&
            user.name !== "") ||
          (user.user_type_id === 1 &&
            passwordField === true &&
            user.password.length > 7 &&
            user.password === user.passwordConfirm &&
            user.username !== "" &&
            EmailValidator.validate(user.username) === true) ||
          (user.user_type_id === 1 &&
            passwordField === false &&
            user.username !== renderedUser.username &&
            EmailValidator.validate(user.username) === true) ||
          (user.user_type_id === 1 &&
            passwordField === false &&
            user.name !== renderedUser.name &&
            EmailValidator.validate(user.username) === true) ||
          image
            ? false
            : true
        }
        _focus={{ boxShadow: "outline" }}
        variant={hover ? "outline" : "solid"}
        variantColor="btnYellow"
        ref={btnRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Update Account
      </Button>
      <DeleteUser
        id={id}
        user={user}
        deleteAccount={deleteAccount}
        deleteEntireFamily={deleteEntireFamily}
      />
    </Flex>
  );
};

export default SettingsButton;
