import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Flex, Text, Icon } from "@chakra-ui/core";
import ButtonContainer from './ButtonContainer'
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
            <ButtonContainer isParent={isParent} studentId={studentId}/>
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
