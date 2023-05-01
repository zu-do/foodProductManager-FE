import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "../Styles/styleMain.css";
import AddShelf from "./AddShelf";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";
import Shelf from "./Shelf";
import Grid from "@mui/material/Grid";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      <Grid item xs={12} md={10} style={{ order: isSmallScreen ? 2 : 1 }}>
        <AddShelf
          visible={dialogCreateShelfVisible}
          onHide={hideCreateShelfDialog}
        />
        {selectedShelf && <Shelf shelf={selectedShelf} />}
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        style={{
          marginTop: "2rem",
          order: isSmallScreen ? 1 : 2,
        }}
      >
        <div
          id="shelf-box"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={showCreateShelfDialog}
            label="Pridėti lentyną"
            icon="pi pi-plus"
            severity="info"
            style={{
              width: "12rem",
              marginBottom: "1rem",
              backgroundColor: "#29B61D",
            }}
          />
          <Button
            severity="info"
            style={{ width: "12rem", backgroundColor: "#29B61D" }}
            onClick={openList}
            label="Lentynos"
            icon={flag ? "pi pi-angle-up" : "pi pi-angle-down"}
          />
          {flag &&
            shelves.map((shelf) => (
              <Button
                id="shelf-list-button"
                key={shelf.id}
                style={{ marginTop: "1rem", backgroundColor: "#29B61D" }}
                icon="pi pi-folder"
                label={shelf.name === "Default" ? "Pagrindinė" : shelf.name}
                onClick={() => setSelectedShelf(shelf)}
                rounded
              />
            ))}
        </div>
      </Grid>
    </Grid>
  );
}
