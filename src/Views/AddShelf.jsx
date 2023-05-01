import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../Styles/styleCreate.css";
import { addShelf } from "../Utils/shelf-axios-utils";
import { Dialog } from "primereact/dialog";
import { User } from "../User/User";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AddShelf({ visible, onHide }) {
  const [shelfName, setName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(sessionStorage.getItem(User.userID));
    const response = addShelf(shelfName, sessionStorage.getItem(User.userID));
    response
      .then((result) => {
        if (result === true) {
          onHide();
          window.location.reload();
        }
      })
      .catch((error) => {
        window.alert("Nepavyko sukurti lentynos");
      });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      header="Pridėti naują lentyną"
      visible={visible}
      style={{ width: isMobile ? "95%" : "35%" }}
      onHide={onHide}
    >
      <form onSubmit={onSubmit} className="p-fluid">
        <h5 className="text-center">Įveskite lentynos pavadinimą</h5>
        <InputText
          placeholder="Pvz.: Šaldytuvas"
          value={shelfName}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%" }}
          required
        />

        <Button
          severity="info"
          label="Įkelti"
          icon="pi pi-check"
          style={{ marginTop: "1rem" }}
        />
      </form>
    </Dialog>
  );
}
