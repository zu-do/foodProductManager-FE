import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import "../Styles/styleCreate.css";
import { getCategories } from "../Utils/category-axios-utils";
import { addProduct } from "../Utils/product-axios-utils";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { Dialog } from "primereact/dialog";
import { User } from "../User/User";
import { getProductInfo } from "../Utils/scanner-axios-utils";
import BarcodeScanner from "./Barcode";

export default function ProductCreate({ visible, onHide }) {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [shelfOptions, setShelfOptions] = useState([]);
  const [productName, setName] = useState("");
  const [productCategory, setCategory] = useState("");
  const [productShelf, setProductShelf] = useState("");
  const [productDescription, setDescription] = useState("");
  const [expirationTime, setDate] = useState(null);
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState("");
  const [scannedData, setScannedData] = useState("");

  const createDescription = (carbo, fats, protein, kcal) => {
    if (
      protein === null ||
      carbo === null ||
      fats === null ||
      kcal === null ||
      protein === undefined ||
      protein === fats ||
      carbo === undefined ||
      kcal === undefined
    ) {
      var text = "Deja informacijos apie šį produktą neradome.";
      return text;
    }
    var text = `Šio produkto maistingumo vėrtė. 100g produkto ${carbo}g. angliavandenių,  ${fats}g. riebalų,  ${protein}g. baltymų,  ${kcal} kalorijų`;
    return text;
  };

  const handleScan = (data) => {
    if (data !== undefined || data !== null) {
      setScannedData(data);
    }
  };

  useEffect(() => {
    // only call getProductInfo if scannedData is not null or undefined
    if (scannedData) {
      getProductInfo(scannedData).then((responseData) => {
        setName(responseData.productName);
        setDescription(
          createDescription(
            responseData.carbohydrates,
            responseData.fat,
            responseData.proteins,
            responseData.kcal
          )
        );
      });
    }
  }, [scannedData]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesOptions(
        data.map((item) => ({
          value: item,
          label: item.categoryName,
        }))
      );
    });
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
    var expirationtime = new Date(
      expirationTime.getTime() - expirationTime.getTimezoneOffset() * 60 * 1000
    );

    const product = {
      productName,
      productDescription,
      expirationtime,
    };

    const response = addProduct(
      product,
      productCategory.categoryName,
      productShelf.id
    );

    response.then((result) => {
      if (result === true) {
        window.location.reload();
      } else {
      }
    });
  };

  return (
    <Dialog
      className="Dialog1"
      header="Pridėti naują produktą"
      visible={visible}
      onHide={onHide}
    >
      <p>Skenuokite produkto brūkšninį kodą ir gaukite informaciją apie jį</p>
      <BarcodeScanner onScan={handleScan} />
      <h5 className="text-center">Įveskite produkto pavadinimą</h5>
      <InputText
        placeholder="Pvz.: Pienas"
        value={productName}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%" }}
        className="w-full md:w-14rem"
      />
      <h5>Įveskite produkto kiekį:</h5>
      <div className="radio-flexbox">
        <div>
          <RadioButton
            inputId="kg"
            name="pizza"
            value="kg"
            onChange={(e) => setUnit(e.value)}
            checked={unit === "kg"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Kilogramai
          </label>
        </div>
        <div>
          <RadioButton
            inputId="g"
            name="pizza"
            value="g"
            onChange={(e) => setUnit(e.value)}
            checked={unit === "g"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Gramai
          </label>
        </div>
        <div>
          <RadioButton
            inputId="l"
            name="pizza"
            value="l"
            onChange={(e) => setUnit(e.value)}
            checked={unit === "l"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Litrai
          </label>
        </div>
        <div>
          <RadioButton
            inputId="ml"
            name="pizza"
            value="ml"
            onChange={(e) => setUnit(e.value)}
            checked={unit === "ml"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Mililitrai
          </label>
        </div>
        <div>
          <RadioButton
            inputId="vnt"
            name="pizza"
            value="vnt"
            onChange={(e) => setUnit(e.value)}
            checked={unit === "vnt"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Vienetai
          </label>
        </div>
      </div>
      <br />
      <InputNumber
        inputId="horizontal-buttons"
        style={{ width: "100%" }}
        value={quantity}
        onValueChange={(e) => setQuantity(e.value)}
        showButtons
        buttonLayout="horizontal"
        step={
          unit === "kg" || unit === "l"
            ? 0.5
            : unit === "g" || unit === "ml"
            ? 10
            : 1
        }
        min={1}
        max={1000}
        maxLength={5}
        decrementButtonClassName="p-button-secondary"
        incrementButtonClassName="p-button-secondary"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        mode="decimal"
      />
      <h5> Pasirinkite kategoriją:</h5>
      <Dropdown
        value={productCategory}
        onChange={(e) => setCategory(e.value)}
        options={categoriesOptions}
        style={{ width: "100%" }}
        editable
        placeholder="Select a Category"
      />

      <h5> Pasirinkite lentyną:</h5>
      <Dropdown
        value={productShelf}
        onChange={(e) => setProductShelf(e.value)}
        options={shelfOptions}
        style={{ width: "100%" }}
        editable
        placeholder="Select shelf"
      />
      <h5>Įveskite produkto aprašymą:</h5>
      <InputTextarea
        placeholder="Pvz.: Naujas, nepradėtas"
        value={productDescription}
        style={{ width: "100%" }}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h5>Pasirinkite iki kada galioja produktas:</h5>
      <Calendar
        placeholder="Pvz.: 02/26/2023"
        value={expirationTime}
        style={{ width: "100%" }}
        onChange={(e) => setDate(e.target.value)}
        showIcon
      />
      <br />
      <br />
      <Button
        onClick={onSubmit}
        severity="info"
        label="Įkelti"
        icon="pi pi-check"
      />
    </Dialog>
  );
}
