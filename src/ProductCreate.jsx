import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import "./styleCreate.css";

        
export default function ProductCreate() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
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

    //const calculateExpiration = () => {
        var dateNow=new Date();
        const diffInMs = date - dateNow;
        const diffInDays = parseInt( diffInMs / (1000 * 60 * 60 * 24));
        console.log(diffInDays)
  //};
  

  return (
    <div id="outer"
          >

      <div id="inner">
        <label>Įveskite produkto pavadinimą:</label>
        <br/>
        <InputText placeholder="Pvz.: Pienas"value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        <br/>
        <label> Pasirinkite kategoriją:</label>
        <br/>
        <Dropdown placeholder="Pasirinkti kategoriją" value={category} onChange={(e) => setCategory(e.target)} />
        <br/>
        <br/>
        <label>Įveskite produkto aprašymą:</label>
        <br/>
        <InputTextarea placeholder="Pvz.: Naujas, nepradėtas" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br/>
        <br/>
        <label>Pasirinkite iki kada galioja produktas:</label>
        <br/>
        <Calendar placeholder="Pvz.: 02/26/2023" value={date} onChange={(e) => setDate(e.value)} showIcon />
        <br/>
        <br/>
        <Button label="Įkelti" icon="pi pi-check"/>
        </div>
        </div>
  );

}
