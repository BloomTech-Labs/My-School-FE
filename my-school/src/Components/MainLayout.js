import React, {useEffect} from 'react';
import TopNav from './Dashboards/Nav/TopNav';
import {connect} from 'react-redux'
import {getUserByID, getFamily} from '../Redux/actions/actions-users'

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
            {Page}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        family: state.usersReducer.family
    }
}

export default connect(mapStateToProps, {getUserByID, getFamily})(MainLayout)