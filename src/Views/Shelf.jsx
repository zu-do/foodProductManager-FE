import React, { useState, useRef } from "react";
import "../Styles/styleMain.css";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import EditProduct from "../Views/EditProduct";
import ViewProduct from "./ViewProduct";
import {
  Grid,
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import ProductCreate from "../Views/ProductCreate";
import { deleteProduct } from "../Utils/product-axios-utils";

function Shelf({ shelf }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [dialogCreateVisible, setCreateDialogVisible] = useState(false);
  const [dialogViewVisible, setDialogViewVisible] = useState(false);

  const toast = useRef(null);

  const showCreateDialog = () => {
    setCreateDialogVisible(true);
  };

  const hideCreateDialog = () => {
    setCreateDialogVisible(false);
  };

  const showViewDialog = (rowData) => {
    setSelectedRowData(rowData);
    setDialogViewVisible(true);
  };

  const hideViewDialog = () => {
    setSelectedRowData(null);
    setDialogViewVisible(false);
  };

  const hideDialog = () => {
    setSelectedRowData(null);
    setDialogVisible(false);
  };
  const showDialog = (rowData) => {
    setSelectedRowData(rowData);
    setDialogVisible(true);
  };

  const daysLeft = (rowData) => {
    var date = new Date();
    var endDate = new Date(rowData.expirationTime);
    var timeDiff = endDate.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const renderEditComponent = (rowData) => {
    return (
      <IconButton
        style={{ marginLeft: "auto" }}
        onClick={() => showDialog(rowData)}
        aria-label="Edit"
      >
        <EditIcon color="primary" />
      </IconButton>
    );
  };

  const renderDeleteComponent = (rowData) => {
    return (
      <IconButton
        onClick={(e) => {
          confirmDelete(e, rowData);
        }}
        aria-label="delete"
      >
        <DeleteIcon sx={{ color: "red" }} />
      </IconButton>
    );
  };

  const bodyTemplate = (rowData) => {
    if (daysLeft(rowData) < 3)
      return (
        <Tag
          style={{ position: "absolute", bottom: 0, right: 0, margin: "16px" }}
          severity="danger"
          value="SKUBU"
        ></Tag>
      );
    else
      return (
        <Tag
          style={{ position: "absolute", bottom: 0, right: 0, margin: "16px" }}
          severity="success"
          value="NESKUBU"
        ></Tag>
      );
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
      accept: () => handleDeleteProduct(rowData.id),
    });
  };

  const handleDeleteProduct = (id) => {
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
    <>
      <ProductCreate visible={dialogCreateVisible} onHide={hideCreateDialog} />
      {selectedRowData && (
        <EditProduct
          visible={dialogVisible}
          onHide={hideDialog}
          rowData={selectedRowData}
        />
      )}
      {selectedRowData && (
        <ViewProduct
          visible={dialogViewVisible}
          hide={hideViewDialog}
          rowData={selectedRowData}
          onEdit={showDialog}
          onEditClose={hideDialog}
        />
      )}

      <ConfirmPopup />
      <Toast ref={toast} />
      <Container id="shelf-container">
        <h1 style={{ float: "left" }}>
          {shelf.name === "Default" ? "Pagrindinė" : shelf.name}
        </h1>
        <span style={{ float: "right" }}>
          <Button
            onClick={showCreateDialog}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Pridėti produktą
          </Button>
        </span>
        <Grid container spacing={2}>
          {shelf.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper
                style={{
                  minHeight: "200px",
                  maxHeight: "400px",
                  height: "100%",
                }}
              >
                <Box position="relative">
                  <img
                    onClick={() => showViewDialog(product)}
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1348951%2Fscreenshots%2F3167282%2Fmilk.gif&f=1&nofb=1&ipt=bf339ff6a7d652d88b6fd76d117218df612320d7f359476b7e97cd3b65bab1fc&ipo=images"
                    style={{ width: "100%", height: "auto" }}
                  />
                  {bodyTemplate(product)}
                </Box>
                <Typography variant="h5">{product.productName}</Typography>
                <Stack direction="row">
                  <Typography
                    style={{ display: "flex", alignItems: "center" }}
                    variant="h6"
                  >
                    <CalendarMonthIcon />
                    &nbsp;{product.expirationTime.substring(5, 10)}
                  </Typography>
                  {renderEditComponent(product)}
                  {renderDeleteComponent(product)}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Shelf;
