import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, token, ...rest }) => {
  return token ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
