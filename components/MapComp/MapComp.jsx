"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/fV6ySVP9/location-removebg-preview.png",
  iconSize: [62, 62],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComp = () => {
  return (
    <MapContainer
      style={{ width: "100%", height: "100%", zIndex: 0 }}
      center={[22.3752, 91.8349]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        style={{ width: "400px", height: "400px" }}
        position={[22.3752, 91.8349]}
        icon={customIcon}
      >
        <Popup>Muscle Gain - Gym</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComp;
