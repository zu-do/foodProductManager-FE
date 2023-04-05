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
// pages
import Statistics from "./Pages/Statistics";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";
import UserOverview from "./Pages/UserOverview";
import AdminLogin from "./Pages/AdminLogin";


import {User} from "./User/User"
import { ProtectedRouteAdmin, ProtectedRoute, ProtectedFromAdmin } from "./Utils/ProtectedRoute";
import Map from "./Pages/Map";


function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<ProtectedRoute> <Main /> </ProtectedRoute>}></Route>
        <Route path="/register" element={<ProtectedFromAdmin> <Register /> </ProtectedFromAdmin>}></Route>
        <Route path="/login" element={<ProtectedFromAdmin> <Login /> </ProtectedFromAdmin>}></Route>
        <Route path="/product/create" element={<ProtectedRoute> <ProductCreate /> </ProtectedRoute>}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin/categories" element={
          <ProtectedRouteAdmin> <Categories/></ProtectedRouteAdmin>
        }></Route>
         <Route path="/admin/users" element={
          <ProtectedRouteAdmin> <UserOverview/></ProtectedRouteAdmin>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
