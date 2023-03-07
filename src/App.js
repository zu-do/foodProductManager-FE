import "./App.css";
import Home from "./LandingPage";
import AppBar from "./AppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
////prime react imports
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import ProductCreate from "./ProductCreate";
import Register from "./Pages/Register"
import Login from "./Pages/Login";

function App() {
  console.log(sessionStorage.getItem("user"))
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/create" element={<ProductCreate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
