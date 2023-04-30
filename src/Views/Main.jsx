import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "../Styles/styleMain.css";
import AddShelf from "./AddShelf";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";
import Shelf from "./Shelf";

export default function Main() {
  const UserEmail = sessionStorage.getItem(User.userEmail);
  //const UserID = sessionStorage.getItem(User.getId())

  const [flag, setFlag] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState();
  const [dialogCreateShelfVisible, setCreateShelfDialogVisible] =
    useState(false);

  const showCreateShelfDialog = () => {
    setCreateShelfDialogVisible(true);
  };

  const hideCreateShelfDialog = () => {
    setCreateShelfDialogVisible(false);
  };

  useEffect(() => {
    getUserShelves(UserEmail).then((data) => {
      setSelectedShelf(data.at(0));
      setShelves(data);
    });
  }, []);

  const openList = () => {
    setFlag(!flag);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      
      <div id="shelf-box" style={{display: "flex", flexDirection: "column"}}>
        <Button
            onClick={showCreateShelfDialog}
            label="Pridėti lentyną"
            icon="pi pi-plus"
            severity="info"
            style={{ width: "12rem", marginBottom: "1rem", backgroundColor:'green' }}
          />
        <Button
          severity="info"
          style={{ width: "12rem", backgroundColor:'green' }}
          onClick={openList}
          label="Lentynos"
          icon={flag ? "pi pi-angle-up" : "pi pi-angle-down"}
        />
        {flag &&
          shelves.map((shelf) => (
            <>
              <Button
                id="shelf-list-button"
                key={shelf.id}
                style={{ marginTop:"1rem", backgroundColor:'green' }}
                icon="pi pi-folder"
                label={shelf.name === "Default" ? "Pagrindinė" : shelf.name}
                onClick={() => setSelectedShelf(shelf)}
                rounded
              />
            </>
          ))}
      </div>
      <AddShelf
        visible={dialogCreateShelfVisible}
        onHide={hideCreateShelfDialog}
      />
      {selectedShelf && <Shelf shelf={selectedShelf} />}
    </div>
  );
}
