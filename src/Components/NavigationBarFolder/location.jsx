import React from 'react';
import { FaLocationDot } from "react-icons/fa6";


import './location.css'

const LocationComponent = ({ currentLocation }) => {
  return (
    <div className="location-container">
      <FaLocationDot/>
      <div className="current-location">{currentLocation}</div>
    </div>
  );
}

export  {LocationComponent};
