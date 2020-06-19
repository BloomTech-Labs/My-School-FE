import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";

const Password = ({ register, errors, password }) => {
  return (
    <>
      <FormControl isInvalid={errors.password} mb="24px" w="85%">
        <FormLabel htmlFor="password" fontWeight="700" color="gray.800">
          Password
        </FormLabel>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a strong password"
          ref={register({
            required: "You must enter a password",
            minLength: {
              value: 8,
              message: "Your password must have at least 8 characters",
            },
          })}
          borderColor="gray.400"
          data-testid="password"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      {/* PASSWORD CONFIRMATION */}
      <FormControl isInvalid={errors.password_confirm} mb="24px" w="85%">
        <FormLabel htmlFor="password_confirm" fontWeight="700" color="gray.800">
          Confirm Password
        </FormLabel>
        <Input
          type="password"
          id="password_confirm"
          name="password_confirm"
          placeholder="Enter the same password as above"
          ref={register({
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          borderColor="gray.400"
          data-testid="password2"
        />
        <FormErrorMessage>
          {errors.password_confirm && errors.password_confirm.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default Password;
