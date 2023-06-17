import React from 'react'

import { GoogleMap, MarkerF as Marker, MarkerProps, useJsApiLoader } from '@react-google-maps/api'

import { coordinates } from './coordinates'

const containerStyle = {
  width: '100%',
  height: '300px',
}

const center = {
  lat: 40.1431,
  lng: 47.5769,
}

export type XeriteProps = {
  selectedCity?: number
  onClick: (city: number) => void
}

export const Xerite = ({ selectedCity, onClick }: XeriteProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    language: 'az',
    region: 'az',
  })

  if (isLoaded) {
    const icon: MarkerProps['icon'] = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      fillColor: 'red',
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 4.5,
    }

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        options={{ streetViewControl: false }}
      >
        {coordinates.map(({ id, city, lat, lng }) => (
          <Marker
            key={id}
            position={{ lat, lng }}
            title={city}
            onClick={() => onClick(id)}
            icon={icon}
          />
        ))}
      </GoogleMap>
    )
  }

  return (
    <select
      className="border-green-400 bg-green-50 text-sm rounded-md"
      aria-label="Haradasınız?"
      onChange={(e) => onClick(Number(e.target.value))}
      value={selectedCity}
    >
      {coordinates.map(({ id, city }) => (
        <option value={id} key={id}>
          {city}
        </option>
      ))}
    </select>
  )
}
