import React from 'react'
import {FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/core'

const Username = ({errors, register, validateCredentials}) => {

    return(
        <FormControl isInvalid={errors.username} w="85%" mb="24px">
        <FormLabel htmlFor="username" fontWeight="700" color="gray.800">Username</FormLabel>
        <Input 
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username or email"
            ref={register({ validate: validateCredentials })} 
            defaultValue={''}
            data-testid='username'
            borderColor="gray.400"
            focusBorderColor="myschoolblue"
        />
        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
    </FormControl>
    )
}

export default Username