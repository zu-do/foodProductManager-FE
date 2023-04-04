import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../Styles/styleCreate.css";
import { addShelf } from "../Utils/shelf-axios-utils";
import { Dialog } from "primereact/dialog";
import { User } from "../User/User";

export default function AddShelf({ visible, onHide }) {
  const [shelfName, setName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault(); // prevent default form submit behavior

    const response = addShelf(shelfName, sessionStorage.getItem(User.userID));

    response.then((result) => {
      if (result === true) {
        onHide();
        window.location.reload();
      }
    });
  };

  return (
    <Dialog
      header="Pridėti naują lentyną"
      visible={visible}
      style={{ width: "30%" }}
      onHide={onHide}
    >
      <h5 className="text-center">Įveskite lentynos pavadinimą</h5>
      <InputText
        placeholder="Pvz.: Šaldytuvas"
        value={shelfName}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%" }}
        className="w-full md:w-14rem"
      />
      <br />
      <br />
      <Button
        onClick={onSubmit}
        severity="info"
        label="Įkelti"
        icon="pi pi-check"
      />
    </Dialog>
  );
}
