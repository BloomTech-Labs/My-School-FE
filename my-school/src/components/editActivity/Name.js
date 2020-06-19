import React from 'react'
import {FormControl, FormLabel, FormErrorMessage, Input} from '@chakra-ui/core'

const Name = ({errors, register, activity}) => {

  function validateTitle(value) {
    let error;
    if (value.length === 0) {
      error = "A title is required";
    } else if (value.length < 3) {
      error = "Title must be at least 3 characters long";
    }
    return error || true;
  }
  
    return(
        
        <FormControl
        isInvalid={errors.name}
        style={{ fontWeight: "700" }}
      >
        <FormLabel htmlFor="name">
          Title
          <span style={{ color: "#e53e3e", margin: "4px" }}>
            *
          </span>
        </FormLabel>
        <Input
          type="text"
          id="name"
          name="name"
          ref={register({ validate: validateTitle })}
          defaultValue={activity.name}
          marginBottom="10px"
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    )
}

export default Name