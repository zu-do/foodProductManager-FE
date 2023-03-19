import "./Styles/App.css";
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
import ProductCreate from "./Views/ProductCreate";
import Statistics from "./Pages/Statistics";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";
import {User} from "./User/User"
import { ProtectedRouteAdmin } from "./Utils/ProtectedRoute";


function App() {
  
  console.log(sessionStorage.getItem(User.userEmail));
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/create" element={<ProductCreate />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/admin/categories" element={
          <ProtectedRouteAdmin> <Categories/></ProtectedRouteAdmin>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
