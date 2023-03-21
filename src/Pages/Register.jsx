import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import "../Styles/Register.css"
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../Utils/user-axios-utils"
import { User } from "../User/User";



function Register() {

    const navigator = useNavigate();
    const navigateToMain = () => {
      navigator("/main");
    };
    const [email, setEmail] = useState(User);
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");

    const onSubmit = (event) => {
        event.preventDefault(); // prevent default form submit behavior
        if (password === passwordRepeat){
        
        const user ={
            "Name": name,
            "Lastname":lastname ,
            "Email": email,
            "Password": password
        };
        const response = registerUser(user);
        response.then((result) => {
            if (result !== null){
                sessionStorage.setItem(User.userEmail, email);
                navigateToMain();
            }
            else{
                window.alert("Nepavyko prisijungti")
            }
        });
    }
    else{
        window.alert("Slaptažodžiai nesutampa")
    }
      };

    return(
        <div className="ragisterPageFather">
            <div className="registerPageChild">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    Registracija
                    <hr></hr>
                    <form>
                    <div className="formDiv">
                        <div className="formComponent">
                            <label htmlFor="email" className="block text-900 font-medium mb-2 label">El. paštas</label>
                            <InputText id="email" type="text" placeholder="El. paštas" className="w-full mb-3"onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                    
                        <div className="formComponent">
                            <label htmlFor="name" className="block text-900 font-medium mb-2 label">Vardas</label>
                            <InputText id="name" type="text" placeholder="Vardas" className="w-full mb-3" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="formComponent"> 
                            <label htmlFor="lastname" className="block text-900 font-medium mb-2 label">Pavardė</label>
                            <InputText type="text" placeholder="Pavardė" className="w-full mb-3"onChange={(e) => setLastName(e.target.value)}  />
                        </div>

                        <div className="formComponent"> 
                            <label htmlFor="password" className="block text-900 font-medium mb-2 label">Slaptažodis</label>
                            <InputText type="password" placeholder="Slaptažodis" className="w-full mb-3" onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <div className="formComponent"> 
                            <label htmlFor="password" className="block text-900 font-medium mb-2 label">Pakartoti slaptažodį</label>
                            <InputText type="password" placeholder="Slaptažodis" className="w-full mb-3" onChange={(e) => setPasswordRepeat(e.target.value)}  />
                        </div>
                        <div className="formComponent"> 
                            <button  className="registerButton" onClick={onSubmit}>Registruotis</button>
                            
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;