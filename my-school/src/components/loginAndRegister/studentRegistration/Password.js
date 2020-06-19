import React from 'react'
import {FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/core'

const Password = ({errors, register, password}) => {

    return (
        <>
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
      </>
    )
}

export default Password