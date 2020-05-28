import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { getUser, getFamilyName, } from '../../actions/actions-users';
//components
import PortfolioContainer from "../Portfolio/PortfolioContainer";
import  AdminDash  from './AdminDash';
import { Settings } from '../EnterUser/Settings';

const MainContainer = ({ user, students, families }) => {

  useEffect(() => {
    getUser(user.id)
    getFamilyName(user.family_id)
  }, [])

  return(
    <div>
      
        <Route exact path='/family/:user.family_id}' component={AdminDash} />
        {/* ^parent login default -- requires parent type*/}

        <Route exact path="/portfolio" component={PortfolioContainer} />
        {/* ^ student login default -- viewable by student and parent*/}

        <Route exact path='/settings' component={Settings} />
        {/*  ^ replaces portfolio -- parent can adjust settings -- requires parent type */}
     
    </div>

  );
}

export default MainContainer;

