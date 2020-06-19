import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { getFamily, createStudent } from "../../../redux/actions/user-actions";
import {
  Button,
  Box,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
// import { createStudent } from "../Redux/actions/actions-users";
import {validateCredentials} from '../../../utils/validateCredentials'

import Name from './Name'
import Username from './Username'
import Password from './Password'

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
            <Name errors={errors} validateCredentials={validateCredentials} register={register}/>
            <Username errors={errors} validateCredentials={validateCredentials} register={register}/>
            <Password errors={errors} register={register} password={password}/>
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
