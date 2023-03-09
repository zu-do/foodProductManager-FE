import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./styleMain.css";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

import { Tag } from "primereact/tag";
import EditProduct from "./Views/EditProduct";
import { getProducts } from "./Utils/product-axios-utils";

export default function Main() {
  const toast = useRef(null);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigator = useNavigate();
  const toggleDialog = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const navigateToProductCreate = () => {
    navigator("/product/create");
  };

  const bodyTemplate = (rowData) => {
    if (daysLeft(rowData) < 3)
      return <Tag severity="danger" value="Skubu"></Tag>;
    else return <Tag severity="success" value="Neskubu"></Tag>;
  };

  const daysLeft = (rowData) => {
    var date = new Date();
    var endDate = new Date(rowData.expirationTime);
    var timeDiff = endDate.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getId = (rowData) => {
    var id = rowData.id;
    return id;
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
      <EditProduct
        product={rowData}
        visible={visible}
        toggleDialog={toggleDialog}
      />
    );
  };

  const reject = () => {};

  return (
    <div style={{ textAlign: "center" }}>
      <ConfirmPopup />
      <Toast ref={toast} />
      <div className="buttons">
        <Button
          onClick={navigateToProductCreate}
          label="Pridėti produktą"
          icon="pi pi-plus"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Siūlomi receptai"
          icon="pi pi-book"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Prenumerata"
          icon="pi pi-bell"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Konkursas"
          icon="pi pi-star"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Įvertink naudotoją"
          icon="pi pi-comment"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
      </div>
      <div id="fridge">
        <div id="upper-section">
          <div id="handle"></div>
        </div>
        <DataTable
          rowClassName="custom-row"
          value={products}
          tableStyle={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "25px",
          }}
        >
          <Column field="productName" header="Produktas"></Column>
          <Column field="categoryName" header="Kategorija"></Column>
          <Column field="productDescription" header="Aprašymas"></Column>
          <Column field={daysLeft} header="Liko galioti dienų"></Column>
          <Column body={bodyTemplate}></Column>
          <Column body={renderEditComponent}></Column>
          <Column body={tableButton}></Column>
        </DataTable>
      </div>
    </div>
  );
}
