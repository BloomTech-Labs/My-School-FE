import React, { useRef } from "react";
import { useForm } from "react-hook-form";
// import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import { connect } from "react-redux";
import { getFamily } from "../Redux/actions/actions-users";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { createStudent } from "../Redux/actions/actions-users";

const StudentRegister = (props) => {
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
    history.push(`/dashboard/`);
  };

  const validateCredentials = (value) => {
    if (value <= 0) {
      return "must provide credentials";
    } else {
      return null;
    }
  };

  const pushHistory = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <Flex flexDirection="column" p="1.5rem 0rem 3rem 10rem">
        <Text
          paddingBottom="3.5rem"
          fontSize="1.125rem"
          fontWeight="700"
          color="gray.800"
        >
          <span color="blue.900" className="link" onClick={pushHistory}>
            Dashboard
          </span>{" "}
          / Add a new acoount
        </Text>
        <h3 style={{ fontWeight: "bold" }}>New account setup</h3>

        <form onSubmit={handleSubmit(handleStudentRegister)}>
          <Flex
            w="80vw"
            flexWrap="wrap"
            p="1.5rem 1.5rem 1.5rem 0rem"
            h="50vh"
            data-testid="form-submit"
          >
            <FormControl isInvalid={errors.username} w="39%">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="This is what they will use to log in"
                ref={register({ validate: validateCredentials })}
                defaultValue={""}
                w="55%"
                data-testid="username"
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.portfolioname} w="50%">
              <FormLabel htmlFor="porfolioname">
                Portfolio name (optional)
              </FormLabel>
              <Input
                type="text"
                id="porfolioname"
                name="porfolioname"
                placeholder="Useful for nicknames! ie: Bobby’s portfolio"
                ref={register()}
                defaultValue={""}
                w="60%"
                data-testid="portName"
              />
              <FormErrorMessage>
                {errors.portfolioname && errors.portfolioname.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} w="39%">
              <FormLabel htmlFor="password">Password</FormLabel>
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
                w="55%"
                data-testid="password"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.firstname} w="50%">
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                placeholder={`What is the student's first name?`}
                ref={register({ validate: validateCredentials })}
                defaultValue={""}
                w="60%"
                data-testid="fName"
              />
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.passwordconfirmation} w="39%">
              <FormLabel htmlFor="passwordconfirmation">
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
                w="55%"
                data-testid="password2"
              />
              <FormErrorMessage>
                {errors.passwordconfirmation &&
                  errors.passwordconfirmation.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastname} w="50%">
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                placeholder={`What is the student's last name?`}
                ref={register({ validate: validateCredentials })}
                defaultValue={""}
                w="60%"
                data-testid="lName"
              />
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>
            <Text w="60%"></Text>
            <Button
              variantColor="green"
              w="7vw"
              type="submit"
              data-testid="submit"
            >
              Submit{" "}
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
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
  StudentRegister
);
// export default StudentRegister;
