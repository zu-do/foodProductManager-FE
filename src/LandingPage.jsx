import React from "react";
import "./Styles/LandingPage.css"; 
import photo1 from'./Pictures/sushi.jpg';
import photo2 from'./Pictures/tomato6x6.jpg';
import photo3 from'./Pictures/vysnios6x6.jpg';
import photo4 from'./Pictures/avocad.jpg';
import photo5 from'./Pictures/apple.jpg';
import photo6 from'./Pictures/banana.jpg';

function LandingPage() {
  return (
    <div className="grid-container">
      <div className="column">
        <img
          className="image"
          src={photo1}
          alt="avocado"
        />
        <p className="columnText">Produktų prenumerata</p>
      </div>
      <div className="column">
        <img
          className="image"
          src={photo2}
          alt="banana"
        />
        <p className="columnText">Receptų pasiūlymai</p>
      </div>
      <div className="column">
        <img
          className="image"
          src={photo3}
          alt="strawberry"
        />
        <p className="columnText">Produktų galiojimo priminimai</p>
      </div>
      <div className="column">
        <img
          className="image"
          src={photo4}
          alt="orange"
        />
        <p className="columnText">Tvarumas</p>
      </div>
      
      <div className="column">
        <img
          className="image"
          src={photo5}
          alt="orange"
        />
        <p className="columnText">Statistika</p>
      </div>
      <div className="column">
        <img
          className="image"
          src={photo6}
          alt="orange"
        />
        <p className="columnText">Atiduotuvė</p>
      </div>
    </div>
  );
}
export default LandingPage;
