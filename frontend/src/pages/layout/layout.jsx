import Navbar from "../../navbar";
import "./layout.scss";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="layout">
      
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Layout;
