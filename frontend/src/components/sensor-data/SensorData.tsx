import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { ISensorDataProps } from "../../App";
import LiveGraph from "./LiveGraph";
import "./SensorData.css";

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
});

export type GraphDataPoint = {
    time: string
    value: number
};

export interface IGraphProps {
    data: GraphDataPoint[]
    graphName: string
};

const SensorData: React.FC<ISensorDataProps> = ({ sensorDataAvailable }) => {
    const [tempData, setTempData] = useState<GraphDataPoint[]>([]);
    const [humidityData, setHumidityData] = useState<GraphDataPoint[]>([]);
    const [currentTime, setCurrentTime] = useState<string>("");

    //TODO: make this configurable
    //TODO: move data arrays into their own LiveGraph, feed data into them
    //from here
    const maxDataCount = 60;

    const getCurrentTime = () => {
        var today = new Date();
        var curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        setCurrentTime(curTime);
    }

    // Listen for arduino data from the server and update temp/humidity values
    useEffect(() => {
        socket.on('current_temp', (currentTemp) => {
            getCurrentTime();
            let newTempDataPoint: GraphDataPoint = { time: currentTime, value: currentTemp };
            if (tempData.length >= maxDataCount) {
                let copiedTempData = Array.from(tempData);
                copiedTempData.shift();
                setTempData(copiedTempData);
            }
            setTempData(currentTempData => [...currentTempData, newTempDataPoint]);
        });

        socket.on('current_humidity', (currentHumidity) => {
            getCurrentTime();
            let newHumidityDataPoint: GraphDataPoint = { time: currentTime, value: currentHumidity };
            setHumidityData(currentHumidityData => [...currentHumidityData, newHumidityDataPoint]);
        });
    }, []);

    const getSensorData = () => {
        if (sensorDataAvailable) {
            return (
                <div>
                    <LiveGraph data={tempData} graphName="Temperature (°C)" />
                    <LiveGraph data={humidityData} graphName="Humidity (%)" />
                </div>
            )
        } else {
            return (
                <h1 className="no_data_header">Sensor data not available for this location</h1>
            )
        }
    };

    return (
        <div>
            {getSensorData()}
        </div>
    )
}

export default SensorData;