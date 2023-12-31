import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { addAddress } from "../Utils/address-axios-utils";
import { getAddress } from "../Utils/address-axios-utils";
import { User } from "../User/User";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteAddress } from "../Utils/address-axios-utils";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import EditAddress from "./EditAddress";

const AddAddress = ({ onSelectionChange }) => {
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [initialAddress, setInitialAddress] = useState([]);
  const [showAdd, setShowAdd] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    const newSelectedItem = itemId === selectedItem ? null : itemId;
    setSelectedItem(newSelectedItem);
    onSelectionChange(newSelectedItem);
  };

  const style = {
    width: "100%",
    maxWidth: 500,
  };

  useEffect(() => {
    getAddress(sessionStorage.getItem(User.userID))
      .then((response) => setInitialAddress(response))
      .catch((error) => console.log(error));
  }, []);

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleOpenDialog = (add) => {
    setAddressData(add);
    setOpenDialog(true);
  };

  const onDelete = () => {
    deleteAddress(deleteId)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (address.trim() === "") {
        setAddressError(true);
        return;
      } else {
        setAddressError(false);
      }

      const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`;

      const response = await axios.get(url);

      const result = response.data;

      const { lat, lon } = result[0];

      const userAddress = {
        Name: address,
        Longitude: lon,
        Latitude: lat,
        Comment: comment,
        userId: sessionStorage.getItem(User.userID),
      };

      addAddress(userAddress)
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ar tikrai norite pašalinti šį adresą?"}
        </DialogTitle>
        <DialogActions>
          <Button sx={{ color: "gray" }} onClick={handleClose}>
            Ne
          </Button>
          <Button color="error" onClick={onDelete} autoFocus>
            Taip
          </Button>
        </DialogActions>
      </Dialog>
      {addressData && (
        <EditAddress
          addressData={addressData}
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setAddressData(null);
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List sx={style} component="nav">
          {initialAddress &&
            initialAddress.map((add) => (
              <>
                <ListItem
                  key={add.id}
                  sx={{
                    ...(add.id === selectedItem && {
                      backgroundColor: "#ebebeb",
                      fontWeight: "bold",
                    }),
                  }}
                  onClick={() => handleItemClick(add.id)}
                >
                  <ListItemText primary={add.name} />
                  <IconButton
                    onClick={() => handleClickOpen(add.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog(add)}
                    aria-label="edit"
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </ListItem>
                <Divider />
              </>
            ))}
          <ListItem>
            {showAdd && (
              <Button
                onClick={() => setShowAdd(false)}
                sx={{ width: "100%" }}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Pridėti
              </Button>
            )}
          </ListItem>
        </List>

        {!showAdd && (
          <Paper elevation={0} sx={{ width: "100%", maxWidth: 500 }}>
            <form onSubmit={handleFormSubmit}>
              <h5>Adresas</h5>
              <TextField
                fullWidth={true}
                value={address}
                onChange={handleAddressChange}
                placeholder="pvz.: Kauneckio g. 45, Kaunas"
                error={addressError}
                helperText={addressError ? "Laukas negali būti tuščias" : ""}
              />
              <h5>Komentaras</h5>
              <TextField
                sx={{ marginBottom: "1rem" }}
                multiline
                fullWidth={true}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="submit"
                color="success"
                sx={{ marginRight: "1rem" }}
                variant="contained"
              >
                Patvirtinti
              </Button>
              <Button
                onClick={() => setShowAdd(true)}
                color="error"
                variant="contained"
              >
                Atšaukti
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </>
  );
};

export default AddAddress;
