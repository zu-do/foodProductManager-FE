import React from "react";
import "./Styles/styleAppBar.css";
import { useNavigate } from "react-router-dom";
import {User} from "./User/User"

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

  return (
    <div className="container">
      <h2 className="header ">Tavo šaldytuvas</h2>

      <button
        className="NavButton"
        onClick={() => {
          navigateToLandingPage();
        }}
      >
        {" "}
        Pagrindinis
      </button>

      <button
        className="NavButton"
        onClick={() => {
          navigateToLandingPage();
        }}
      >
        {" "}
        Apie mus
      </button>

      {sessionStorage.getItem(User.userEmail) !== null ? (
        <button
          className="NavButton"
          onClick={() => {
            navigateToMain();
          }}
        >
          {" "}
          Šaldytuvas
        </button>
      ) : (
        <button
          className="NavButton"
          onClick={() => {
            navigateToLogin();
          }}
        >
          {" "}
          Prisijungti
        </button>
      )}
      {sessionStorage.getItem(User.userEmail) !== null ? (
        <button
          className="NavButton"
          onClick={() => {
            sessionStorage.clear();
            navigateToLandingPage();
          }}
        >
          {" "}
          Atsijungti
        </button>
      ) : (
        <button
          className="NavButton"
          onClick={() => {
            navigateToRegister();
          }}
        >
          {" "}
          Registruotis
        </button>
      )}

        <button
          className="NavButton"
          onClick={() => {
            navigateToCategories();
          }}
        >
          {" "}
          Kategorijos
        </button>

    </div>
  );
}

export default AppBar;
{
}
