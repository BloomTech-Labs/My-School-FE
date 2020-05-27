import React from 'react';
import {
    Text,
    Box,
    Flex,
    FormErrorMessage,
    FormLabel,
    FormHelperText,
    FormControl,
    Input,
    Select,
    Checkbox,
    Icon,
    Button
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const { handleSubmit } = useForm();

    // Submit handler
    function onSubmit(data) {
        console.log("Hello, sign up form has been submitted", data)
    }

    return (
        <Box w={1/3}>
            <Text
                fontSize="1.5rem"
                fontWeight="700"
                color="myschoolblue"
                m="37px 52px"
            >MySchool</Text>
            <Box m="76px 65px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Text
                    fontSize="1.125rem"
                    fontWeight="700"
                    color="gray01"
                    textAlign="center"
                >Sign Up</Text>
                {/* FAMILY NAME */}
                <FormControl>
                    <FormLabel>Family name</FormLabel>
                    <Input /><Icon name="info-outline" />
                    {/* Should icon be popover or tooltip? */}
                </FormControl>
                {/* EMAIL (will be username; can possibly be updated later) */}
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input />
                </FormControl>
                {/* PASSWORD */}
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input />
                </FormControl>
                {/* PASSWORD CONFIRMATION */}
                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input />
                </FormControl>
                {/* STATE? */}
                <FormControl>
                    <FormLabel>State</FormLabel>
                    <Select>
                        <option value="maryland">Maryland</option>
                    </Select>
                </FormControl>
                {/* CHECKBOX */}
                <FormControl>
                    <Checkbox>I am the parent of a child being homeschooled.</Checkbox><Icon name="info-outline" />
                    {/* Should icon be popover or tooltip? */}
                </FormControl>
                <Button
                    type="submit"
                    color="white"
                    bg="systemgreen"
                    p="8px 16px"
                    borderRadius="999px"
                    fontSize="1.125rem"
                >Submit</Button>
            </form>
            </Box>
        </Box>
    )
}

export default Signup;