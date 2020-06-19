import React from 'react'
import {FormControl, FormLabel, Textarea} from '@chakra-ui/core'

const Description = ({register, activity}) => {

    return(
        <FormControl>
        <FormLabel
          htmlFor="description"
          style={{ fontWeight: "700" }}
        >
          Description
        </FormLabel>
        <Textarea
          id="description"
          name="description"
          ref={register}
          defaultValue={activity.description}
          marginBottom="10px"
        />
      </FormControl>
    )
}

export default Description