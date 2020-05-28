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
import axios from 'axios'

const Login = () => {

    const methods = useForm();
    const [invalid, setInvalid] = useState(false);
    const [ checked, setChecked ] = useState(false)
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const handleLogin = (data) => {
        console.log(checked, 'inside the login function')
        const user = {
            ...data,
            rememberMe: checked
        }
        axios.post(`https://my-school-v1.herokuapp.com/api/auth/login`, user)
        .then(res => {
            console.log(res)
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

    const validatecrudentials = (value) => {
        if(value <= 0 ){
            return 'must provide a crudentials'
        }else{
            return null
        }
    };
    const handleChecked = () => {
        setChecked(!checked)
    }
    return (
        <Flex flexDirection='column' w='33.33%' border='black solid 2px' h='100vh' alignItems='center'>
            <h1>My School</h1>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(handleLogin)}> 
                    <FormControl isInvalid={errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input 
                            type="text"
                            id="username"
                            name="username"
                            ref={register({ validate: validatecrudentials })} 
                            defaultValue={''}
                        />
                        <FormErrorMessage> 
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            ref={register({ validate: validatecrudentials })} 
                            defaultValue={''}
                        />
                        <FormErrorMessage> 
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    {invalid === true && <Text p='.5rem' color="red"><span style={{color: 'red'}}>*Invalid Crudentials*</span></Text>}
                    <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor="remember"></FormLabel>
                        <Checkbox size="md" variantColor="green" onChange={handleChecked}>Remember me</Checkbox>
                    </FormControl>
                    <Button variantColor="green" type='submit'>Login</Button>
                </form>
            </FormContext>
        </Flex>
    )
}

export default Login;

