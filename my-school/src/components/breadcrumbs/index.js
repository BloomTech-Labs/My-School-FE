import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Flex,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    IconButton
} from "@chakra-ui/core";
import capitalizeName from '../../utils/capitalizeName';

const Breadcrumbs = ({ user, family, activities }) => {
    const location = useLocation();
    const params = useParams();
    const history = useHistory();

    let activityId;
    let studentId;
    // This sets either the activityId or studentId to params.id based on the route path
    if (location.pathname.includes('/activity')) {
        activityId = params.id;
        studentId = activities[0].student_id;
    } else if (location.pathname.includes('/portfolio')) {
        studentId = params.id;
    }

    // Finds the student object in family global state that matches the studentId, sets it local state & uses it to render the student's name in the breadcrumb
    const [student, setStudent] = useState('');
    useEffect(() => {
        setStudent(family.find(f => f.id === Number(studentId)))
    }, [family, studentId])

    // Finds the activity object in activities global state that matches the activityId, sets it to local state & uses it to render the activity name in the breadcrumb
    const [currentActivity, setCurrentActivity] = useState({});
    useEffect(() => {
        setCurrentActivity(activities.find(a => a.id === Number(activityId)))
    }, [activities, activityId])


    // This is checking to see if the page component being rendered is the portfolio container based on the pathname...if it is, it returns true (this will affect the "isCurrentPage" prop on the Breadcrumb)
    let isPortfolioContainer;
    if (student && location.pathname === `/portfolio/${student.id}`) {
         isPortfolioContainer = true
    } else if (student) {
         isPortfolioContainer = false
    };


    return (
        <Flex align="center">
        {/* Back button...should not show up on /dashboard (if parent) or /portfolio/:id (if student) */}
        {(student && user && user.user_type_id === 2 && location.pathname === `/portfolio/${student.id}`) || location.pathname === '/dashboard' ?
            <IconButton 
            icon="chevron-left" 
            bg="none"
            fontSize="20px"
            visibility="hidden"
        />
        : <IconButton 
            aria-label="go back" 
            icon="chevron-left" 
            bg="none"
            color="gray.900"
            fontSize="20px"
            _hover={{ color: "myschoolblue" }}
            onClick={() => history.goBack()}
        
        />}

        <Breadcrumb 
            fontWeight="semibold"
            color="gray.900"
            fontSize={["sm", "sm", "md", "md"]}
        >

        {/* Dashboard should show up on all routes except for /dashboard */}
        {location.pathname !== '/dashboard' && user.user_type_id === 1 ? 
            <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/dashboard" color="myschoolblue">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This will only show up on /add-student route */}
        {location.pathname === '/add-student' && user.user_type_id === 1 ? 
            <BreadcrumbItem isCurrentPage >
                <BreadcrumbLink color="gray.900">Add a new student account</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This will show up on any route that includes portfolio or activity */}
        {student && (location.pathname.includes('portfolio') || location.pathname.includes('activity')) ?
            <BreadcrumbItem isCurrentPage={isPortfolioContainer}>
                <BreadcrumbLink as={RouterLink} to={`/portfolio/${student.id}`} color={isPortfolioContainer ? "gray.900" : "myschoolblue"}>
                    {user.user_type_id === 1 && student
                        ? `${capitalizeName(student.name)}'s Portfolio`
                        : !isPortfolioContainer && `My Portfolio`
                    }
                </BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This will only show up when the AddActivityForm is rendered */}
        {student && location.pathname === `/portfolio/${student.id}/add` ?
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="gray.900">Add an activity</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This will only render on the PDFExporter */}
        {student && location.pathname.includes('export') ?
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="gray.900">Export Portfolio</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        {/* This will only render when the ActivityOverview is rendered */}
        {student && currentActivity && location.pathname === `/activity/${activityId}` ? 
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="gray.900">{currentActivity.name}</BreadcrumbLink>
            </BreadcrumbItem>
        : null }

        </Breadcrumb>
        </Flex>
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