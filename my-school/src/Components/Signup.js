import React, { useRef } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    Text,
    Box,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Select,
    Checkbox,
    Icon,
    Button,
    Link
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

                history.push('/portfolio')
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
                    color="gray01"
                    textAlign="center"
                >Sign Up</Text>

                {/* FAMILY NAME */}
                <FormControl isInvalid={errors.family}>
                    <FormLabel htmlFor="family">Family name</FormLabel>
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
                    />
                    <Icon name="info-outline" />
                    {/* Should icon be popover or tooltip? */}
                    <FormErrorMessage>{errors.family && errors.family.message}</FormErrorMessage>
                </FormControl>

                {/* EMAIL (will be username; can possibly be updated later) */}
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
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
                    />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                {/* PASSWORD */}
                <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
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
                    />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                {/* PASSWORD CONFIRMATION */}
                <FormControl isInvalid={errors.password_confirm}>
                    <FormLabel htmlFor="password_confirm">Confirm Password</FormLabel>
                    <Input 
                        type="password" 
                        id="password_confirm"
                        name="password_confirm"
                        placeholder="Enter the same password as above"
                        ref={register({
                            validate: value => 
                                value === password.current || "The passwords do not match"
                        })}
                    />
                    <FormErrorMessage>{errors.password_confirm && errors.password_confirm.message}</FormErrorMessage>
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
            <Text>Already have an account? <Link as={RouterLink} to="/login">Log in.</Link></Text>
            </Box>
        </Box>
    )
}

export default Signup;