import React from "react";
import { Button } from "primereact/button";
import "./styleAppBar.css";

function appBar() {
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
        style={{ margin: "20px" }}
        label="Registruotis"
        severity="info"
        text
        raised
      />
      <Button
        style={{ margin: "20px" }}
        label="Prisijungti"
        severity="info"
        text
        raised
      />
    </div>
  );
}

export default appBar;
{
}
