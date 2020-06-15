import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Flex, Box, Text, Icon } from "@chakra-ui/core";
import HeaderButton from "./HeaderButton";
import capitalizeName from '../../utils/capitalizeName';

const PortfolioHeader = ({ user, family, student}) => {

  const isParent = user.user_type_id === 1 ? true : false;
  const studentId = useParams().id;
  const [studentName, setStudentName] = useState('')


  useEffect(() => {
    if (student.length === 1) {
      setStudentName(student[0].name);
    }
  }, [student])


  return (
<<<<<<< HEAD
    
    <Flex margin="2% 4%" justify="space-between">
      {/* PAGE TITLE // BREADCRUMBS */}
      {isParent ?
        <Flex>
          <Link as={RouterLink} to="/dashboard">Dashboard </Link>
          <Text>&nbsp;/ {capitalizeName(studentName)}'s Portfolio</Text>
        </Flex>
        : 
        <Text>My Portfolio</Text>
      }

      {/* BUTTONS: 2 if admin, 1 if student */}
      <Flex width="25%" justify="space-evenly">

        {/* ADD ACTIVITY BUTTON -- STUDENTS AND ADMINS*/}
=======
    <Flex my="36px" mx={["8px", "20px", "40px", "40px"]} justify="space-between">

      <Flex flexDirection="column">
        {/* Portfolio Title */}
        <Text fontSize="1.5rem" color="gray.800" fontWeight="bold">{isParent ? `${capitalizeName(studentName)}'s Portfolio` : `My Portfolio`}</Text>

        {/* Shows Manage Account if parent account */}
        {isParent ?
          <Flex flexDirection="row" align="center" as={RouterLink} to={`/settings/${studentId}`}>
            <Icon name="settings" color="myschoolorange" pr="8px" fontSize="1.5rem" />
            <Text textTransform="uppercase" color="myschoolorange" fontSize="xs" fontWeight="bold">Manage Account</Text>
          </Flex>
          : null}
      </Flex>

      {/* BUTTONS: 2 if parent, 1 if student */}
      <Flex width="30%" justify="space-evenly">
>>>>>>> 0e8450aab9f161c3c43b1d119e8886d15821921b
        <HeaderButton text="Add Activity" icon="add" location={`/portfolio/${studentId}/add`} />


        {/*  EXPORT BUTTON -- ADMINS ONLY */}
       
           
          {isParent ?

          <HeaderButton icon="download" text="Export PDF" location={`/portfolio/${studentId}/export`} /> 

          : null} 
        
      </Flex>
<<<<<<< HEAD
      
      {/*SEARCH BOX AND SORT/FILTER FEATURES WILL GO HERE*/}
=======

      {/*  Start with opening in another tab, then download. */}
      {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
>>>>>>> 0e8450aab9f161c3c43b1d119e8886d15821921b
      {/* future -- activity tracker? */}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
    family: state.usersReducer.family
  }
}

export default connect(mapStateToProps, {})(PortfolioHeader);
