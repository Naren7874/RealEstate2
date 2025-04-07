import { useContext, useEffect } from "react";
import Navbar from "../../navbar";
import "./layout.scss";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Layout = () => {
  return (
    <div className="layout">
      
      <Navbar />
      <Outlet/>
    </div>
  );
};

const RequireAuth = () => {
    const {currentUser} = useContext(AuthContext);
  
  //if user is not logged in then go to login page
  return (
    !currentUser ? <Navigate to="/login" /> :
   (<div className="layout">
      
      <Navbar />
      <Outlet/>
    </div>
    )
  );
};

export { RequireAuth , Layout} ;

