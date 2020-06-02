import React, { ref, useState } from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Stack,
    Checkbox,
    Flex,
    Text
} from '@chakra-ui/core';
import axios from 'axios';
import validateCredentials from '../../utils/validateCredentials'

const Login = props => {

    const methods = useForm();
    const [invalid, setInvalid] = useState(false);
    const [ checked, setChecked ] = useState(false)
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
        <Flex flexDirection='column' w={["100%", "100%", "50%", "40%"]} p='4rem'>
            <Text
                fontSize="1.5rem"
                fontWeight="700"
                color="myschoolblue"
                p='1rem 0rem'
            >MySchool</Text>
            <FormContext {...methods} >
                <form onSubmit={props.onSubmit || handleSubmit(handleLogin)} data-testid='form-submit' > 
                    <FormControl isInvalid={errors.username} p='1rem 0rem'>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input 
                            type="text"
                            id="username"
                            name="username"
                            ref={register({ validate: validateCredentials })} 
                            defaultValue={''}
                            w='70%'
                            data-testid='username'
                        />
                        <FormErrorMessage> 
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} p='1rem 0rem'>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            ref={register({ validate: validateCredentials })} 
                            defaultValue={''}
                            w='70%'
                            data-testid='password'
                        />
                        <FormErrorMessage> 
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    {invalid === true && <Text p='.5rem' color="red"><span style={{color: 'red'}}>*Invalid Crudentials*</span></Text>}
                    <Flex alignItems='baseline'>
                        <FormControl isInvalid={errors.password} p='1rem 8rem 0rem 0rem'>
                            <FormLabel htmlFor="remember"></FormLabel>
                            <Checkbox size="md" variantColor="green" onChange={handleChecked} data-testid='checked'>Remember me</Checkbox>
                        </FormControl>
                        <Button variantColor="green" type='submit' data-testid='submit' >Login</Button>
                    </Flex>
                </form>
            </FormContext>
        </Flex>
    )
}

export default Login;

