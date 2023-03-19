import React from "react";
import { Button } from "primereact/button";
import "./Styles/styleAppBar.css";
import { useNavigate } from "react-router-dom";

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

      {sessionStorage.getItem("user") !== null ? (
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
      {sessionStorage.getItem("user") !== null ? (
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
    </div>
  );
}

export default AppBar;
{
}
