import "./App.css";
import Home from "./Home";
import AppBar from "./appBar";
////prime react imports
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="App">
      <AppBar position="static" />
      <Home /> {/* Home display */}
    </div>
  );
}

export default App;
