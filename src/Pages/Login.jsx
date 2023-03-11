import React, { useState } from "react";
import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import "../Styles/Register.css"
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Utils/user-axios-utils"


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    const navigateToMain = () => {
      navigator("/main");
    };

    const onSubmit = (event) => {
        event.preventDefault(); // prevent default form submit behavior
    
        const response = loginUser(email, password);
        response.then((result) => {
            if (result !== null){
                sessionStorage.setItem("user", email);
                navigateToMain();
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
                    Prisijungimas
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
export default Login;