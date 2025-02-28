"use client"

import { GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox } from "@react-google-maps/api"
import { useMemo, useState, useEffect, useRef } from "react"
import "./style.css"

const GoogleMaps = ({ radius, setLatitude, style, address, setAddress, latitude, longitude, setLongitude }) => {
  const [map, setMap] = useState(null)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })

  const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude])

  const changeCoordinate = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setLatitude(lat)
    setLongitude(lng)
  }

  useEffect(() => {
    if (map) {
      map.panTo({ lat: latitude, lng: longitude })
    }
  }, [latitude, longitude, map])

  const inputRef = useRef()

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces()
    if (places && places.length > 0) {
      const place = places[0]
      setAddress(place.formatted_address)
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
    }
  }

  return (
    <div className="w-full h-96">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={center} zoom={10} onLoad={(map) => setMap(map)}>
          <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
            <div className="relative ml-48 mt-[10px] w-[500px] ">
              <input
                type="text"
                className={`form-control text-black rounded-full bg-white ${style}`}
                value={address}
                placeholder="Search Location..."
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </StandaloneSearchBox>
          <button
            className="z-50 flex justify-center items-center w-12 h-12 transition duration-300 rounded-full hover:bg-stone-200 bg-stone-100 border-2 border-cyan-400 absolute right-[60px] top-[17px]"
            onClick={() => map.panTo({ lat: latitude, lng: longitude })}
          >
            <span className="text-xs text-black">Click Me!</span>
          </button>
          <Marker draggable position={{ lat: latitude, lng: longitude }} onDragEnd={changeCoordinate} />
          <Circle
            center={{ lat: latitude, lng: longitude }}
            radius={radius}
            options={{
              fillColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeColor: "#FF0000",
              strokeWeight: 2,
              fillOpacity: 0.35,
            }}
          />
        </GoogleMap>
      )}
    </div>
  )
}

export default GoogleMaps

