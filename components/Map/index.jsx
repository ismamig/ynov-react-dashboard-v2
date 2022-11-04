import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from "leaflet";
import { useState } from 'react';

const LocationMarker = ({ marker, setMarker}) => {
  // const initialMarkers = new LatLng(51.505, -0.09);
  const map = useMapEvents({
    click(e) {
      setMarker(e.latlng);
    }
  })

  return (
    <>
      {marker && <Marker position={marker}><Popup><span>New one</span></Popup></Marker>}
    </>
  )
}

export default function MapComponent({ marker, setMarker, markers }) {
  

  return (
    <MapContainer
      className="z-0"
      center={[46, 2]}
      zoom={5}
      scrollWheelZoom={false}
    >
      {markers &&
        markers.map((elem) => (
          <Marker
            key={elem.id}
            position={[elem.lat, elem.lng]}
          >
            <Popup>
              <span>{elem.title}</span>
            </Popup>
          </Marker>
        ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker marker={marker} setMarker={setMarker} />
    </MapContainer>
  );
}