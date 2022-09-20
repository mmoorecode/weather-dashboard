import React, { useState } from "react";
import MapElement from "./MapElement";
import { IRadarProps } from "../../App";

export interface IMapProps {
    basemap: string
    basemapHandler?: React.Dispatch<React.SetStateAction<string>>
    latitude?: number
    longitude?: number
}

const Radar: React.FC<IRadarProps> = ({latitude, longitude}) => {
    const [basemap, setBasemap] = useState<string>('topo-vector');

    return (
        <div>
            <MapElement basemap={basemap} latitude={latitude} longitude={longitude}/>
        </div>
    )
}

export default Radar;