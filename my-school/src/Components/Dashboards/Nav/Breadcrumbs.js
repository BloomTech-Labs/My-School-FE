import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from "@chakra-ui/core";

const Breadcrumbs = ({ user, family, activities }) => {
    const location = useLocation();
    const history = useHistory();
    const params = useParams();

    let activityId;
    let studentId;
    if (location.pathname.includes('/activity')) {
        activityId = params.id;
        studentId = activities[0].student_id;
    } else if (location.pathname.includes('/portfolio')) {
        studentId = params.id;
    }

    const [student, setStudent] = useState({});
    useEffect(() => {
        setStudent(family.find(f => f.id === Number(studentId)))
    }, [family, studentId])

    const [currentActivity, setCurrentActivity] = useState({});
    useEffect(() => {
        setCurrentActivity(activities.find(a => a.id === Number(activityId)))
    }, [activities, activityId])


    // This is checking to see if the page being rendered is the portfolio container...if it is, it returns true (this will affect the "isCurrentPage" prop on the Breadcrumb)
    let isPortfolioContainer;
    if (student && location.pathname === `/portfolio/${student.id}`) {
         isPortfolioContainer = true
    } else if (student) {
         isPortfolioContainer = false
    };

    console.log("Breadcrumbs location", location, history, student, isPortfolioContainer, activities, params)

    return (
        <Breadcrumb>

        {/* Dashboard should show up on all routes except for /dashboard */}
        {location.pathname !== '/dashboard' && user.user_type_id === 1 ? 
            <BreadcrumbItem color="myschoolblue">
                <BreadcrumbLink as={RouterLink} to="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
        : null}

        {/* This will only show up on /add-student route */}
        {location.pathname === '/add-student' && user.user_type_id === 1 ? 
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Add a new student account</BreadcrumbLink>
            </BreadcrumbItem>
        : null}

        {/* This should also show up for the /activity/:id route; check if it includes /activity & somehow find student id */}
        {student && location.pathname.includes('portfolio') || location.pathname.includes('activity') ?
            <BreadcrumbItem isCurrentPage={isPortfolioContainer}>
                <BreadcrumbLink as={RouterLink} to={`/portfolio/${student.id}`}>
                    {user.user_type_id === 1 && student
                        ? `${student.name}'s Portfolio`
                        : `My Portfolio`
                    }
                </BreadcrumbLink>
            </BreadcrumbItem>
        : null}

        {/* This will only show up when the AddActivityForm is being rendered */}
        {student && location.pathname === `/portfolio/${student.id}/add` ?
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Add an activity</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This should only render when the ActivityOverview is being rendered */}
        {student && currentActivity && location.pathname === `/activity/${activityId}` ? 
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{currentActivity.name}</BreadcrumbLink>
            </BreadcrumbItem>
        : null}

        </Breadcrumb>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        family: state.usersReducer.family,
        activities: state.portfolioReducer.activities
    }
}

export default connect(mapStateToProps, {})(Breadcrumbs);