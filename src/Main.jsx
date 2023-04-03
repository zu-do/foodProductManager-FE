import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "./Styles/styleMain.css";
import AddShelf from "./Views/AddShelf";
import { getUserShelves } from "./Utils/shelf-axios-utils";
import { User } from "./User/User";
import Shelf from "./Views/Shelf";
        
export default function Main() {

  const UserEmail = sessionStorage.getItem(User.userEmail)
  //const UserID = sessionStorage.getItem(User.getId())

  const [flag, setFlag] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState();
  const [dialogCreateShelfVisible, setCreateShelfDialogVisible] = useState(false);

 
  const showCreateShelfDialog = () => {
    setCreateShelfDialogVisible(true);
  };

  const hideCreateShelfDialog = () => {
    setCreateShelfDialogVisible(false);
  };

  useEffect(() => {
    getUserShelves(UserEmail).then((data) => {
      setSelectedShelf(data.at(0))
      setShelves(data);
    });
  }, []);

  const openList = () => {
    setFlag(!flag);
  };
  

  return (
    <div style={{ textAlign: "center", marginTop:'2rem' }}>     
      <div id="button-container">
        <div className="buttons">
        <Button
            onClick={showCreateShelfDialog}
            label="Pridėti lentyną"
            icon="pi pi-plus"
            severity="info"
            rounded
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            label="Siūlomi receptai"
            icon="pi pi-book"
            severity="info"
            rounded
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            label="Prenumerata"
            icon="pi pi-bell"
            severity="info"
            rounded
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            label="Konkursas"
            icon="pi pi-star"
            severity="info"
            rounded
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            label="Įvertink naudotoją"
            icon="pi pi-comment"
            severity="info"
            rounded
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>
      </div> 
      <div id="shelf-box">
        <Button
          severity="info"
          style={{ width: "12rem" }}
          onClick={openList}
          label="Lentynos"
          icon={flag ? "pi pi-angle-up" : "pi pi-angle-down"}
        />
        <br /> <br />
        {flag &&
          shelves.map((shelf) => (
            <>
              <Button
                id="shelf-list-button"
                key={shelf.id}
                icon="pi pi-folder"
                label={shelf.name}
                onClick={() => setSelectedShelf(shelf)}
                rounded
              />
              <br />
              <br />
            </>
          ))}
      </div>
      <AddShelf
        visible={dialogCreateShelfVisible}
        onHide={hideCreateShelfDialog}
         />
    { selectedShelf && <Shelf shelf={selectedShelf}/>}
    </div>
  );
}
