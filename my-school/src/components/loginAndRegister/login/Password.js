import React from 'react'
import {FormControl, FormLabel, Input, FormErrorMessage} from '@chakra-ui/core'

const Password = ({errors, validateCredentials, register}) => {

    return (
        <FormControl isInvalid={errors.password} w="85%" mb="40px">
        <FormLabel htmlFor="password" fontWeight="700" color="gray.800">Password</FormLabel>
        <Input 
            type="password"
            id="password"
            name="password"
            placeholder="Your secure password"
            ref={register({ validate: validateCredentials })} 
            defaultValue={''}
            data-testid='password'
            borderColor="gray.400"
            focusBorderColor="myschoolblue"
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
    )
}

export default Password