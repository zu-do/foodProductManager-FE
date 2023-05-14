import React from "react";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "../Pictures/marker.png";
import greenmarkerIcon from "../Pictures/markergreen.png";
function Map({ mergedData, selectedRowIndex }) {
  const customMarkerIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  const selectedMarkerIcon = new Icon({
    iconUrl: greenmarkerIcon,
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  });

  const markers = mergedData.map((item, index) => {
    const isItemSelected = item.id === selectedRowIndex;
    const markerIconUrl = isItemSelected
      ? selectedMarkerIcon
      : customMarkerIcon;

    return (
      <Marker
        key={item.id}
        position={[item.address.latitude, item.address.longitude]}
        icon={markerIconUrl}
      >
        <Popup>
          {item.productName}, {item.address.name}
        </Popup>
      </Marker>
    );
  });
  const position = [54.91712, 23.95246];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MapContainer
        center={position}
        zoom={11}
        style={{ height: "50vh", width: "55vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © <a href='https://openstreetmap.org/%27%3EOpenStreetMap</a> contributors"
        />

        {markers}
      </MapContainer>
    </div>
  );
}
export default Map;
