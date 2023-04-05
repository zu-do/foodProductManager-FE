import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";

function EditAddress({ addressData, open, onClose }) {
  console.log(addressData);

  const initialFormValues = {
    address: addressData?.name,
    comment: addressData?.comment,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  return (
    <>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
        <DialogTitle>Keisti adreso informaciją</DialogTitle>

        <DialogContent>
          <FormControl fullWidth={true}>
            <h5>Adresas</h5>
            <TextField
              fullWidth={true}
              id="address"
              name="address"
              value={formValues?.address}
              placeholder="pvz.: Kauneckio g. 45, Kaunas"
            />
            <h5>Komentaras</h5>
            <TextField
              sx={{ marginBottom: "1rem" }}
              multiline
              fullWidth={true}
              value={formValues?.comment}
            />
            <DialogActions>
              <Button
                type="submit"
                color="success"
                sx={{ marginRight: "1rem" }}
                variant="contained"
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
    </>
  );
}

export default EditAddress;
