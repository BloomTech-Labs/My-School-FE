import React, { useState, useRef } from "react";
import { Button } from "@chakra-ui/core";
import * as EmailValidator from "email-validator";

const UpdateButton = ({ user, passwordField, renderedUser, image }) => {
  const [hover, setHover] = useState(false);
  const btnRef = useRef();

  return (
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
      textTransform="uppercase"
      letterSpacing="1.2px"
      size="xs"
      mx="4px"
      variant="outline"
      variantColor="green"
      p='1.5rem'
    >
      Update Account
    </Button>
  );
};

export default UpdateButton;
