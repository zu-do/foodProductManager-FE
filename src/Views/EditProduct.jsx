import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { editProduct } from "../Utils/product-axios-utils";
import { getUserShelves } from "../Utils/shelf-axios-utils";
import { User } from "../User/User";

const EditProduct = ({ visible, onHide, rowData }) => {
  const [productId, setProductId] = useState(rowData?.id);
  const [shelfOptions, setShelfOptions] = useState([]);
  const initialFormValues = {
    productName: rowData?.productName,
    categoryName: rowData?.categoryName,
    productDescription: rowData?.productDescription,
    expirationTime: new Date(rowData?.expirationTime),
    shelfId: rowData?.shelfId,
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
  }, []);

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
    console.log(formValues);
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
