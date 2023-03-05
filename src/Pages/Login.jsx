import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import "../Styles/Register.css"
import React from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigator = useNavigate();
    const navigateToMain = () => {
      navigator("/main");
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
                            <InputText id="email" type="text" placeholder="El. paštas" className="w-full mb-3" />
                        </div>
                        <div className="formComponent"> 
                            <label htmlFor="password" className="block text-900 font-medium mb-2 label">Slaptažodis</label>
                            <InputText type="password" placeholder="Slaptažodis" className="w-full mb-3" />
                        </div>
                        <div className="formComponent"> 
                            <button  className="registerButton" onClick={()=>
                            {
                                sessionStorage.setItem("user", "userEmail")
                                navigateToMain();
                        }}>Prisijungti</button>
                            
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;