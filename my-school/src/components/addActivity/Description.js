import React from 'react'
import {FormControl, FormLabel, Textarea} from '@chakra-ui/core'

const Description = ({register}) => {

    return (
        <FormControl my="20px" fontFamily="'Nunito'">
        <FormLabel htmlFor="description" fontWeight="bold">
          Description
        </FormLabel>
        <Textarea
          id="description"
          name="description"
          placeholder="Tell us all about what you did in this activity!"
          ref={register}
          borderColor="gray.400"
          focusBorderColor="myschoolblue"
          data-testid="description"
        />
      </FormControl>
    )
}

export default Description