import React, { useState } from 'react';
import './App.css';
import Radar from './components/radar/Radar';
import SensorData from './components/sensor-data/SensorData';
import Navbar, { SENSOR_DATA_TAB_ID, RADAR_TAB_ID, LOCATIONS_TAB_ID } from './components/navbar/Navbar';
import Locations from './components/locations/Locations';

export type Tab = {
    id: string
    display: string
    component_id: string
};

export type LocationData = {
  city: string
  state: string
  latitude: number
  longitude: number
  sensorDataAvailable: boolean
}

export interface IProps {
    activeTab: string
    activeTabHandler: React.Dispatch<React.SetStateAction<string>>
    currentLocationName: string
    currentLocationState: string
    currentLocationLat: number
    currentLocationLon: number
}

export interface IRadarProps {
  latitude: number
  longitude: number
}

export interface ILocationProps {
  selectedCity: LocationData 
  setSelectedCity: React.Dispatch<React.SetStateAction<LocationData>>
}

export interface ISensorDataProps {
  sensorDataAvailable: boolean
}

function App() {

  const [activeTabId, setActiveTabId] = useState<IProps["activeTab"]>(SENSOR_DATA_TAB_ID);
  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    city: "Pittsburgh",
    state: "PA",
    latitude: 40.440624,
    longitude: -79.995888,
    sensorDataAvailable: true
  });

  const getActiveDiv = (tab: string) => {
    switch (tab) {
      case SENSOR_DATA_TAB_ID:
        return (
          <SensorData sensorDataAvailable={currentLocation.sensorDataAvailable}/>
        );
      case RADAR_TAB_ID:
        return (
          <Radar latitude={currentLocation.latitude} longitude={currentLocation.longitude}/>
        );
      case LOCATIONS_TAB_ID:
        return (
          <Locations selectedCity={currentLocation} setSelectedCity={setCurrentLocation}/>
        );
    }
  }

  return (
    <div>
      <Navbar activeTab={activeTabId} activeTabHandler={setActiveTabId} 
      currentLocationName={currentLocation.city}
      currentLocationState={currentLocation.state} 
      currentLocationLat={currentLocation.latitude}
      currentLocationLon={currentLocation.longitude}/>
      {getActiveDiv(activeTabId)}
    </div>
  );
}

export default App;
