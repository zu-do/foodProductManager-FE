import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./styleMain.css";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup'; 
import { Toast } from 'primereact/toast';



import { Tag } from 'primereact/tag';
        
export default function Main() {
    const toast = useRef(null);

    
  const navigator = useNavigate();
  const [products, setProducts] = useState([
    {
      id: "4",
      name: "Product 1",
      category: "Category 1",
      description: "smth",
      expiration: 1,
    },
    {
      id: "5",
      name: "Product 2",
      category: "Category 2",
      description: "smth",
      expiration: 2,
    },
    {
      id: "6",
      name: "Product 3",
      category: "Category 3",
      description: "smth",
      expiration: 3,
    },
    {
      id: "7",
      name: "Product 5",
      category: "Category 5",
      description: "smth",
      expiration: 3,
    },
  ]);

   useEffect(() => {
    fetch("https://localhost:7258/Product/products")
    .then(resp => resp.json())
    .then(resp => setProducts(resp))
    .catch(err => console.log(err))
  }, [])
  
  
  const navigateToProductCreate = () => {
    navigator("/product/create");
  };

  const bodyTemplate = (rowData) => {
    if (rowData.expiration < 2)
      return (<Tag severity="danger" value="Skubu"></Tag>);
    else 
      return (<Tag severity="success" value="Neskubu"></Tag>);
  }
  const tableButton = (rowData) => {
    
    return( <Button onClick={(e)=>{confirm2(e,rowData)}} severity="danger" icon="pi pi-trash" size="sm"/>)
    
  }


  const confirm2 = (event,id) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Ar norite pašalinti šį maisto produkto įrašą?',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        acceptLabel:"Taip",
        rejectLabel:"Ne",
        accept: () => handleDeleteProduct(id.id),
        reject
    });
};
const handleDeleteProduct = async (id) => {
  try {
    const response = await fetch("https://localhost:7258/Product/delete?id=" +id,{method:"DELETE"});
    if (!response.ok) {
      throw new Error('Nepavyko ištrinti produkto.');
    }
    toast.current.show({ severity: 'info', summary: 'Patvirtinta', detail: 'Sėkmingai pašalinote maisto produktą', life: 3000 });
    window.location.reload();} catch (error) {
    console.error(error);
    toast.current.show({ severity: 'error', summary: 'Klaida', detail: 'Nepavyko pašalinti maisto produkto', life: 3000 });
  }
};

const reject = () => {
};
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
        <DataTable rowClassName="custom-row" value={products} tableStyle={{ width: "100%", marginBottom:'20px', borderRadius:'25px' }}>
          <Column field="name" header="Produktas"></Column>
          <Column field="category" header="Kategorija"></Column>
          <Column field="description" header="Aprašymas"></Column>
          <Column field="expiration" header="Liko galioti dienų"></Column>
          <Column body={bodyTemplate}></Column>
          <Column body={tableButton}></Column>
        </DataTable>
      </div>

    </div>
  );
}
