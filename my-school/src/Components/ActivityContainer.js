import React from 'react';
import {   
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import PortfolioHeader from './PortfolioHeader';
import PortfolioLog from './PortfolioLog';
import AddActivityForm from './Forms/AddActivityForm';


export default function ActivityList(){

  return (
    <div>
      {/* future -- breadcrumb? */}
      {/* future -- activity tracker? */}
    <PortfolioHeader />
    <Switch>

          {/* <Route exact path '/'component={ListStudents} */}
            {/* ^parent login default -- requires parent type*/}

      <Route path='/portfolio' component={PortfolioLog} />
        {/* ^ student login default -- viewable by student and parent*/}

          {/* <Route path='/settings' component={SettingsForm} */}
            {/*  ^ parent can adjust settings -- requires parent type */}

     <Route path ='/addactivity' component={AddActivityForm} />
        {/*  ^ replaces log -- useable by student and parent */}

   </Switch>
   </div>
  );
}
