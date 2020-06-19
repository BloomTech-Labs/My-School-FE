import React from 'react'
import {Flex, FormControl, FormLabel, Checkbox, Button} from '@chakra-ui/core'

const RememberMe = ({errors, setChecked, checked}) => {
    
    const handleChecked = () => {
        setChecked(!checked)
    }

    return(
        <Flex alignItems='baseline' justify="space-between" w="85%">
        <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="remember" display="none"></FormLabel>
            <Checkbox 
                borderColor="gray.400" 
                size="md" 
                variantColor="green" 
                onChange={handleChecked} 
                data-testid='checked'
            >
                Remember me
            </Checkbox>
        </FormControl>
        <Button 
            type='submit' 
            data-testid='submit' 
            color="white"
            bg="green.600"
            p="8px 16px"
            borderRadius="4px"
            fontSize="1.125rem"
            _hover={{bg: "green.700"}}
            my="16px"
        >Login</Button>
    </Flex>
    )
}

export default RememberMe