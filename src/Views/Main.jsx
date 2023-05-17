import React, { useState, useEffect } from "react";
import "../Styles/styleMain.css";
import AddShelf from "./AddShelf";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";
import Shelf from "./Shelf";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PostAddIcon from "@mui/icons-material/PostAdd";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

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
            startIcon={<PostAddIcon />}
            style={{
              width: "12rem",
              marginBottom: "1rem",
              backgroundColor: "#29B61D",
            }}
            variant="contained"
          >
            Pridėti lentyną
          </Button>
          <Button
            style={{ width: "12rem", backgroundColor: "#29B61D" }}
            onClick={openList}
            startIcon={
              flag ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            variant="contained"
          >
            Lentynos
          </Button>
          {flag &&
            shelves.map((shelf) => (
              <Button
                id="shelf-list-button"
                key={shelf.id}
                style={{ marginTop: "1rem", backgroundColor: "#29B61D" }}
                onClick={() => setSelectedShelf(shelf)}
                variant="contained"
              >
                {shelf.name === "Default" ? "Pagrindinė" : shelf.name}
              </Button>
            ))}
        </div>
      </Grid>
    </Grid>
  );
}
