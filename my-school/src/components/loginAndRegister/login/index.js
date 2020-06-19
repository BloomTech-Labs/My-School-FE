import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/user-actions'
import {
    Text,
    Link
} from '@chakra-ui/core';
import validateCredentials from '../../../utils/validateCredentials';

import Username from './Username'
import Password from './Password'
import RememberMe from './RememberMe';

const Login = ({onSubmit, login}) => {

    const [invalid, setInvalid] = useState(false);
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
            } else {
                setInvalid(true)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <form onSubmit={onSubmit || handleSubmit(handleLogin)} data-testid='form-submit' >
                <Username errors={errors} register={register} validateCredentials={validateCredentials} />
                <Password errors={errors} register={register} validateCredentials={validateCredentials} />
                {invalid === true && 
                    <Text 
                        p=".5rem"
                        color="warningred"
                        fontSize="sm"
                    >
                        Oops! Account not found. Please enter valid credentials or <Link as={RouterLink} to="/signup">create an account</Link>.
                    </Text>
                }
                <RememberMe setChecked={setChecked} checked={checked} errors={errors}/>
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
