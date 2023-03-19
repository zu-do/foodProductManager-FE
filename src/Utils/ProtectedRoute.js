import {Navigate } from 'react-router-dom';
import { User } from '../User/User';

export const ProtectedRouteAdmin = ({children }) => {
    if (sessionStorage.getItem(User.userType) != "Admin" ) {
      return <Navigate to="/" replace />;
    }
    return children;
  };


  export const ProtectedRoute = ({children }) => {
    if (sessionStorage.getItem(User.userEmail) === null) {
      return <Navigate to="/" replace />;
    }
    return children;
  };