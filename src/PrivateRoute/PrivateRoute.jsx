// PrivateRoute.jsx
import React, { useContext } from 'react';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { Navigate } from 'react-router';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center my-10">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
