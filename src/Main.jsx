import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import "./Styles/styleMain.css";
import { ConfirmPopup } from "primereact/confirmpopup";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import ProductCreate from "./Views/ProductCreate";
import { Tag } from "primereact/tag";
import EditProduct from "./Views/EditProduct";
import { getProducts } from "./Utils/product-axios-utils";
import { getUserShelves } from "./Utils/shelf-axios-utils";
import { User } from "./User/User";

import { Card } from 'primereact/card';
        
export default function Main() {

  const UserEmail = sessionStorage.getItem(User.userEmail)

  const toast = useRef(null);
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(false);
  const [shelves, setShelves] = useState([]);

  const [dialogCreateVisible, setCreateDialogVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const showDialog = (rowData) => {
    setSelectedRowData(rowData);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setSelectedRowData(null);
    setDialogVisible(false);
  };
  const showCreateDialog = (rowData) => {
    setCreateDialogVisible(true);
  };

  const hideCreateDialog = () => {
    setCreateDialogVisible(false);
  };

  useEffect(() => {
    getProducts(UserEmail).then((data) => {
      setProducts(data);
      console.log(products)
    });
    getUserShelves(UserEmail).then((data) => {
      setShelves(data);
    });
  }, []);

  const bodyTemplate = (rowData) => {
    if (daysLeft(rowData) < 3)
      return <Tag style={{fontSize:'1rem'}} severity="danger" value="Skubu"></Tag>;
    else return <Tag style={{fontSize:'1rem'}} severity="success" value="Neskubu"></Tag>;
  };

  const daysLeft = (rowData) => {
    var date = new Date();
    var endDate = new Date(rowData.expirationTime);
    var timeDiff = endDate.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const tableButton = (rowData) => {
    return (
      <Button
        onClick={(e) => {
          confirm2(e, rowData);
        }}
        severity="danger"
        icon="pi pi-trash"
        size="sm"
      />
    );
  };

  const confirm2 = (event, rowData) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Ar norite pašalinti šį maisto produkto įrašą?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Taip",
      rejectLabel: "Ne",
      accept: () => handleDeleteProduct(rowData.id),
      reject,
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch("https://localhost:7258/Product/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        throw new Error("Nepavyko ištrinti produkto.");
      }
      toast.current.show({
        severity: "info",
        summary: "Patvirtinta",
        detail: "Sėkmingai pašalinote maisto produktą",
        life: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Klaida",
        detail: "Nepavyko pašalinti maisto produkto",
        life: 3000,
      });
    }
  };

  const renderEditComponent = (rowData) => {
    return (
      <Button
        label="Redaguoti"
        severity="info"
        icon="pi pi-external-link"
        style={{padding:'0.6rem'}}
        onClick={() => showDialog(rowData)}
      />
    );
  };

  const reject = () => {};

  const openList = () => {
    setFlag(!flag);
  };

  return (
    <div style={{ textAlign: "center", marginTop:'2rem' }}>
              <ProductCreate
        visible={dialogCreateVisible}
        onHide={hideCreateDialog}
         /> 
        {selectedRowData && (
          <EditProduct
            visible={dialogVisible}
            onHide={hideDialog}
            rowData={selectedRowData}
          />
        )}
      <ConfirmPopup />
      <Toast ref={toast} />
      <div id="button-container">
        <div className="buttons">
          <Button
            onClick={showCreateDialog}
            label="Pridėti produktą"
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
                rounded
              />
              <br />
              <br />
            </>
          ))}
      </div>
      <div className="product-card">
      {products.map((product) => (
        <Card style={{marginBottom:'2rem'}} title={product.productName}>
          <div >{bodyTemplate(product)}</div>
          <p><b>Kategorija:</b> {product.categoryName}</p>
          <p><b>Aprašymas:</b> {product.productDescription}</p>
          <p><b>Liko galioti: </b> {daysLeft(product)} dienos</p>
          <div>{renderEditComponent(product)}&nbsp;{tableButton(product)}</div>
    </Card>
      ))}
      </div>
    </div>
  );
}
