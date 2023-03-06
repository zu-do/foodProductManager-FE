import React from "react";
import { Button } from "primereact/button";
import "./styleAppBar.css";
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
      <h2 style={{ margin: "40px" }}>Tavo šaldytuvas</h2>
      <Button
        onClick={() => {
          navigateToLandingPage();
        }}
        style={{ margin: "20px" }}
        label="Pagrindinis"
        severity="info"
        text
        raised
      />
      <Button
        style={{ margin: "20px" }}
        label="Apie mus"
        severity="info"
        text
        raised
      />
      {sessionStorage.getItem("user") !== null ? (
        <Button
          onClick={() => {
            navigateToMain();
          }}
          style={{ margin: "20px" }}
          label="Šaldytuvas"
          severity="info"
          text
          raised
        />
      ) : (
        <Button
          onClick={() => {
            navigateToLogin();
          }}
          style={{ margin: "20px" }}
          label="Prisijungti"
          severity="info"
          text
          raised
        />
      )}
      {sessionStorage.getItem("user") !== null ? (
        <Button
          onClick={() => {
            sessionStorage.clear();
            navigateToLandingPage();
          }}
          style={{ margin: "20px" }}
          label="Atsijungti"
          severity="info"
          text
          raised
        />
      ) : (
        <Button
          onClick={() => {
            navigateToRegister();
          }}
          style={{ margin: "20px" }}
          label="Registruotis"
          severity="info"
          text
          raised
        />
      )}
    </div>
  );
}

export default AppBar;
{
}
