import {Navigate } from 'react-router-dom';
import { User } from '../User/User';
import {Types} from '../Types/Types'

export const ProtectedRouteAdmin = ({children }) => {
    if (sessionStorage.getItem(User.userType) !== Types.Admin ) {
      return <Navigate to="/" replace />;
    }
    return children;
  };


  export const ProtectedRoute = ({children }) => {
    if (sessionStorage.getItem(User.userEmail) === null || sessionStorage.getItem(User.userType) === Types.Admin ) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  export const ProtectedFromAdmin = ({children }) => {
    if (sessionStorage.getItem(User.userType) === Types.Admin ) {
      return <Navigate to="/" replace />;
    }
    return children;
  };