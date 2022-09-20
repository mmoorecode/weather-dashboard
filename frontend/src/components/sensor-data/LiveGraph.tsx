import React, { useState } from "react";
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";
import { IGraphProps } from "./SensorData";
import "./LiveGraph.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
        <div className="card">
            <h1 className="graphHeader">{graphName}</h1>
            <ResponsiveContainer width="100%" height="100%" aspect={4}>
            <LineChart margin={{ right: 200 }} data={data}>
                <XAxis dataKey="time" interval={20} label="Time (s)" />
                <YAxis />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
            
            {/* <FormControl>
                <InputLabel>Interval</InputLabel>
                <Select
                    value={interval}
                    label="Interval"
                    onChange={handleIntervalChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl> */}
        </div>
    )
}

export default LiveGraph;