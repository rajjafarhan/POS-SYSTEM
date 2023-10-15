import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import './map.css';
import * as shopData from './map.json';
import mapicon from "../../../../assets/mapicon.png"

const Map = () => {
  const [activePark, setActivePark] = useState(null);

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: mapicon,
    iconSize: [25, 25], // Adjust the size as needed
  });

  return (
    <MapContainer center={[45.4, -75.7]} zoom={10} scrollWheelZoom={false}>
        
      {shopData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1], // Assuming this is latitude
            park.geometry.coordinates[0], // Assuming this is longitude
          ]}
          onClick={() => {
            setActivePark(park);
          }}
          icon={customIcon} // Use the custom icon here
        >
          <Popup>{park.properties.PARK_NAME}</Popup>
        </Marker>
      ))}
        {activePark && (
    <Popup
      position={[
        activePark.geometry.coordinates[1],
        activePark.geometry.coordinates[0]
      ]}
      onClose={() => {
        setActivePark(null);
      }}
    >
      <div>
        <h2>{"hello"}</h2>
        <p>{activePark.properties.DESCRIPTIO}</p>
      </div>
    </Popup>
  )}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;
