import "./App.css";
import Home from "./Home";
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

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
