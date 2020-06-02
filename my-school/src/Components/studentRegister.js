import React,{ useRef } from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Flex,
    Text
} from '@chakra-ui/core';
import { useToast } from "@chakra-ui/core";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const StudentRegister = props => {

    const methods = useForm();
    const toast = useToast();
    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const handleStudentRegister = (data) => {
        //need to bring the the last name field once sarah adds it to the database
        const studentUser = {
            username: data.username,
            password: data.password,
            family_id: localStorage.getItem('family_id'),
            name: data.firstname,
            user_type_id: 2, 
        }
        //this needs to be axios with auth once we get the auth middleware up in the backend
        axios.post(`https://my-school-v1.herokuapp.com/api/auth/registration`, studentUser)
        .then(res => {
            toast({
                title: "Account created.",
                description: `"We've created your account for ${data.firstname}.`,
                status: "success",
                duration: 9000,
                isClosable: true,
              })
              history.push(`/dashboard/${localStorage.getItem('userId')}`)
        })
        .catch(err => console.log(err.message))
    };

    const validateCrudentials = (value) => {
        if(value <= 0 ){
            return 'must provide a crudentials'
        }else{
            return null
        }
    };

    return (
        <>
        <Flex  flexDirection='column' p='1.5rem 0rem 3rem 10rem'>
            <h3 style={{ fontWeight:'bold'}}>New account setup</h3>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(handleStudentRegister)}> 
                    <Flex w='80vw' flexWrap='wrap' p='1.5rem 1.5rem 1.5rem 0rem' h='50vh' data-testid='form-submit'>
                        <FormControl isInvalid={errors.username} w='39%'>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="This is what they will use to log in"
                                ref={register({ validate: validateCrudentials })} 
                                defaultValue={''}
                                w='55%'
                                data-testid='username'
                            />
                            <FormErrorMessage> 
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.portfolioname} w='50%'>
                            <FormLabel htmlFor="porfolioname">Portfolio name (optional)</FormLabel>
                            <Input 
                                type="text"
                                id="porfolioname"
                                name="porfolioname"
                                placeholder='Useful for nicknames! ie: Bobby’s portfolio'
                                ref={register()} 
                                defaultValue={''}
                                w='60%'
                                data-testid='portName'
                            />
                            <FormErrorMessage> 
                                {errors.portfolioname && errors.portfolioname.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password} w='39%'>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input 
                                type="password"
                                id="password"
                                name="password"
                                ref={register({
                                    required: "You must specify a password",
                                    minLength: {
                                      value: 8,
                                      message: "Password must have at least 8 characters"
                                    }
                                  })} 
                                defaultValue={''}
                                placeholder={`Your child's password`}
                                w='55%'
                                data-testid='password'
                            />
                            <FormErrorMessage> 
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.firstname} w='50%'>
                            <FormLabel htmlFor="firstname">First name</FormLabel>
                            <Input 
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder={`What is the student's first name?`}
                                ref={register({ validate: validateCrudentials })} 
                                defaultValue={''}
                                w='60%'
                                data-testid='fName'
                            />
                            <FormErrorMessage> 
                                {errors.firstname && errors.firstname.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.passwordconfirmation} w='39%'>
                            <FormLabel htmlFor="passwordconfirmation">Password (Confirmation)</FormLabel>
                            <Input 
                                type="password"
                                id="passwordconfirmation"
                                name="passwordconfirmation"
                                placeholder={`Confirm your Child's password`}
                                ref={register({
                                    validate: value =>
                                      value === password.current || "The passwords do not match"
                                  })} 
                                defaultValue={''}
                                w='55%'
                                data-testid='password2'
                            />
                            <FormErrorMessage> 
                                {errors.passwordconfirmation && errors.passwordconfirmation.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.lastname} w='50%'>
                            <FormLabel htmlFor="lastname">Last name</FormLabel>
                            <Input 
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder={`What is the student's last name?`}
                                ref={register({ validate: validateCrudentials })} 
                                defaultValue={''}
                                w='60%'
                                data-testid='lName'
                            />
                            <FormErrorMessage> 
                                {errors.lastname && errors.lastname.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Text w='60%'></Text>
                        <Button variantColor="green"w='7vw' type='submit' data-testid='submit'>Submit </Button>
                    </Flex>
                </form>
            </FormContext>
            </Flex>
        </>
    )
}

export default StudentRegister;