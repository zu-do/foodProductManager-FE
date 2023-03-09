import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { editProduct } from "../Utils/product-axios-utils";

export default function EditProduct(props) {
  const { product } = props;
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const initialFormValues = {
    productName: product.productName,
    categoryName: product.categoryName,
    productDescription: product.productDescription,
    expirationTime: new Date(product.expirationTime),
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [productId, setProductId] = useState(product.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editProduct(formValues, productId)
      .then((response) => {
        if (response === true) {
          setVisible(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Redaguoti"
        style={{ background: "#3B82F6" }}
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Redaguoti produkto informaciją"
        visible={visible}
        style={{ width: "30%" }}
        onHide={() => setVisible(false)}
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
                    onChange={handleInputChange}
                  />
                </span>
              </div>
              <div>
                <span className="p-float-label">
                  <h5 className="text-center"></h5>
                  <Button
                    label="Patvirtinti"
                    type="submit"
                    style={{
                      background: "#3B82F6",
                      width: "30%",
                      float: "right",
                    }}
                    icon="pi pi-check"
                    autoFocus
                  />
                  <Button
                    label="Atšaukti"
                    icon="pi pi-times"
                    style={{ width: "30%", float: "right" }}
                    onClick={() => setVisible(false)}
                    className="p-button-text"
                  />
                </span>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
