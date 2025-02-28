"use client";

import GoogleMaps from "@/components/page";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: null,
    longitude: null,
    radius: 500,
  });

  const [latitude, setLatitude] = useState(11.5586684);
  const [longitude, setLongitude] = useState(104.8643779);
  const [address, setAddress] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="flex flex-col w-full items-center gap-y-4">
        <span className="text-6xl text-gray-700 font-bold ">
          Next.js Google Maps!
        </span>
        <div className="w-[30%] h-96">
          <GoogleMaps
            style="w-[50%] px-4 py-2 border-b-[1px] border-[#E5E5E3]"
            address={address}
            setAddress={setAddress}
            radius={form.radius}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl">Address: {address}</span>
          <span className="text-xl">Latitude: {latitude}</span>
          <span className="text-xl">Longitude: {longitude}</span>
        </div>
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {`https://www.google.com/maps?q=${latitude},${longitude}`}
          </a>
        </div>
      </div>
    </div>
  );
}
