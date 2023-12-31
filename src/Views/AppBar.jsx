import React from "react";
import "../Styles/styleAppBar.css";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/lara-light-purple/theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faCheese } from "@fortawesome/free-solid-svg-icons";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { User } from "../User/User";
import { Types } from "../Types/Types";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import vegetable from "../Pictures/vegetable.gif";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";

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

  const navigateToUsers = () => {
    navigator("admin/users");
  };

  const navigateToProfile = () => {
    navigator("/profile");
  };
  const navigateToStatistics = () => {
    navigator("/statistics");
  };
  const navigateToGivableProducts = () => {
    navigator("/product/giveaway");
  };
  const navigateToRecipes = () => {
    navigator("/recipes");
  };
  const adminItems = [
    {
      label: "Pagrindinis",
      icon: <FontAwesomeIcon icon={faCheese} style={{ padding: "10px" }} />,
      command: navigateToLandingPage,
    },

    {
      label: "Kategorijos",
      icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
      command: navigateToCategories,
    },
    {
      label: "Vartotojai",
      icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "10px" }} />,
      command: navigateToUsers,
    },
    {
      label: "Atsijungti",
      icon: <FontAwesomeIcon icon={faPepperHot} style={{ padding: "10px" }} />,
      command: () => {
        sessionStorage.clear();
        navigateToLandingPage();
      },
    },
  ];
  const items = [
    {
      label: "Pagrindinis",
      icon: <FontAwesomeIcon icon={faCheese} style={{ padding: "5px" }} />,
      command: navigateToLandingPage,
    },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Lentyna",
          icon: (
            <FontAwesomeIcon icon={faAppleWhole} style={{ padding: "5px" }} />
          ),
          command: navigateToMain,
        }
      : {
          label: "Prisijungti",
          icon: (
            <FontAwesomeIcon icon={faBreadSlice} style={{ padding: "5px" }} />
          ),
          command: navigateToLogin,
        },

    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Profilis",
          icon: (
            <FontAwesomeIcon icon={faBowlFood} style={{ padding: "5px" }} />
          ),
          command: navigateToProfile,
        }
      : {
          visible: false,
        },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Siūlomi receptai",
          icon: (
            <FontAwesomeIcon icon={faBowlFood} style={{ padding: "5px" }} />
          ),
          command: navigateToRecipes,
        }
      : {
          visible: false,
        },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Atiduotuvė",
          icon: (
            <FontAwesomeIcon icon={faBowlFood} style={{ padding: "5px" }} />
          ),
          command: navigateToGivableProducts,
        }
      : {
          visible: false,
        },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Statistika",
          icon: (
            <FontAwesomeIcon icon={faChartBar} style={{ padding: "5px" }} />
          ),
          command: navigateToStatistics,
        }
      : {
          visible: false,
        },
    sessionStorage.getItem(User.userEmail) !== null
      ? {
          label: "Atsijungti",
          icon: (
            <FontAwesomeIcon icon={faPepperHot} style={{ padding: "5px" }} />
          ),
          command: () => {
            sessionStorage.clear();
            navigateToLandingPage();
          },
        }
      : {
          label: "Registruotis",
          icon: <FontAwesomeIcon icon={faBurger} style={{ padding: "5px" }} />,
          command: navigateToRegister,
        },
    sessionStorage.getItem(User.userEmail) == null
      ? {
          label: "Statistika",
          icon: (
            <FontAwesomeIcon icon={faChartBar} style={{ padding: "5px" }} />
          ),
          command: navigateToStatistics,
        }
      : {
          visible: false,
        },
  ];
  const start = <h1 className="header">Primad</h1>;
  return (
    <div className="navbar">
      <Menubar
        model={
          sessionStorage.getItem(User.userType) === Types.Admin
            ? adminItems
            : items
        }
        start={start}
      />
    </div>
  );
}

export default AppBar;
{
}
