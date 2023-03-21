import React from "react";
import "./Styles/styleAppBar.css";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/lara-light-purple/theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { faCheese } from "@fortawesome/free-solid-svg-icons";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import {User} from "./User/User"
import {Types} from "./Types/Types"

function AppBar() {
  const navigator = useNavigate();
  const navigateToLandingPage = () => {
    navigator("/");
  };
  const navigateToMain = () => {
    navigator("/main");
  };
  const navigateToRegister = () => {
    navigator("/register");
  };
  const navigateToLogin = () => {
    navigator("/login");
  };
  const navigateToCategories = () => {
    navigator("admin/categories");
  };
  const navigateToStatistics = () => {
    navigator("statistics");
  };
  const items = [
    sessionStorage.getItem(User.userType) === Types.Admin ?
    {
      label: "Kategorijos",
      icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
      command: navigateToCategories,
    }
    : 
    {
      
      label: "Pagrindinis",
      icon: <FontAwesomeIcon icon={faCheese} style={{ padding: "10px" }} />,
      command: navigateToLandingPage,
    },
    sessionStorage.getItem(User.userEmail) !== null && sessionStorage.getItem(User.userType) !== Types.Admin
      ? {
          label: "Lentyna",
          icon: (
            <FontAwesomeIcon icon={faAppleWhole} style={{ padding: "10px" }} />
          ),
          command: navigateToMain,
        }
      :  
      {
        label: "Apie mus",
        icon: <FontAwesomeIcon icon={faCarrot} style={{ padding: "10px" }} />,
        command: navigateToLandingPage,
      },
        sessionStorage.getItem(User.userType) === Types.Admin ?
        {
          label: "Vartotojai",
          icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
          command: navigateToCategories,
        }
        : 
        {
          label: "Statistika",
          icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
          command: navigateToStatistics,
        }
        ,
        sessionStorage.getItem(User.userEmail) === null
        ?
        {
            label: "Prisijungti",
            icon: (
              <FontAwesomeIcon icon={faBreadSlice} style={{ padding: "10px" }} />
            ),
            command: navigateToLogin,
          }
          :
          {
            label: "Atiduotuve",
            icon: <FontAwesomeIcon icon={faCarrot} style={{ padding: "10px" }} />,
            command: navigateToMain,
          },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Atsijungti",
          icon: (
            <FontAwesomeIcon icon={faPepperHot} style={{ padding: "10px" }} />
          ),
          command: () => {
            sessionStorage.clear();
            navigateToLandingPage();
          },
        }
      : {
          label: "Registruotis",
          icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
          command: navigateToRegister,
        },
  ];
  const start = <h2 className="header">Tavo lentyna</h2>;
  return (
    <div className="navbar">
      <Menubar model={items} start={start} />
    </div>
  );
}

export default AppBar;
{
}
