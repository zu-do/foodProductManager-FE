import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import "../Styles/styleCreate.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../Utils/category-axios-utils";
import { addShelf } from "../Utils/shelf-axios-utils";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { Dialog } from "primereact/dialog";
import { User } from "../User/User";

export default function AddShelf({ visible, onHide}) {
  
  const [shelfOptions, setShelfOptions] = useState([]);
  const [shelfName, setName] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    getUserShelves(sessionStorage.getItem(User.userEmail)).then((data) => {
      setShelfOptions(
        data.map((item) => ({
          value: item,
          label: item.name,
        }))
      );
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault(); // prevent default form submit behavior

    const response = addShelf(shelfName, sessionStorage.getItem(User.userID));

    response.then((result) => {
      if (result === true) {
        window.location.reload();
      } else {
      }
    });
  };

  return (<Dialog
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
          style={{width:"100%"}}
          className="w-full md:w-14rem"
        />
        <br/><br/>
        <Button onClick={onSubmit} severity="info" label="Įkelti" icon="pi pi-check" />
      
    </Dialog>
  );
}