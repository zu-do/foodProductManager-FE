import React from "react";
import "./styleHome.css"; // import the CSS file for styling

function Home() {
  return (
    <div className="grid-container">
      <div className="column">
        <img
          className="image"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F40%2Fbf%2F97%2F40bf9766822a76775cc03e87c83ee1f3.jpg&f=1&nofb=1&ipt=a73d8e7742f1cba0430f1adf011944118e657ee4fbdad8e42dcab7794f045891&ipo=images"
          alt="avocado"
        />
        <p className="columnText">Produktų prenumerata</p>
      </div>
      <div className="column">
        <img
          className="image"
          src="https://img.freepik.com/premium-vector/peeled-banana-pattern-background-cartoon-vector_528506-9.jpg?w=2000"
          alt="banana"
        />
        <p className="columnText">Receptų pasiūlymai</p>
      </div>
      <div className="column">
        <img
          className="image"
          src="https://static.vecteezy.com/system/resources/previews/004/964/502/original/cute-strawberry-cartoon-seamless-pattern-background-design-for-kids-decorating-wallpaper-wrapping-paper-fabric-backdrop-free-vector.jpg"
          alt="strawberry"
        />
        <p className="columnText">Produktų galiojimo priminimai</p>
      </div>
      <div className="column">
        <img
          className="image"
          src="https://img.freepik.com/premium-vector/cute-funny-cartoon-character-orange-fruit-orange-background-vector-cartoon-kawaii-character_508290-963.jpg?w=2000"
          alt="orange"
        />
        <p className="columnText">Tvarumas</p>
      </div>
    </div>
  );
}
export default Home;
