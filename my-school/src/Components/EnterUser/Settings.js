import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {  getUserByID } from '../../actions/actions-users';
import { Box, Button, ButtonGroup, IconButton, Avatar, Flex, Editable,Text, EditableInput, EditablePreview, Heading, Divider} from '@chakra-ui/core';

const Settings = () => {

    const [ user, setUser ] = useState({});
    const [ id, setID ] = useState();

    useEffect (() => {
        axios.get(`https://my-school-v1.herokuapp.com/api/users/1`)
        .then(res => {
            console.log(res.data)
            setUser(res.data)
            setID(res.data.id)
        })
    }, []);

    const handleUpdate = (id, newInfo) => {
        axios.put(`https://my-school-v1.herokuapp.com/api/users/${id}`, newInfo)
        .then( res => getUserByID(user.id))
        .catch()
    };

    const handleDeleteAccount = (id) => {
        axios.delete(`https://my-school-v1.herokuapp.com/api/users/${id}`)
        .then( res => getUserByID(user.id))
        .catch()
    };

    function EditableControls({ isEditing, onCancel, onRequestEdit }) {
        return isEditing ? (
        <ButtonGroup justifyContent="right" size="sm">
            <IconButton icon="check" onClick={handleUpdate} />
            <IconButton icon="close" onClick={onCancel} />
        </ButtonGroup>
        ) : (
        <Flex justifyContent="right">
            <IconButton size="sm" icon="edit" onClick={onRequestEdit} />
        </Flex>
        );
    }

    return(
        <Flex direction='column'>
            <Flex direction='row'>
                <Box>  
                    <Avatar src={user.profile_picture}/>
                </Box>
                <Box>
                   <Heading>{user.username}</Heading> 
                    <Text fontsize='lg'>Primary Account</Text>
                </Box>
            </Flex>
            <Divider/>
            <Flex className='settings-box' direction='row'>
            <Editable
                    textAlign="left"
                    placeholder={user.email}
                    fontSize="xl"
                    isPreviewFocusable={false}
                    submitOnBlur={false}
                    >
                         {props => (
                            <>
                            <EditablePreview />
                            <EditableInput />
                            <EditableControls {...props} />
                            </>
                        )}
                </Editable> 
            </Flex>
            <Flex className='settings-box' direction='row'>
                <Editable
                    textAlign="left"
                    placeholder={user.password}
                    fontSize="xl"
                    isPreviewFocusable={false}
                    submitOnBlur={false}
                    >
                         {props => (
                            <>
                            <EditablePreview />
                            <EditableInput />
                            <EditableControls {...props} />
                            </>
                        )}
                </Editable> 

            </Flex>
            <Box className='settings-box'>
                <Button onClick={handleDeleteAccount}>Delete Account</Button>
            </Box>
        </Flex>
    )
}


const mapStateToProps = (state) => {
    return {
      user: state.usersReducer.user,
      isLoading: state.usersReducer.isLoading,
      error: state.usersReducer.error,
    };
  };
  
  export default connect(mapStateToProps)(Settings);
  