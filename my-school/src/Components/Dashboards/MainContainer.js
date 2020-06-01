import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
//components
import PortfolioContainer from "../Portfolio/PortfolioContainer";
import  AdminDash  from './AdminDash';
import { getUserByID, getFamilyName, getFamilyByID, deleteStudent } from "../../actions/actions-users";

const MainContainer = () => {

  const [user, setUser] = useState();
  const [ family, setFamily ] = useState();

  useEffect(() => {
    //the user will not be hard coded once we add dynamic routes and logins
    axios
      .get("https://my-school-v1.herokuapp.com/api/users/1")
      .then((res) => {
        console.log(res.data)
        setUser(res.data);
        setFamily(res.data.family_id)
        // getFamilyByID(res.data.family_id)
      })
      .catch((err) => console.log(err));
  }, []);

    
      if(user && user.user_type_id === 1){
        return(
         <div>
        <AdminDash user={user}/>
        {/* ^parent login default -- requires parent type */}
        </div> 
        // {/*  ^ replaces portfolio -- parent can adjust settings -- requires parent type */}
      )
        
      } else {
        return(
        <PortfolioContainer user={user}/>)
        // {/* ^ student login default -- viewable by student and parent*/}
      }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    user: state.usersReducer.user,
    family: state.usersReducer.family,
    familyName: state.usersReducer.familyName
  };
};

export default connect(mapStateToProps, { getUserByID, getFamilyName, getFamilyByID, deleteStudent }) (MainContainer);

