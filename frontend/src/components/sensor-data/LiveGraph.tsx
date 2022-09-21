import React, { useState } from "react";
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";
import { IGraphProps } from "./SensorData";
import "./LiveGraph.css";
import { SelectChangeEvent } from '@mui/material/Select';

const LiveGraph: React.FC<IGraphProps> = ({ data, graphName }) => {
    const [interval, setInterval] = useState<number>(10);

    const handleIntervalChange = (event: SelectChangeEvent<number>) => {
        let value = event.target.value;
        if (typeof value === 'string') {
            setInterval(parseInt(value));
        } else {
            setInterval(value);
        }
    }

    return (
        <div className="container">
            <h1 className="graphHeader">{graphName}</h1>
            <ResponsiveContainer className="responsiveContainer" height="100%" aspect={4}>
                <LineChart data={data}>
                    <XAxis dataKey="time" interval={20} label="Time (s)" />
                    <YAxis />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LiveGraph;