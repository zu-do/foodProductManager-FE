import React from 'react'
import "./Styles/App.css";
import Home from "./Views/LandingPage";
import AppBar from "./Views/AppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Views/Main";
////prime react imports
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import ProductCreate from "./Views/ProductCreate";
// pages
import Statistics from "./Pages/StatisticsPage";
import Register from "./Pages/RegisterPage";
import Login from "./Pages/Login";
import Categories from "./Pages/CategoryPage";
import UserOverview from "./Pages/UsersPage";
import AdminLogin from "./Pages/AdminLogin";


import {User} from "./User/User"
import { ProtectedRouteAdmin, ProtectedRoute, ProtectedFromAdmin } from "./Utils/ProtectedRoute";
import Map from "./Pages/Map";
import AddAddress from "./Views/AddAddress";


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
        <Route path="/profile" element={<ProtectedRoute><AddAddress /></ProtectedRoute>}></Route>
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
