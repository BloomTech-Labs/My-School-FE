import React from 'react'
import {FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/core'

const Name = ({errors, validateCredentials, register}) => {

    return(
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
    )
}

export default Name