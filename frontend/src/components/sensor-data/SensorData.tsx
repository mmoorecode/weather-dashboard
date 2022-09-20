import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import LiveGraph from "./LiveGraph";

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
}

const LocalWeather = () => {
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
            let newTempDataPoint: GraphDataPoint = {time: currentTime, value: currentTemp};
            if (tempData.length >= maxDataCount) {
                let copiedTempData = Array.from(tempData);
                copiedTempData.shift();
                setTempData(copiedTempData);
            }
            setTempData(currentTempData => [...currentTempData, newTempDataPoint]);
        });

        socket.on('current_humidity', (currentHumidity) => {
            getCurrentTime();
            let newHumidityDataPoint: GraphDataPoint = {time: currentTime, value: currentHumidity};
            setHumidityData(currentHumidityData => [...currentHumidityData, newHumidityDataPoint]);
        });
    }, []);

    return (
        <div>
            <LiveGraph data={tempData} graphName="Temperature (°C)"/>
            <LiveGraph data={humidityData} graphName="Humidity (%)"/>
        </div>
    )
}

export default LocalWeather;