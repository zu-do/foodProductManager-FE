import React, { useState } from "react";
import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import "../Styles/Register.css"
import { useNavigate } from "react-router-dom";
import {loginAdmin} from "../Utils/admin-axios-utils"
import { User } from "../User/User";
import {Types} from "../Types/Types"


function AdminLogin() {

    const [email, setEmail] = useState(User);
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    const navigateToLanding = () => {
      navigator("/");
    };

    const onSubmit = (event) => {
        event.preventDefault(); // prevent default form submit behavior
    
        const response = loginAdmin(email, password);
        response.then((result) => {
            if (result !== null){
                sessionStorage.setItem(User.userEmail, email);
                sessionStorage.setItem(User.userType, Types.Admin);
                navigateToLanding();
            }
            else{
                window.alert("Nepavyko prisijungti")
            }
        });
      };

    return(
        <div className="ragisterPageFather">
            <div className="registerPageChild">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    ADMINISTRATORIAUS prisijungimas
                    <hr></hr>
                    <form>
                    <div className="formDiv">
                        <div className="formComponent">
                            <label htmlFor="email" className="block text-900 font-medium mb-2 label">El. paštas</label>
                            <InputText 
                            id="email" 
                            type="email" 
                            placeholder="El. paštas" 
                            className="w-full mb-3" 
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="formComponent"> 
                            <label htmlFor="password" className="block text-900 font-medium mb-2 label">Slaptažodis</label>
                            <InputText
                             type="password"
                              placeholder="Slaptažodis" 
                              className="w-full mb-3"
                              onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="formComponent"> 
                            <button  className="registerButton" onClick={onSubmit}>Prisijungti</button>  
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin;