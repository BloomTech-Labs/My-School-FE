import React from 'react'
import {Flex, Input, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody} from '@chakra-ui/core'

const FamilyName = ({register}) => {
    
    return(
        <Flex flexDirection="row" align="center">
        <Input 
            id="family"
            name="family"
            placeholder="Last name works best"
            focusBorderColor="myschoolblue"
            ref={register({
                required: "You must specify a family name",
                minLength: {
                    value: 2,
                    message: "Family name must be at least 2 characters"
                }
            })}
            borderColor="gray.400"
            data-testid='family'
            w="85%"
        />
        <Popover>
            <PopoverTrigger>
                <IconButton 
                    aria-label="family name information" 
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
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold">
                    About Family Name
                </PopoverHeader>
                <PopoverBody>
                    This will be used to identify members of your family, so we can associate their accounts with yours. As an admin, you will be able to create accounts for multiple students &amp; manage them from your account. 
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </Flex>
    )
}

export default FamilyName