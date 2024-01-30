import { LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapPropsTypes {
  position: LatLngTuple;
}

const Map = (props: MapPropsTypes) => {
  return (
    <MapContainer
      style={{ width: "100%", height: "400px" }}
      center={props.position ? props.position : [37.84, 27.85]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.position}></Marker>
    </MapContainer>
  );
};

export default Map;
