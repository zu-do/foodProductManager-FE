import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./styleMain.css";

import { Tag } from 'primereact/tag';
        
export default function Main() {

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

 /* useEffect(() => {
    fetch("https://localhost:7258/Product/products")
    .then(resp => resp.json())
    .then(resp => setProducts(resp))
    .catch(err => console.log(err))
  }, [])
*/

  const bodyTemplate = (rowData) => {
    if (rowData.expiration < 2)
      return (<Tag severity="danger" value="Skubu"></Tag>);
    else 
      return (<Tag severity="success" value="Neskubu"></Tag>);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="buttons">
        <Button
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
        </DataTable>
      </div>

    </div>
  );
}
