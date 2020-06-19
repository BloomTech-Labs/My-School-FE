import React from 'react'
import {Input} from '@chakra-ui/core'

const Email = ({register}) => {

    return (
        <Input 
        id="email"
        name="email"
        placeholder="You'll use this email to log in"
        focusBorderColor="myschoolblue"
        ref={register({
            required: "You must enter an email",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address"
            }
        })}
        borderColor="gray.400"
        data-testid='email'
        w="100%"
    />
    )
}

export default Email