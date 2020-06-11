import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Flex, Text, Link } from "@chakra-ui/core";
import HeaderButton from "./HeaderButton";

const PortfolioHeader = ({ user, family, student}) => {

  const isParent = user.user_type_id === 1 ? true : false;
  const studentId = useParams().id;
  const [studentName, setStudentName] = useState('');
  
  useEffect(() => {
    if (student.length === 1) {
      setStudentName(student[0].name);
    }
  }, [student])


  return (
    
    <Flex margin="2% 4%" justify="space-between">
      {/* PAGE TITLE // BREADCRUMBS */}
      {isParent ?
        <Flex>
          <Link as={RouterLink} to="/dashboard">Dashboard </Link>
          <Text>&nbsp;/ {studentName}'s Portfolio</Text>
        </Flex>
        : 
        <Text>My Portfolio</Text>
      }

      {/* BUTTONS: 2 if admin, 1 if student */}
      <Flex width="25%" justify="space-evenly">

        {/* ADD ACTIVITY BUTTON -- STUDENTS AND ADMINS*/}
        <HeaderButton text="Add Activity" icon="add" location={`/portfolio/${studentId}/add`} />


        {/*  EXPORT BUTTON -- ADMINS ONLY */}
       
           
          {isParent ?

          <HeaderButton icon="download" text="Export PDF" location={`/portfolio/${studentId}/export`} /> 

          : null} 
        
      </Flex>
      
      {/*SEARCH BOX AND SORT/FILTER FEATURES WILL GO HERE*/}
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
