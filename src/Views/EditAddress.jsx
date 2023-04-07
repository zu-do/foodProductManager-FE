import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import axios from "axios";
import { updateAddress } from "../Utils/address-axios-utils";

function EditAddress({ addressData, open, onClose }) {
  const initialFormValues = {
    name: addressData?.name,
    longitude: addressData?.longitude,
    latitude: addressData?.latitude,
    comment: addressData?.comment,
    userId: addressData?.userId,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [addressError, setAddressError] = useState(false);
  const addressId = addressData?.id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formValues.name.trim() === "") {
        setAddressError(true);
        return;
      } else {
        setAddressError(false);
      }

      const url = `https://nominatim.openstreetmap.org/search?q=${formValues.name}&format=json&limit=1`;

      const response = await axios.get(url);

      const result = response.data;

      const { lat, lon } = result[0];

      formValues.latitude = lat;
      formValues.longitude = lon;

      updateAddress(formValues, addressId)
        .then(window.location.reload())
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Keisti adreso informaciją</DialogTitle>
      <DialogContent>
        <FormControl fullWidth={true}>
          <h5>Adresas</h5>
          <TextField
            fullWidth={true}
            id="name"
            name="name"
            value={formValues.name}
            placeholder="pvz.: Kauneckio g. 45, Kaunas"
            onChange={handleInputChange}
            error={addressError}
            helperText={addressError ? "Laukas negali būti tuščias" : ""}
          />
          <h5>Komentaras</h5>
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="comment"
            name="comment"
            multiline
            fullWidth={true}
            value={formValues.comment}
            onChange={handleInputChange}
          />
          <DialogActions>
            <Button
              type="submit"
              color="success"
              sx={{ marginRight: "1rem" }}
              variant="contained"
              onClick={handleFormSubmit}
            >
              Patvirtinti
            </Button>
            <Button onClick={onClose} color="error" variant="contained">
              Atšaukti
            </Button>
          </DialogActions>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}

export default EditAddress;
