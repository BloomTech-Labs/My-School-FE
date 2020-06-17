import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../Redux/actions/actions-users'
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
import validateCredentials from '../../utils/validateCredentials';

const Login = ({onSubmit, login}) => {

    const [invalid] = useState(false);
    const [ checked, setChecked ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    
    const handleLogin = userData => {
        login({...userData, rememberMe: checked})
        .then(res => {
            if (res && res.data && res.data.user && res.data.user.user_type_id === 1) {
                history.push("/dashboard");
            } else if (res && res.data && res.data.user) {
                history.push(`/portfolio/${res.data.user.id}`);
            } 
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleChecked = () => {
        setChecked(!checked)
    }

    return (
        <>
            <form onSubmit={onSubmit || handleSubmit(handleLogin)} data-testid='form-submit' >
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
            <Text fontSize=".875rem">New to MySchool? <Link as={RouterLink} to="/signup" color='#FB6542'>Create an account.</Link></Text>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.usersReducer.user
    }
}

export default connect(mapStateToProps, {login})(Login)
