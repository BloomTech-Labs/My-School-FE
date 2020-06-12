import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    useToast,
    IconButton,
    Avatar, Flex,
    Text,
    Heading,
    Divider,
    Input,
    FormLabel,
    Icon
} from '@chakra-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import DeleteUser from './DeleteUser';
import { editProfileWithoutImage, deleteAccount, deletEntireFamily, editProfileWithImage } from '../../Redux/actions/actions-users';


const Settings = ({ family, editProfileWithoutImage, deleteAccount, deletEntireFamily, editProfileWithImage }) => {

    //need the user info to be either the admin(Addcount Settings) or the student (Manage)
    const [user, setUser] = useState({});
    const [image, setImage] = useState("")
    const { id } = useParams();
    const btnRef = useRef();
    const toast = useToast();
    const [hover, setHover] = useState(false);
    const [passwordField, setPasswordField] = useState(false);
    const [Thumbnail, setThumbnail] = useState("")
    const [renderedUser, setRenderedUser] = useState({});
    const history = useHistory();
    const { handleSubmit } = useForm();


    useEffect(() => {
        if (family) {
            const selectedUser = family.filter(user => user.id === Number(id) ? user : null)
            const name = selectedUser[0].name === null ? '' : selectedUser[0].name;
            setUser({
                ...selectedUser[0],
                password: 'password',
                name: name
            })
            setThumbnail("");
            setImage("")
            setRenderedUser({
                ...selectedUser[0],
                name: name
            })
            setPasswordField(false)
        } else {
            return null
        }
    }, [id]);

    const axiosHandler = (data, isDataForm) => {
        if (isDataForm === true) {
            editProfileWithImage(data, renderedUser.id)
                .then(res => {
                    toast({
                        title: "Success!",
                        description: `${user.user_type_id === 1 ? `Your` : `${user.name}'s`} profile was updated successfully`,
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setImage('')
                })
                .catch(err => console.log(err))
        } else {
            editProfileWithoutImage(data, renderedUser.id)
                .then(res => {
                    toast({
                        title: "Success!",
                        description: `${user.user_type_id === 1 ? `Your` : `${user.name}'s`} profile was updated successfully`,
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                        position: "top-right",
                    });
                    history.push('/dashboard')
                })
                .catch(err => console.log(err))
        }
    }

    const handleImageGrabber = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setThumbnail(URL.createObjectURL(e.target.files[0]));
            setTimeout(() => {
                document.getElementById('submit').click()
            }, [1000])
        }
    };
console.log(user, 'this is the user')
console.log(renderedUser, 'this is the rendered user')
    const handleUpdate = e => {
        if (image) {
            const formData = new FormData();
            formData.append("photo", image, image.name);
            axiosHandler(formData, true);
        } else if (passwordField === false) {
            if (user.user_type_id === 1) {
                const name = user.name === '' ? null : user.name;
                const changes = {
                    username: user.username,
                    email: user.username,
                    name: name
                }
                axiosHandler(changes, false)
            } else {
                const changes = {
                    username: user.username,
                    name: user.name
                }
                axiosHandler(changes, false)
            }
        } else {
            if (user.user_type_id === 1) {
                const name = user.name === '' ? null : user.name;
                const changes = {
                    username: user.username,
                    email: user.username,
                    name: name,
                    password: user.password
                }
                axiosHandler(changes, false)
            } else {
                const changes = {
                    username: user.username,
                    name: user.name,
                    password: user.password
                }
                axiosHandler(changes, false)
            }
        }
    }

    const handleImage = () => {
        document.getElementById('profilepic').click();
    }

    const handleInputs = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const addPasswordField = () => {
        if (passwordField === false) {
            setPasswordField(true)
            setUser({
                ...user,
                password: '',
                passwordConfirm: ''
            })
        } else {
            return null
        }
    }

    const closePasswordField = () => {
        setPasswordField(false)
        setUser({
            ...user,
            password: 'password'
        })
    }

    return (
        <>
            <Text padding='2rem 0rem 2rem 10rem' fontSize="1.125rem" fontWeight="700" color="gray.800"><span className='link'>Dashboard</span> / {renderedUser.user_type_id === 1 ? `My account Settings` : `${renderedUser.name}'s Account settings`}</Text>
            {Object.keys(user).length > 0 && (
                <Flex direction='column'>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <Flex paddingLeft='7rem' direction='row' margin='20px' flexWrap='wrap'>
                            <Box paddingRight='1rem'>
                                {Thumbnail ? <Avatar src={Thumbnail} margin='10px' /> : null}
                                {!Thumbnail ? <Avatar src={renderedUser.profile_picture} margin='10px' /> : null}
                                <IconButton size="sm" icon="edit" onClick={handleImage} />
                            </Box>
                            <Box>
                                <Heading>{renderedUser.username}</Heading>
                                <Text fontsize='lg'>{renderedUser.user_type_id === 1 ? 'Primary Account' : `${renderedUser.name}'s Account`}</Text>
                            </Box>
                        </Flex>
                        <Input hidden name='profilepic' id='profilepic' type='file' onChange={handleImageGrabber} />
                        <Divider w='100vw' padding='1rem 0rem' />
                        <Flex paddingLeft='7rem' paddingTop='2.5rem' className='settings-box' direction='row' alignItems='center'>
                            <Text paddingRight='1rem' w='10vw'>Username:</Text>
                            <FormLabel htmlFor='username'></FormLabel>
                            <Input
                                name='username'
                                id='username'
                                type='text'
                                placeholder={`Enter username`}
                                value={user.username}
                                w='20vw'
                                onChange={handleInputs}
                            ></Input>
                        </Flex>
                        {user.username === '' ? <Text color="red.500" paddingLeft='21vw'><Icon name="warning" size="24px" color="red.500" /> Must provide a username</Text> : null}
                        {user.user_type_id === 1 && EmailValidator.validate(user.username) === false ? <Text color="red.500" paddingLeft='21vw'><Icon name="warning" size="24px" color="red.500" /> Must provide a valid email</Text> : null}
                        <Flex paddingLeft='7rem' className='settings-box' direction='row' alignItems='center'>
                            <Text paddingRight='1rem' w='10vw'>{passwordField === true ? `New Password` : `Password`}:</Text>
                            <FormLabel htmlFor='password'></FormLabel>
                            <Input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Enter new password'
                                value={user.password}
                                onClick={addPasswordField}
                                w='20vw'
                                onChange={handleInputs}
                            ></Input>
                            <Text paddingLeft='1.5rem' color='blue' textDecoration='underline' onClick={closePasswordField}>{passwordField === true ? `Cancel` : null}</Text>
                        </Flex>
                        {passwordField === true ?
                            <Flex paddingLeft='7rem' className='settings-box' direction='row' alignItems='baseline'>
                                <Text paddingRight='1rem' w='10vw'>New Password Confirmation:</Text>
                                <FormLabel htmlFor='passwordConfirm'></FormLabel>
                                <Input
                                    name='passwordConfirm'
                                    id='passwordConfirm'
                                    type='password'
                                    placeholder='Confirm new password'
                                    value={user.passwordConfirm}
                                    w='20vw'
                                    onChange={handleInputs}
                                ></Input>
                            </Flex>
                            : null
                        }
                        {user.password === user.passwordConfirm && passwordField === true && user.password !== '' ? <Text color="green.400" paddingLeft='22vw'><Icon name="check-circle" size="24px" /> Both password match</Text> : null}
                        {passwordField === true && user.password !== user.passwordConfirm || passwordField === true && user.passord === '' ? <Text color="red.500" paddingLeft='12.5vw'><Icon name="warning" size="24px" color="red.500" /> Both password must match and be at least 8 characters</Text> : null}
                        <Flex paddingLeft='7rem' className='settings-box' alignItems='center'>
                            <Text paddingRight='1rem' w='10vw'>Name:</Text>
                            <FormLabel htmlFor='name'></FormLabel>
                            <Input
                                name='name'
                                id='name'
                                type='text'
                                placeholder={`Enter name`}
                                value={user.name}
                                w='20vw'
                                onChange={handleInputs}
                            ></Input>
                        </Flex>
                        {user.name === '' && user.user_type_id == 2 ? <Text color="red.500" paddingLeft='21vw'><Icon name="warning" size="24px" color="red.500" /> Must provide a name</Text> : null}
                        <Flex paddingLeft='7rem' className='settings-box' justifyContent='space-around' w='30vw'>
                            <Button
                                m='1rem'
                                type='submit'
                                id='submit'
                                isDisabled={
                                        user.user_type_id === 2 && passwordField === true && user.password.length > 7 && user.password === user.passwordConfirm && user.name !== '' && user.username !== '' && user.username !== renderedUser.username && user.name !== renderedUser.name ||
                                        user.user_type_id === 2 && passwordField === false && user.username !== renderedUser.username && user.username !== '' && user.name !== '' ||
                                        user.user_type_id === 2 && passwordField === true && user.password.length > 7 && user.password === user.passwordConfirm && user.name !== '' && user.username !== ''  ||
                                        user.user_type_id === 2 && passwordField === false && user.username !== '' && user.name !== '' && user.name !== renderedUser.name  ||
                                        user.user_type_id === 2 && passwordField === false && user.name !== renderedUser.name && user.username !== '' && user.name !== '' ||
                                        user.user_type_id === 1 && passwordField === true && user.password.length > 7 && user.password === user.passwordConfirm && user.username !== '' && EmailValidator.validate(user.username) === true ||
                                        user.user_type_id === 1 && passwordField === false && user.username !== renderedUser.username && EmailValidator.validate(user.username) === true ||
                                        user.user_type_id === 1 && passwordField === false && user.name !== renderedUser.name && EmailValidator.validate(user.username) === true ||
                                        image ? false : true}
                                _focus={{ boxShadow: "outline" }}
                                variant={hover ? 'outline' : 'solid'}
                                variantColor="btnYellow"
                                ref={btnRef}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >Update Account</Button>
                            <DeleteUser id={id} user={user} deleteAccount={deleteAccount} deletEntireFamily={deletEntireFamily} />
                        </Flex>
                    </form>
                </Flex>
            )}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        family: state.usersReducer.family,
        admin: state.usersReducer.user
    };
};

export default connect(mapStateToProps, { editProfileWithoutImage, deleteAccount, deletEntireFamily, editProfileWithImage })(Settings);

