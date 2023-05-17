import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import EditProduct from "../Views/EditProduct";
import { deleteProduct } from "../Utils/product-axios-utils";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import AddAddress from "./AddAddress";
import { giveawayProduct } from "../Utils/product-axios-utils";

export default function ViewProduct({
  visible,
  hide,
  rowData,
  onEdit,
  onEditClose,
}) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGiveAway, setShowGiveAway] = useState(!rowData.givable);
  const [dialogVisible, setDialogVisible] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toast = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleChildSelectionChange = (selectedId) => {
    setSelectedItem(selectedId);
  };

  const daysLeft = () => {
    var date = new Date();
    var endDate = new Date(rowData.expirationTime);
    var timeDiff = endDate.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const confirmDelete = (event, rowData) => {
    event.preventDefault();
    confirmPopup({
      target: event.currentTarget,
      message: "Ar norite pašalinti šį maisto produkto įrašą?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Taip",
      rejectLabel: "Ne",
      accept: () => handleDelete(rowData.id),
    });
  };

  const handleGiveAway = () => {
    setShowAdditionalFields(true);
    setShowConfirm(true);
    setShowGiveAway(false);
  };

  const handleConfirm = () => {
    giveawayProduct(rowData.id, selectedItem);
    hide();
    window.location.reload();
  };

  const handleDelete = (id) => {
    deleteProduct(id)
      .then((response) => {
        if (response === true) {
          toast.current.show({
            severity: "info",
            summary: "Patvirtinta",
            detail: "Sėkmingai pašalinote maisto produktą",
            life: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Klaida",
          detail: "Nepavyko pašalinti maisto produkto",
          life: 3000,
        });
      });
  };

  return (
    <div>
      <ConfirmPopup />
      <Toast ref={toast} />
      <Dialog
        style={{ zIndex: 1 }}
        fullScreen={fullScreen}
        open={visible}
        onClose={hide}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" fontWeight={"bold"}>
          <div
            style={{ float: "left", marginLeft: "auto", marginRight: "1.5rem" }}
          >
            {rowData.productName}{" "}
          </div>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{rowData.productDescription}</DialogContentText>
          <DialogContentText marginTop={"10%"} color={"#F16E5A"}>
            {"Liko galioti: "}
            {daysLeft()}
            {" d."}
          </DialogContentText>
        </DialogContent>
        {showAdditionalFields && (
          <DialogContent>
            <DialogContentText className="text-center">
              Pasirinkite atidavimo vietos adresą:
            </DialogContentText>
            {selectedItem ? null : (
              <DialogContentText
                className="text-center"
                style={{ color: "#F16E5A", fontSize: "0.8em" }}
              >
                *adresas privalomas
              </DialogContentText>
            )}
            <AddAddress onSelectionChange={handleChildSelectionChange} />
          </DialogContent>
        )}
        <DialogActions>
          <div style={{ float: "left" }}>
            <IconButton
              style={{ float: "left" }}
              onClick={onEdit}
              aria-label="Edit"
            >
              <EditIcon sx={{ color: "#29B61D" }} />
            </IconButton>
            <IconButton
              style={{ float: "left" }}
              onClick={(e) => {
                confirmDelete(e, rowData);
              }}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "#F16E5A" }} />
            </IconButton>
          </div>
          {showGiveAway && (
            <Button onClick={handleGiveAway} style={{ color: "#29B61D" }}>
              Atiduoti
            </Button>
          )}
          {showConfirm && (
            <div>
              <Button
                onClick={handleConfirm}
                style={{ color: "#29B61D" }}
                disabled={!selectedItem}
              >
                PATVIRTINTI
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
      <EditProduct
        visible={dialogVisible}
        onHide={onEditClose}
        rowData={rowData}
      />
    </div>
  );
}
