import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import "./styleCreate.css";
import { useNavigate } from "react-router-dom";

        
export default function ProductCreate() {
  const [productName, setName] = useState('');
  const [category, setCategory] = useState('');
  const [productDescription, setDescription] = useState('');
  const [expirationTime, setDate] = useState(null);
  const navigator = useNavigate();
  
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent default form submit behavior
    const productCategory = {
      categoryName : category
    }; 
    const product = {
      productName,
      productCategory,
      productDescription,
      expirationTime,
    };
  
    try {
      const response = await fetch("https://localhost:7258/Product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      navigator("/main");
      const result = await response.json();
      console.log(result); // handle the response
    } catch (error) {
      console.error(error);
      // handle the error
    }
  };
  
  
  

  return (
    <div id="outer"
          >

      <div id="inner">
        <label>Įveskite produkto pavadinimą:</label>
        <br/>
        <InputText placeholder="Pvz.: Pienas"value={productName} onChange={(e) => setName(e.target.value)} />
        <br/>
        <br/>
        <label> Įrašykite kategoriją:</label>
        <br/>
        <InputText placeholder="Pasirinkti kategoriją" value={category} onChange={(e) => setCategory(e.target.value)} />
        <br/>
        <br/>
        <label>Įveskite produkto aprašymą:</label>
        <br/>
        <InputTextarea placeholder="Pvz.: Naujas, nepradėtas" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
        <br/>
        <br/>
        <label>Pasirinkite iki kada galioja produktas:</label>
        <br/>
        <Calendar placeholder="Pvz.: 02/26/2023" value={expirationTime} onChange={(e) => setDate(2)} showIcon />
        <br/>
        <br/>
        <Button onClick = {onSubmit} label="Įkelti" icon="pi pi-check"/>
        </div>
        </div>
  );

}
