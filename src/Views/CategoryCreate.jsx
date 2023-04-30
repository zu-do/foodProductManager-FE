import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { addCategory } from "../Utils/category-axios-utils";

export default function AddCategory ({ visible, onHide})  {
  const initialFormValues = {
    categoryName: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addCategory(formValues.categoryName)
      .then((response) => {
        if (response !== null) {
          onHide();
          console.log(response)
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <Dialog
        header="Pridėti kategoriją"
        visible={visible}
        style={{ width: "50%" }}
        onHide={onHide}
      >
        <div className="flex justify-content-center">
          <div className="card">
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <h5 className="text-center">Kategorijos vardas</h5>
                <span className="p-float-label">
                  <InputText
                    id="categoryName"
                    name="categoryName"
                    value={formValues.categoryName}
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
                    onClick={onHide}
                    className="p-button-text"
                  />
                </span>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
  );
};