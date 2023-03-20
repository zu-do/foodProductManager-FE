import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getCategories } from "../Utils/category-axios-utils";
import { Button } from "primereact/button";
import AddCategory from '../Views/AddCategory'



function Categories() {
   
    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
      }, []);
    const [categories, setCategories] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    const showDialog = () => {
        setDialogVisible(true);
      };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const AddComponent = () => {
        return (
          <Button
            label="Pridėti kategoriją"
            style={{ background: "#3B82F6" , float: "right"}}
            icon="pi pi-external-link"
            onClick={() => showDialog()}
          />
        );
      };
    


    return(
       <div>  


       <DataTable
          rowClassName="custom-row"
          value={categories}
          tableStyle={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "25px",
            padding: "4rem"
          }}
        >
          <Column field="categoryName" header="Kategorija"></Column>
        

        </DataTable>
        <Button
            label="Pridėti kategoriją"
            style={{ background: "#3B82F6", marginLeft: "4rem"}}
            icon="pi pi-external-link"
            onClick={() => showDialog()}
          />
          
          <AddCategory
          visible={dialogVisible}
          onHide={hideDialog}/>

       </div>
    )
}
export default Categories;