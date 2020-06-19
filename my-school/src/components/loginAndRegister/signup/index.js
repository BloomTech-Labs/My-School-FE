import React, { useRef } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Select,
  Button,
  Link,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { register as registration } from "../../../redux/actions/user-actions";
import StateSelect from "./StateSelect";

import FamilyName from "./FamilyName";
import Email from "./Email";
import Password from "./Password";
import Checkbox from "./Checkbox";

const Signup = ({ registration }) => {
  const history = useHistory();
  const { handleSubmit, errors, register, watch } = useForm();

  // Watches password value, used to validate password_confirm field
  const password = useRef({});
  password.current = watch("password", "");

  // Submit handler
  function onSubmit(data) {
    const newFam = {
      name: data.family,
    };
    registration(newFam, data, 1);
    history.push("/dashboard");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form-submit">
        {/* FAMILY NAME */}
        <FormControl isInvalid={errors.family} mb="24px">
          <FormLabel htmlFor="family" fontWeight="700" color="gray.800">
            Family name
          </FormLabel>
          <FamilyName register={register} />
          <FormErrorMessage>
            {errors.family && errors.family.message}
          </FormErrorMessage>
        </FormControl>

        {/* EMAIL (will be username; can possibly be updated later) */}
        <FormControl isInvalid={errors.email} mb="24px" w="85%">
          <FormLabel htmlFor="email" fontWeight="700" color="gray.800">
            Email
          </FormLabel>
          <Email register={register} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        {/* PASSWORD */}
        <Password errors={errors} register={register} password={password} />
        {/* STATE */}
        <FormControl mb="24px" w="85%">
          <FormLabel fontWeight="700" color="gray.800">
            State
          </FormLabel>
          <Select borderColor="gray.400" data-testid="state" defaultValue="MD">
            <StateSelect />
          </Select>
        </FormControl>
        {/* CHECKBOX */}
        <Checkbox errors={errors} register={register} />
        <Button
          type="submit"
          color="white"
          bg="green.600"
          p="8px 16px"
          borderRadius="999px"
          fontSize="1.125rem"
          my="16px"
          data-testid="submit"
          _hover={{ bg: "green.700" }}
        >
          Submit
        </Button>
      </form>
      <Text fontSize=".875rem">
        Already have an account?{" "}
        <Link as={RouterLink} to="/login" color="#FB6542">
          Log in.
        </Link>
      </Text>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
  };
};

export default connect(mapStateToProps, { registration })(Signup);
