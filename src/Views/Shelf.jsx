import React, { useState, useRef } from "react";
import "../Styles/styleMain.css";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import EditProduct from "../Views/EditProduct";
import EditShelf from "../Views/EditShelf";
import ViewProduct from "./ViewProduct";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
import { User } from "../User/User";
import { deleteProduct } from "../Utils/product-axios-utils";

import WarningSnackBar from "./WarningSnackBar";
function Shelf({ shelf }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [dialogCreateVisible, setCreateDialogVisible] = useState(false);
  const [dialogEditVisible, setEditDialogVisible] = useState(false);
  const [selectedEditRowData, setSelectedEditRowData] = useState(null);
  const [dialogViewVisible, setDialogViewVisible] = useState(false);

  const toast = useRef(null);

  const showCreateDialog = () => {
    setCreateDialogVisible(true);
  };

  const hideCreateDialog = () => {
    setCreateDialogVisible(false);
  };
  const showEditDialog = (rowData) => {
    setSelectedEditRowData(rowData);
    setEditDialogVisible(true);
  };

  const hideEditDialog = () => {
    setSelectedEditRowData(null);
    setEditDialogVisible(false);
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
    console.log(rowData);
    setSelectedRowData(rowData);
    setDialogVisible(true);
  };

  var displayed = false;
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
        <EditIcon sx={{ color: "#29B61D" }} />
      </IconButton>
    );
  };
  const renderEditShelfComponent = (rowData) => {
    return (
      <IconButton
        style={{ marginLeft: "auto" }}
        onClick={() => showEditDialog(rowData)}
        aria-label="Edit"
      >
        <EditIcon sx={{ color: "#29B61D" }} />
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
        <DeleteIcon sx={{ color: "#F16E5A" }} />
      </IconButton>
    );
  };
  const renderShelfDeleteComponent = (rowData) => {
    return (
      <IconButton
        onClick={(e) => {
          confirm3(e, rowData);
        }}
        aria-label="delete"
      >
        <DeleteIcon sx={{ color: "#F16E5A" }} />
      </IconButton>
    );
  };

  const bodyTemplate = (rowData) => {
    if (daysLeft(rowData) < 3)
      return (
        <Tag
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: "16px",
            backgroundColor: "#F16E5A",
          }}
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

  const confirm3 = (event, rowData) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Ar norite pašalinti šią lentyną?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Taip",
      rejectLabel: "Ne",
      accept: () =>
        handleDeleteShelf(rowData.id, sessionStorage.getItem(User.userID)),
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
          }, 800);
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
  const handleDeleteShelf = async (id, userid) => {
    try {
      const response = await fetch(
        `https://localhost:7258/Shelf/delete/${id}/${userid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Nepavyko ištrinti lentynos.");
      }
      toast.current.show({
        severity: "info",
        summary: "Patvirtinta",
        detail: "Sėkmingai pašalinote lentyną",
        life: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Klaida",
        detail: "Nepavyko pašalinti lentynos",
        life: 3000,
      });
    }
  };
  const countExpiringProducts = (products) => {
    let count = 0;
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    products.forEach((product) => {
      const expirationDate = new Date(product.expirationTime);
      const daysLeft = Math.ceil((expirationDate - today) / (1000 * 3600 * 24));
      if (daysLeft < 3) {
        count++;
      }
    });

    return count;
  };
  const displayWarningSnack = (rowData) => {
    if (displayed) return false;
    if (daysLeft(rowData) < 3) {
      displayed = true;
      return true;
    } else return false;
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

      {selectedEditRowData && (
        <EditShelf
          visible={dialogEditVisible}
          onHide={hideEditDialog}
          rowData={selectedEditRowData}
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
      <Container
        maxWidth="85%"
        sx={{ width: "100%" }}
        style={{ float: "left" }}
      >
        <div>
          <h1 style={{ float: "left" }}>
            {shelf.name === "Default" ? (
              "Pagrindinė"
            ) : (
              <>
                <span>{shelf.name}</span>
                {renderEditShelfComponent(shelf)}
                {renderShelfDeleteComponent(shelf)}
              </>
            )}
          </h1>

          <Button
            style={{ marginTop: "2rem" }}
            sx={{ backgroundColor: "#29B61D", float: "right" }}
            onClick={showCreateDialog}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Pridėti produktą
          </Button>
        </div>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {shelf.products.map((product) => (
            <Grid
              item
              xs={isMobile ? 13 : 7}
              sm={10}
              md={4}
              lg={3}
              xl={2}
              key={product.id}
            >
              <Paper
                style={{
                  minHeight: "200px",
                  maxHeight: "400px",
                  height: "100%",
                }}
              >
                <Box position="relative">
                  <img
                    id="product-image"
                    onClick={() => showViewDialog(product)}
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1348951%2Fscreenshots%2F3167282%2Fmilk.gif&f=1&nofb=1&ipt=bf339ff6a7d652d88b6fd76d117218df612320d7f359476b7e97cd3b65bab1fc&ipo=images"
                    style={{ width: "100%", height: "auto" }}
                  />
                  {bodyTemplate(product)}
                </Box>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  {product.productName}
                </Typography>
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
              <WarningSnackBar
                triggerOpen={displayWarningSnack(product)}
                number={countExpiringProducts(shelf.products)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Shelf;
