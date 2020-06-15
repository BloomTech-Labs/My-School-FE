import React, {useEffect} from 'react';
import TopNav from './Dashboards/Nav/TopNav';
import {connect} from 'react-redux'
import {getUserByID, getFamily} from '../Redux/actions/actions-users'
import Breadcrumbs from './Dashboards/Nav/Breadcrumbs';
import { Box } from '@chakra-ui/core';

const MainLayout = ({ page, getFamily, getUserByID }) => {
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
            <TopNav />
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
<<<<<<< HEAD
    // console.log("state in main layout", state)
=======
>>>>>>> 0e8450aab9f161c3c43b1d119e8886d15821921b
    return {
        user: state.usersReducer.user,
        family: state.usersReducer.family
    }
}

export default connect(mapStateToProps, {getUserByID, getFamily})(MainLayout)