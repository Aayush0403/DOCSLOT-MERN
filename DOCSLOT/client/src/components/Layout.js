import React from "react";
import "../styles/LayoutStyles.css";
import docslot from "../Assets/docslot.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============
   


//=============user menu=================
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "My Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply For Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "My Profile",
      path: `/user/user-profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //======================user menu================


 //=====================admin menu==================
 
 const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },

  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "fa-solid fa-user",
  },]

  //====================admin menu===================

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
                <div className="logos"><img src={docslot} alt="logo"/> <h3>DOCSLOT</h3></div>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer"  }}>
                <Badge offset={[-15, -2]}
                  count={user && user.notifcation?.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i class="fa-solid fa-bell"></i>
                </Badge>
               

                <Link to="#">
                    {user?.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
