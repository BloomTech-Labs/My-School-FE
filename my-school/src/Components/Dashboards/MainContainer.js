import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
//components
import PortfolioContainer from "../Portfolio/PortfolioContainer";
import  AdminDash  from './AdminDash';
import { Settings } from '../EnterUser/Settings';
import { getFamilyName } from "../../actions/actions-users";

const MainContainer = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    //the user will not be hard coded once we add dynamic routes and logins
    axios
      .get("https://my-school-v1.herokuapp.com/api/users/1")
      .then((res) => {
        setUser(res.data);
        getFamilyName(res.data.family_id);
      })
      .catch((err) => console.log(err));
  }, []);

    
      if(user && user.user_type_id === 1){
        return(
         <div>
        <AdminDash user={user}/>
        <Route exact path='/settings' component={Settings} />
        </div> 
        // {/*  ^ replaces portfolio -- parent can adjust settings -- requires parent type */}
      )
        // {/* ^parent login default -- requires parent type*/}
      } else {
        return(
        <PortfolioContainer user={user}/>)
        // {/* ^ student login default -- viewable by student and parent*/}
      }

        

}

export default MainContainer;

