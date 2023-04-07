import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../Pictures/marker.png';
function Map() {
    const position = [54.917120, 23.952460];

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
    return ( 
        <div style={{display:'flex', justifyContent:'center', marginTop:'4rem'}}>
         <MapContainer center={position} zoom={13} style={{ height: '50vh',width: '50vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © <a href='https://openstreetmap.org/%27%3EOpenStreetMap</a> contributors"
      />
      <Marker icon={customMarkerIcon} position={position}>
      <Popup>
        Produkto vieta
        </Popup>
      </Marker>
    </MapContainer>
        </div>
     );
}
export default Map;