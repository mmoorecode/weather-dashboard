import React, { useState } from "react";
import LocationDataTable from "./LocationDataTable";
import locationData from "../../data/location_data.json";

const Locations = () => {

    const [filteredLocationData, setFilteredLocationData] = useState(locationData);
    const [showOnlyLocWithSensorData, setShowOnlyLocWithSensorData] = useState(true);

    const checkboxChangeHandler = () => {
        setShowOnlyLocWithSensorData(!showOnlyLocWithSensorData);
        if (showOnlyLocWithSensorData) {
            setFilteredLocationData(locationData.filter(dataPoint => {
                return dataPoint.sensor_data_available == true;
            }));
        } else {
            setFilteredLocationData(locationData);
        }
    }

    return (
        <div>
            <div className="checkbox">
                <input type="checkbox"
                    id="showOnly"
                    checked={!showOnlyLocWithSensorData}
                    onChange={checkboxChangeHandler} />
                <label>Show Only Locations With Available Sensor Data</label>
            </div>
            <LocationDataTable data={filteredLocationData} />
        </div>
    )
}

export default Locations;