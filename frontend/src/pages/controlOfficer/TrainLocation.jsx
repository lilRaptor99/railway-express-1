import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
// @ts-ignore
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import './TrainLocation.css';
// @ts-ignore
import station from './data/station.json';
import request from 'utils/request';

export default function TrainLocation() {
  const [location, setlocation] = useState(
    '6.933957704555925, 79.84995215472523'
  );

  useEffect(() => {
    (async () => {
      const resUser = await request('GET', '/control-officer/location/1007');
      setlocation(resUser.data.location);
    })();

    setInterval(() => {
      setlocation((oldLocation) => {
        const newLocatoin =
          parseFloat(oldLocation.split(', ')[0]) +
          0.0000001001023 +
          ', ' +
          (parseFloat(oldLocation.split(', ')[1]) + 0.0000001001023);
        console.log('New location:', newLocatoin);
        return newLocatoin;
      });
    }, 1500);
  }, []);

  return (
    <ControlOfficerLayout>
      <h2>Search Train Turn</h2>

      <MapContainer
        center={[6.933957704555925, 79.84995215472523]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <Marker
            key={station.id}
            position={[
              parseFloat(location.split(', ')[0]),
              parseFloat(location.split(', ')[1]),
            ]}
          >
            <Popup
              position={[
                parseFloat(location.split(', ')[0]),
                parseFloat(location.split(', cd')[1]),
              ]}
            >
              <div>
                <h2>{'Name: ' + 'Udarata Menike'}</h2>
                <p>{'status : ' + '✔ Online'}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </ControlOfficerLayout>
  );
}
