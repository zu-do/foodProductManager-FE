import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./styleMain.css";
export default function Main() {
  const [products, setProducts] = useState([
    {
      code: "1",
      name: "Product 1",
      category: "Category 1",
      quantity: 1,
      price: 1,
    },
    {
      code: "2",
      name: "Product 2",
      category: "Category 2",
      quantity: 2,
      price: 2,
    },
    {
      code: "3",
      name: "Product 3",
      category: "Category 3",
      quantity: 3,
      price: 3,
    },
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="buttons">
        <Button
          label="Pridėti produktą"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Siūlomi receptai"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Prenumeracija"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Konkursas"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
        <Button
          label="Įvertink naudotoją"
          severity="info"
          rounded
          style={{ marginRight: "20px" }}
        />
      </div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <DataTable value={products} tableStyle={{ width: "100%" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div>
  );
}
