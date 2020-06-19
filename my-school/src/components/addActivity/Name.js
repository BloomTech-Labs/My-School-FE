import React from 'react'
import {FormControl, FormLabel, Box, Input, FormErrorMessage} from '@chakra-ui/core'
import validateTitle from "../../utils/validateTitle";

const Name = ({errors, register}) => {

    return (
        <FormControl
        isInvalid={errors.name}
        mb="20px"
        fontFamily="'Nunito'"
      >
        <FormLabel htmlFor="name" fontWeight="bold">
          Title
          <Box as="span" color="warningred" m="4px">
            *
          </Box>
        </FormLabel>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="What would you like to name your activity?"
          ref={register({ validate: validateTitle })}
          borderColor="gray.400"
          errorBorderColor="warningred"
          focusBorderColor="myschoolblue"
          data-testid="name"
        />
        <FormErrorMessage color="warningred">
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

    )
}

export default Name