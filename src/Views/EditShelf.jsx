import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { editShelf } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const EditShelf = ({ visible, onHide, rowData }) => {
  const [shelfId, setProductId] = useState(rowData?.id);

  const initialFormValues = {
    Id: rowData?.id,
    Name: rowData?.name,
    UserID: sessionStorage.getItem(User.userID),
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editShelf(formValues)
      .then((response) => {
        if (response === true) {
          onHide();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      header="Redaguoti lentyną"
      visible={visible}
      style={{ width: isMobile ? "95%" : "35%" }}
      onHide={onHide}
    >
      <form onSubmit={handleSubmit} className="p-fluid">
        <h5 className="text-center">Įveskite lentynos pavadinimą</h5>
        <InputText
          id="Name"
          name="Name"
          placeholder="Pvz.: Šaldytuvas"
          value={formValues.Name}
          onChange={handleInputChange}
          style={{ width: "100%" }}
          required
        />
        <Button
          severity="info"
          label="Atnaujinti"
          icon="pi pi-check"
          style={{ marginTop: "1rem" }}
        />
      </form>
    </Dialog>
  );
};

export default EditShelf;
