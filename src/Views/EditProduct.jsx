import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { editProduct } from "../Utils/product-axios-utils";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";
import { RadioButton } from "primereact/radiobutton";
import { getUnitTypes } from "../Utils/unit-axios-utils";

const EditProduct = ({ visible, onHide, rowData }) => {
  const [productId, setProductId] = useState(rowData?.id);
  const [shelfOptions, setShelfOptions] = useState([]);
  const [unit, setUnit] = useState(null);
  const [units, setUnits] = useState("");

  const initialFormValues = {
    productName: rowData?.productName,
    categoryName: rowData?.categoryName,
    productDescription: rowData?.productDescription,
    expirationTime: new Date(rowData?.expirationTime),
    shelfId: rowData?.shelfId,
    quantity: rowData?.quantity,
    unitTypeId: rowData?.unitTypeId,
  };

  useEffect(() => {
    getUserShelves(sessionStorage.getItem(User.userEmail)).then((data) => {
      setShelfOptions(
        data.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    });
    getUnitTypes().then((data) => {
      setUnits(
        data.map((item) => ({
          value: item,
          label: item.name,
        }))
      );
    });
  }, []);

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e) => {
    const value = e.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      ["quantity"]: value,
    }));
  };

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues.unitTypeId = unit ? unit.value.id : formValues.unitTypeId;
    editProduct(formValues, productId)
      .then((response) => {
        if (response === true) {
          onHide();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Redaguoti produkto informaciją"
        visible={visible}
        style={{ width: "35%" }}
        onHide={onHide}
      >
        <div className="flex justify-content-center">
          <div className="card">
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <h5 className="text-center">Kategorija</h5>
                <span className="p-float-label">
                  <InputText
                    id="categoryName"
                    name="categoryName"
                    value={formValues.categoryName}
                    onChange={handleInputChange}
                    disabled
                  />
                </span>
              </div>
              <div className="p-field">
                <h5 className="text-center">Produkto pavadinimas</h5>
                <span className="p-float-label">
                  <InputText
                    id="productName"
                    name="productName"
                    value={formValues.productName}
                    onChange={handleInputChange}
                  />
                </span>
              </div>
              <h5>Produkto kiekis:</h5>
              <div className="radio-flexbox">
                {units &&
                  units.map((initialUnit) => (
                    <div>
                      <RadioButton
                        inputId={initialUnit.label}
                        name="unitType"
                        value={initialUnit}
                        onChange={(e) => setUnit(e.target.value)}
                        checked={
                          unit
                            ? unit === initialUnit
                            : formValues.unitTypeId === initialUnit.value.id
                        }
                      />
                      <label htmlFor={initialUnit.label}>
                        {initialUnit.label === "Kg"
                          ? "Kilogramai"
                          : initialUnit.label === "L"
                          ? "Litrai"
                          : "Vienetai"}
                      </label>
                    </div>
                  ))}
              </div>
              <br />
              <InputNumber
                inputId="horizontal-buttons"
                style={{ width: "100%" }}
                value={formValues.quantity}
                onChange={handleNumberInputChange}
                showButtons
                buttonLayout="horizontal"
                step={1}
                min={0}
                max={1000}
                maxLength={5}
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                mode="decimal"
                name="quantity"
              />
              <div className="p-field">
                <h5 className="text-center">Pasirinkti lentyną</h5>
                <span className="p-float-label">
                  <Dropdown
                    id="shelfId"
                    name="shelfId"
                    value={formValues.shelfId}
                    onChange={handleInputChange}
                    options={shelfOptions}
                  />
                </span>
              </div>
              <div className="p-field">
                <h5 className="text-center">Aprašymas</h5>
                <span className="p-float-label">
                  <InputTextarea
                    id="productDescription"
                    name="productDescription"
                    value={formValues.productDescription}
                    onChange={handleInputChange}
                  />
                </span>
              </div>
              <div className="p-field">
                <h5 className="text-center">Galioja iki:</h5>
                <span className="p-float-label">
                  <Calendar
                    id="expirationTime"
                    name="expirationTime"
                    value={formValues.expirationTime}
                    onChange={handleDateInputChange}
                  />
                </span>
              </div>
              <div className="p-dialog-footer" style={{ marginTop: "5%" }}>
                <Button
                  label="Patvirtinti"
                  type="submit"
                  severity="info"
                  style={{
                    background: "#3B82F6",
                    float: "right",
                  }}
                  icon="pi pi-check"
                />
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditProduct;
