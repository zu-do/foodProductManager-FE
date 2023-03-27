import React, { useState } from "react";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
        
function AddAddress() {

    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`;
  
        const response = await axios.get(url);
  
        const result = response.data;
  
        const { lat, lon } = result[0];
  
        setLatitude(lat);
        setLongitude(lon);
      } catch (error) {
        console.error(error);
      }
    }
    return ( <>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'4rem'}}>
        <div style={{backgroundColor:'white', borderRadius:'4px', boxShadow:'0 0 4px black', padding:'1rem 2rem'}}>
            <h2>Pridėti adresą</h2>
            <hr/>
     <form onSubmit={handleFormSubmit}>
        <h5>Adresas</h5>
        <InputText value={address} onChange={handleAddressChange} />
        <h5>Komentaras</h5> 
        <InputTextarea style={{width:'100%'}} value={comment} onChange={(e) => setComment(e.target.value)} />
        <br/><br/>
      <Button label="Pridėti" severity="primary" />
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
    </form>
    </div>
    </div>
    </> );
}

export default AddAddress;