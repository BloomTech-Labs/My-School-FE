import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Flex, Text, Link } from "@chakra-ui/core";
import HeaderButton from "./HeaderButton";
import capitalizeName from '../../utils/capitalizeName'

const PortfolioHeader = ({ user, family, student }) => {
  const isParent = user.user_type_id === 1 ? true : false;
  const studentId = useParams().id;
  const [studentName, setStudentName] = useState('')


  useEffect(() => {
    if (student.length === 1) {
      setStudentName(student[0].name)
    }
  }, [student])

  return (
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

      {/* BUTTONS: 2 if parent, 1 if student */}
      <Flex width="25%" justify="space-evenly">
        <HeaderButton text="Add Activity" icon="add" location={`/portfolio/${studentId}/add`} />
        {/*  EXPORT BUTTON -- PARENTS ONLY? */}
        {isParent ? <HeaderButton text="Convert to PDF" icon="download" location={`/portfolio/${studentId}/export`} /> : null}
      </Flex>
      
      {/*  Start with opening in another tab, then download. */}
      {/*SEARCH BOX AND SORT/FILTER FEATUREs WILL GO HERE*/}
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
