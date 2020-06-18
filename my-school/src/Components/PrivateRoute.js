import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  return (
    <Fragment>
      {localStorage.getItem('token') ? props.children : <Redirect to="/login" />}
    </Fragment>
  );
};
export default PrivateRoute;