import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import "../Styles/styleCreate.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../Utils/category-axios-utils";
import { addProduct } from "../Utils/product-axios-utils";

export default function ProductCreate() {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [productName, setName] = useState("");
  const [productCategory, setCategory] = useState("");
  const [productDescription, setDescription] = useState("");
  const [expirationTime, setDate] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesOptions(
        data.map((item) => ({
          value: item,
          label: item.categoryName,
        }))
      );
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault(); // prevent default form submit behavior
    const product = {
      productName,
      productDescription,
      expirationTime,
    };

    const response = addProduct(product, productCategory.categoryName);
    response.then((result) => {
      if (result === true) {
        navigator("/main");
      } else {
      }
    });
  };

  return (
    <div id="outer">
      <div id="inner">
        <label>Įveskite produkto pavadinimą:</label>
        <br />
        <InputText
          placeholder="Pvz.: Pienas"
          value={productName}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-14rem"
        />
        <br />
        <br />
        <label> Pasirinkite kategoriją:</label>
        <br />
        <Dropdown
          value={productCategory}
          onChange={(e) => setCategory(e.value)}
          options={categoriesOptions}
          editable
          placeholder="Select a Category"
          className="w-full md:w-14rem"
        />
        <br />
        <br />
        <label>Įveskite produkto aprašymą:</label>
        <br />
        <InputTextarea
          placeholder="Pvz.: Naujas, nepradėtas"
          value={productDescription}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full md:w-14rem"
        />
        <br />
        <br />
        <label>Pasirinkite iki kada galioja produktas:</label>
        <br />
        <Calendar
          placeholder="Pvz.: 02/26/2023"
          value={expirationTime}
          onChange={(e) => setDate(e.target.value)}
          showIcon
        />
        <br />
        <br />
        <Button onClick={onSubmit} label="Įkelti" icon="pi pi-check" />
      </div>
    </div>
  );
}
