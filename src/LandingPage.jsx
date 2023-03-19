import React from "react";
import "./Styles/LandingPage.css";
import photo1 from "./Pictures/a.jpg";
import photo2 from "./Pictures/av.jpg";
import photo3 from "./Pictures/b.jpg";
import photo4 from "./Pictures/c.jpg";
import photo5 from'./Pictures/p.jpg';
import photo6 from "./Pictures/s.jpg";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-purple/theme.css";

function LandingPage() {
  const navigator = useNavigate();
  const navigateToStatistics = () => {
    navigator("/statistics");
  };
  const header = <img className="image" alt="apple" src={photo1} />;
  const header1 = <img className="image" alt="avocado" src={photo2} />;
  const header2 = <img className="image" alt="banana" src={photo3} />;
  const header3 = <img className="image" alt="cherry" src={photo4} />;
  const header4 = <img className="image" alt="tomato" src={photo5} />;
  const header5 = <img className="image" alt="suchi" src={photo6} />;
  return (
    <div className="grid-container1">
      <Card title="Produktų prenumerata" header={header} className="md:w-25rem"></Card>
      <Card title="Receptų pasiūlymai" header={header5} className="md:w-25rem"></Card>
      <Card title="Produktų galiojimo priminimai" header={header3} className="md:w-25rem"></Card>
      <Card title="Tvarumas" header={header2} className="md:w-25rem"></Card>
      <Card title="Atiduotuvė" header={header4} className="md:w-25rem"></Card>
      <Card title="Statistika" header={header1} className="md:w-25rem" onClick={navigateToStatistics}></Card>
      
    </div>
  );
}
export default LandingPage;
