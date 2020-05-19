import React from 'react';
import {   
  Switch,
  Route,
  Router,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import Portfolio from './Portfolio';
import AddActivityForm from './Forms/AddActivityForm';

export default function ActivityContainer(){

  return (
    <Router>
    <div>
      
    <Switch>

          {/* <Route exact path '/family' component={ListFamily} */}
            {/* ^parent login default -- requires parent type*/}

      <Route exact path='/' component={Portfolio} />
        {/* ^ student login default -- viewable by student and parent*/}

          {/* <Route path='/settings' component={SettingsForm} */}
            {/*  ^ replaces portfolio -- parent can adjust settings -- requires parent type */}

     <Route path ='/addactivity' component={AddActivityForm} />
        {/*  ^ replaces portfolio -- useable by student and parent */}

   </Switch>
  
   </div>
   </Router>
  );
}
