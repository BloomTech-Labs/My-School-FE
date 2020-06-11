import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import { connect } from "react-redux";
import { getFamily } from "../Redux/actions/actions-users";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { createStudent } from "../Redux/actions/actions-users";
import {validateCredentials} from '../utils/validateCredentials'

const StudentRegistration = (props) => {
  const toast = useToast();
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const handleStudentRegister = (data) => {
    props.createStudent(props.user.family_id, data, 2);
    toast({
      title: "Account created.",
      description: `We've created an account for ${data.firstname}.`,
      status: "success",
      duration: 4500,
      isClosable: true,
    });
    history.push(`/dashboard`);
  };

  return (
    <Box mx={["8px", "20px", "40px", "40px"]} my="36px">
        <Box w={["100%", "100%", "75%", "50%"]}>
        <form onSubmit={handleSubmit(handleStudentRegister)}>
          <FormControl isInvalid={errors.firstname} mb="32px">
              <FormLabel htmlFor="firstname" fontWeight="bold">First name</FormLabel>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                placeholder={`What is the student's first name?`}
                ref={register({ validate: validateCredentials })}
                defaultValue={""}
                data-testid="fName"
                borderColor="gray.400"
                focusBorderColor="myschoolblue"
              />
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username} mb="32px">
              <FormLabel htmlFor="username" fontWeight="bold">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="This is what they will use to log in"
                ref={register({ validate: validateCredentials })}
                defaultValue={""}
                data-testid="username"
                borderColor="gray.400"
                focusBorderColor="myschoolblue"
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mb="32px">
              <FormLabel htmlFor="password" fontWeight="bold">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                defaultValue={""}
                placeholder={`Your student's password`}
                data-testid="password"
                borderColor="gray.400"
                focusBorderColor="myschoolblue"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.passwordconfirmation} mb="32px">
              <FormLabel htmlFor="passwordconfirmation" fontWeight="bold">
                Password (Confirmation)
              </FormLabel>
              <Input
                type="password"
                id="passwordconfirmation"
                name="passwordconfirmation"
                placeholder={`Confirm your student's password`}
                ref={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                defaultValue={""}
                data-testid="password2"
                borderColor="gray.400"
                focusBorderColor="myschoolblue"
              />
              <FormErrorMessage>
                {errors.passwordconfirmation &&
                  errors.passwordconfirmation.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              variantColor="green"
              fontSize="lg"
              w="90px"
              type="submit"
              data-testid="submit"
            >
              Submit{" "}
            </Button>
        </form>
        </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    family: state.usersReducer.family,
    isLoading: state.usersReducer.isLoading,
    err: state.usersReducer.error,
  };
};
export default connect(mapStateToProps, { getFamily, createStudent })(
  StudentRegistration
);
