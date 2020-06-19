import React from 'react'
import {FormControl, Flex, Checkbox as ChCheckbox, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, FormErrorMessage} from '@chakra-ui/core'

const Checkbox = ({errors, register}) => {
     return (
        <FormControl isInvalid={errors.parent_confirm}>
        <Flex>
        <ChCheckbox 
            name="parent_confirm"
            borderColor="gray.400"
            variantColor="green"
            ref={register({
                required: "You must be a parent or guardian to create an account. If you're a student, please ask your parent or guardian to create an account for you."
            })}
            data-testid='checked'
        >I am the parent of a child being homeschooled.</ChCheckbox>
        <Popover>
            <PopoverTrigger>
                <IconButton 
                    aria-label="not a parent information" 
                    icon="info-outline" 
                    ml="5%" 
                    fontSize="1.4rem"
                    w="5%"
                    minW="0"
                    bg="none"
                    color="gray.400"
                    _hover={{ color: "gray.500" }} 
                    _active={{ color: "gray.500"}}  
                />
            </PopoverTrigger>
            <PopoverContent 
                zIndex="10" 
                bg="gray.100" 
                color="gray.700" 
                borderColor="gray.400" 
                fontSize="sm" 
                borderRadius="8px"
            >
                <PopoverArrow />
                <PopoverCloseButton color="gray.700"/>
                <PopoverBody>
                    This sign up form creates a parent admin account. Student accounts can only be created by a parent admin from their Account Setting menu.
                </PopoverBody>
            </PopoverContent>
        </Popover>
        <FormErrorMessage>{errors.parent_confirm && errors.parent_confirm.message}</FormErrorMessage>
        </Flex>
    </FormControl>
     )
}

export default Checkbox