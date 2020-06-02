import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Checkbox,
    Flex,
    Text,
    Link
} from '@chakra-ui/core';
import axios from 'axios';
import validateCredentials from '../../utils/validateCredentials';

const Login = props => {

    const [invalid, setInvalid] = useState(false);
    const [ checked, setChecked ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const handleLogin = (data) => {
        const user = {
            ...data,
            rememberMe: checked
        }
        
        axios.post(`https://my-school-v1.herokuapp.com/api/auth/login`, user)
        .then(res => {
            const user = res.data.user;
            localStorage.setItem('auth', user.user_type_id);
            localStorage.setItem('userId' , user.id);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('family_id', user.family_id);
            history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
            setInvalid(true)
        })
    };

    const handleChecked = () => {
        setChecked(!checked)
    }
    return (
        <>
            <form onSubmit={props.onSubmit || handleSubmit(handleLogin)} data-testid='form-submit' >
                {/* USERNAME/EMAIL */}
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
                {/* PASSWORD */}
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

                {invalid === true && 
                    <Text 
                        p=".5rem"
                        color="warningred"
                        fontSize="sm"
                    >
                        Oops! Account not found. Please enter valid credentials or <Link as={RouterLink} to="/signup">create an account</Link>.
                    </Text>
                }

                {/* REMEMBER ME */}
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
            </form>
            <Text fontSize=".875rem">New to MySchool? <Link as={RouterLink} to="/signup">Create an account.</Link></Text>
        </>
    )
}

export default Login;

