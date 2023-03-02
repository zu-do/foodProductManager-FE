import React from "react";
import { Button } from "primereact/button";
import "./styleAppBar.css";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigator = useNavigate();
  const navigateToMain = () => {
    navigator("/main");
  };
  const navigateToRegister = () => {
    navigator("/register");
  };
  return (
    <div className="container">
      <h2 style={{ margin: "40px" }}>Tavo šaldytuvas</h2>
      <Button
        style={{ margin: "20px" }}
        label="Apie mus"
        severity="info"
        text
        raised
      />
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
      <Button
        onClick={() => {
          navigateToMain();
        }}
        style={{ margin: "20px" }}
        label="Prisijungti"
        severity="info"
        text
        raised
      />
    </div>
  );
}

export default AppBar;
{
}
