import React, { useEffect, useRef, useState } from "react";
import { IMapProps } from "./Radar";
import { loadModules } from "esri-loader";
import './Radar.css';

const MapElement: React.FC<IMapProps> = ({ basemap, latitude, longitude }) => {
    const MapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            let view;
            loadModules(["esri/views/MapView", "esri/WebMap"], {
                css: true
            }).then(([MapView, WebMap]) => {
                const map = new WebMap({
                    portalItem: {
                        id: "62fe7518591c466891ebce2575293171"
                    }
                });

                view = new MapView({
                    zoom: 10, //Zoom Level can be Between 0 to 23
                    center: [longitude, latitude], //longitude, latitude
                    container: MapContainerRef.current,
                    map: map //map created above
                });
            });
        });

    return (
        <div className="mapContainer" ref={MapContainerRef} />
    )
}

export default MapElement;