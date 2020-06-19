import React from 'react'
import {FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/core'

const Username = ({errors, register, validateCredentials}) => {

    return(
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
    )
}

export default Username