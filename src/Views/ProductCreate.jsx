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
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { Dialog } from "primereact/dialog";
import { User } from "../User/User";

export default function ProductCreate({ visible, onHide}) {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [shelfOptions, setShelfOptions] = useState([]);
  const [productName, setName] = useState("");
  const [productCategory, setCategory] = useState("");
  const [productShelf, setProductShelf] = useState("");
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

  useEffect(() => {
    getUserShelves(sessionStorage.getItem(User.userEmail)).then((data) => {
      setShelfOptions(
        data.map((item) => ({
          value: item,
          label: item.name,
        }))
      );
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault(); // prevent default form submit behavior
    var expirationtime  = new Date(expirationTime.getTime() - expirationTime.getTimezoneOffset() * 60 *1000);

    const product = {
      productName,
      productDescription,
      expirationtime,
    };

    const response = addProduct(product, productCategory.categoryName, productShelf.id);

    response.then((result) => {
      if (result === true) {
        window.location.reload();
      } else {
      }
    });
  };

  return (<Dialog
    header="Pridėti naują produktą"
    visible={visible}
    style={{ width: "30%" }}
    onHide={onHide}
  >
    <div id="outer">

      <div id="inner">
      <h5 className="text-center">Įveskite produkto pavadinimą</h5>
        <InputText
          placeholder="Pvz.: Pienas"
          value={productName}
          onChange={(e) => setName(e.target.value)}
          style={{width:"100%"}}
          className="w-full md:w-14rem"
        />
        <h5> Pasirinkite kategoriją:</h5>
        <Dropdown
          value={productCategory}
          onChange={(e) => setCategory(e.value)}
          options={categoriesOptions}
          style={{width:"100%"}}
          editable
          placeholder="Select a Category"
        />

         <h5> Pasirinkite lentyną:</h5>
        <Dropdown
          value={productShelf}
          onChange={(e) => setProductShelf(e.value)}
          options={shelfOptions}
          style={{width:"100%"}}
          editable
          placeholder="Select shelf"
        />
        <h5>Įveskite produkto aprašymą:</h5>
        <InputTextarea
          placeholder="Pvz.: Naujas, nepradėtas"
          value={productDescription}
          style={{width:"100%"}}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h5>Pasirinkite iki kada galioja produktas:</h5>
        <Calendar
          placeholder="Pvz.: 02/26/2023"
          value={expirationTime}
          style={{width:"100%"}}
          onChange={(e) => setDate(e.target.value)}
          showIcon
        />
        <br/><br/>
        <Button onClick={onSubmit} severity="info" label="Įkelti" icon="pi pi-check" />
      </div>
    </div>
    </Dialog>
  );
}
