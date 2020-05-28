import React, { useRef } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    Flex,
    Text,
    Box,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Select,
    Checkbox,
    IconButton,
    Button,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const history = useHistory();
    const { handleSubmit, errors, register, watch } = useForm();

    // Watches password value, used to validate password_confirm field
    const password = useRef({});
    password.current = watch("password", "");

    // Submit handler
    function onSubmit(data) {
        console.log("Hello, sign up form has been submitted", data)

        const newFam = {
            name: data.family
        };

        axios.post("https://my-school-v1.herokuapp.com/api/families", newFam)
        .then(res => {
            console.log("Family created", res.data)
            const famId = res.data.id;

            const newUser = {
                username: data.email,
                email: data.email,
                password: data.password,
                family_id: famId,
                user_type_id: 1
            };

            axios.post("https://my-school-v1.herokuapp.com/api/auth/registration", newUser)
            .then(res => {
                console.log("Success! User created", res.data)

                const user = res.data.user;
                localStorage.setItem('auth', user.user_type_id);
                localStorage.setItem('userId' , user.id);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('family_id', user.family_id);

                history.push('/portfolio') //PLACEHOLDER -- need to update once parent dashboard & routes are in place OR email verification!
            })
            .catch(err => {
                console.log("Error creating new user acct", err)
            })
        })
        .catch(err => {
            console.log("Error creating family acct", err)
        })
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
                    color="gray.800"
                    textAlign="center"
                    mb="32px"
                >Sign Up</Text>

                {/* FAMILY NAME */}
                <FormControl isInvalid={errors.family} mb="32px">
                    <FormLabel htmlFor="family" fontWeight="700" color="gray.800">Family name</FormLabel>
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
                            w="300px"
                            borderColor="gray.400"
                        />
                        {/* NEEDS STYLING! */}
                        <Popover>
                            <PopoverTrigger>
                                <IconButton aria-label="family name information" icon="info-outline" color="#9BAFCB" ml="29px"/>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    This will be used to identify members of your family, so we can associate their accounts with yours.
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    <FormErrorMessage>{errors.family && errors.family.message}</FormErrorMessage>
                </FormControl>

                {/* EMAIL (will be username; can possibly be updated later) */}
                <FormControl isInvalid={errors.email} mb="32px">
                    <FormLabel htmlFor="email" fontWeight="700" color="gray.800">Email</FormLabel>
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
                        w="300px"
                        borderColor="gray.400"
                    />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                {/* PASSWORD */}
                <FormControl isInvalid={errors.password} mb="32px">
                    <FormLabel htmlFor="password" fontWeight="700" color="gray.800">Password</FormLabel>
                    <Input 
                        type="password" 
                        id="password"
                        name="password"
                        placeholder="Enter a strong password"
                        ref={register({
                            required: "You must enter a password",
                            minLength: {
                                value: 8,
                                message: "Your password must have at least 8 characters"
                            }
                        })}
                        w="300px"
                        borderColor="gray.400"
                    />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                {/* PASSWORD CONFIRMATION */}
                <FormControl isInvalid={errors.password_confirm} mb="32px">
                    <FormLabel htmlFor="password_confirm" fontWeight="700" color="gray.800">Confirm Password</FormLabel>
                    <Input 
                        type="password" 
                        id="password_confirm"
                        name="password_confirm"
                        placeholder="Enter the same password as above"
                        ref={register({
                            validate: value => 
                                value === password.current || "The passwords do not match"
                        })}
                        w="300px"
                        borderColor="gray.400"
                    />
                    <FormErrorMessage>{errors.password_confirm && errors.password_confirm.message}</FormErrorMessage>
                </FormControl>
                {/* STATE? */}
                <FormControl mb="32px">
                    <FormLabel fontWeight="700" color="gray.800">State</FormLabel>
                    <Select w="300px" borderColor="gray.400">
                        <option value="maryland">Maryland</option>
                    </Select>
                </FormControl>
                {/* CHECKBOX */}
                <FormControl>
                    <Checkbox>I am the parent or guardian of a child being homeschooled.</Checkbox>
                    {/* NEEDS STYLING! */}
                    <Popover>
                        <PopoverTrigger>
                            <IconButton aria-label="not a parent information" icon="info-outline" color="#9BAFCB" ml="19px"/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                If you're a student, please ask your parent or guardian to create an account for you.
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </FormControl>
                <Button
                    type="submit"
                    color="white"
                    bg="systemgreen"
                    p="8px 16px"
                    borderRadius="999px"
                    fontSize="1.125rem"
                    my="24px"
                >Submit</Button>
            </form>
            <Text fontSize=".875rem">Already have an account? <Link as={RouterLink} to="/login">Log in.</Link></Text>
            </Box>
        </Box>
    )
}

export default Signup;