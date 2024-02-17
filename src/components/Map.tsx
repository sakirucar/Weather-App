import L, { LatLngTuple } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapPropsTypes {
  position: LatLngTuple
}

const Map = (props: MapPropsTypes) => {
  return (
    <>
      <div className='rounded-lg overflow-hidden backdrop-blur-md '>
        <MapContainer
          key={JSON.stringify(props.position)}
          style={{ width: '100%', height: '400px' }}
          center={props.position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            position={props.position}
            icon={
              new L.Icon({
                iconUrl: '/icons/pin.svg',
                iconSize: [32, 32]
              })
            }
          ></Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default Map
