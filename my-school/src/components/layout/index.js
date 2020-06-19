import React, {useEffect} from 'react';
import Nav from '../nav';
import {connect} from 'react-redux'
import {getUserByID, getFamily} from '../../redux/actions/user-actions'
import Breadcrumbs from '../breadcrumbs';
import { Box } from '@chakra-ui/core';

const Layout = ({ page, getFamily, getUserByID }) => {
    const Page = page; 

    const id = localStorage.getItem('user_id')

    useEffect(() => {
        getUserByID(id)
        .then(res => {
            getFamily(res.data.family_id)
        })
        .catch(err => {
            console.log(err)
        })
    }, [getFamily, getUserByID, id])

    return (
        <>
            <Nav />
            <Box 
                my="36px" 
                mx="auto" 
                px={["8px", "16px", "32px", "100px"]}
                maxWidth="1400px"
            >
                <Breadcrumbs />
                {Page}
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        family: state.usersReducer.family
    }
}

export default connect(mapStateToProps, {getUserByID, getFamily})(Layout)