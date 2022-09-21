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
  name: string
  latitude: number
  longitude: number
}

export interface IProps {
    activeTab: string
    activeTabHandler: React.Dispatch<React.SetStateAction<string>>
    currentLocationName: string
    currentLocationLat: number
    currentLocationLon: number
}

export interface IRadarProps {
  latitude: number
  longitude: number
}

function App() {

  const [activeTabId, setActiveTabId] = useState<IProps["activeTab"]>(SENSOR_DATA_TAB_ID);
  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    name: "Pittsburgh, PA",
    latitude: 40.440624,
    longitude: -79.995888
  });

  const getActiveDiv = (tab: string) => {
    switch (tab) {
      case SENSOR_DATA_TAB_ID:
        return (
          <SensorData />
        );
      case RADAR_TAB_ID:
        return (
          <Radar latitude={currentLocation.latitude} longitude={currentLocation.longitude}/>
        );
      case LOCATIONS_TAB_ID:
        return (
          <Locations/>
        );
    }
  }

  return (
    <div>
      <Navbar activeTab={activeTabId} activeTabHandler={setActiveTabId} 
      currentLocationName={currentLocation.name} 
      currentLocationLat={currentLocation.latitude}
      currentLocationLon={currentLocation.longitude}/>
      {getActiveDiv(activeTabId)}
    </div>
  );
}

export default App;
