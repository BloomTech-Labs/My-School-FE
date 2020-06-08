import React, {useEffect} from 'react';
import TopNav from './Dashboards/Nav/TopNav';
import {connect} from 'react-redux'
import {getUserByID, getFamily} from '../Redux/actions/actions-users'


const MainLayout = ({user, page, getFamily, getUserByID}) => {
    const Page = page; 

    const id = localStorage.getItem('user_id')

    useEffect(() => {
        console.log({id})
        getUserByID(id)
        getFamily(user.family_id)
    }, [getFamily])

    return (
        <>
            <TopNav />
            {Page}
        </>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.usersReducer.user
    }
}

export default connect(mapStateToProps, {getUserByID, getFamily})(MainLayout)