import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from '../../assets/logo_dark_bg.png'
const NavLeft = ({ user }) => {
  console.log(user)
  return (
    <>
      {user.user_type_id === 1 ?
        <Link to="/dashboard" >
          <Flex direction='column' align='center'>
            <Image src={logo} alt="MySchool logo" p="24px" />
          </Flex>
        </Link>
        :
        <Link to={`/portfolio/${user.id}`} >
          <Flex direction='column' align='center'>
            <Image src={logo} alt="MySchool logo" p="24px" />
          </Flex>
        </Link>
      }
    </>
  );
};

const maptStateToProps = (state) => {
  return {
    user: state.usersReducer.user,
  }
}
export default connect(maptStateToProps, {})(NavLeft);