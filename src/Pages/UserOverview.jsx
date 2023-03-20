import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUsers } from "../Utils/user-axios-utils";

function UserOverview() {
   
    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
        });
      }, []);
    const [users, setUsers] = useState([]);

    return(
       <div>  


       <DataTable
          rowClassName="custom-row"
          value={users}
          tableStyle={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "25px",
            padding: "4rem"
          }}
        >
          <Column field="name" header="Vartotojo vardas"></Column>
          <Column field="lastname" header="Vartotojo pavardė"></Column>
          <Column field="email" header="Vartotojo el. paštas"></Column>
        

        </DataTable>

       </div>
    )
}
export default UserOverview;