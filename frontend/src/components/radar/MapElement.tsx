import React, { useEffect, useRef, useState } from "react";
import { IMapProps } from "./Radar";
import { loadModules } from "esri-loader";
import './Radar.css';

const MapElement: React.FC<IMapProps> = ({ basemap, latitude, longitude }) => {
    const MapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        ()=>{ 
            let view;
        loadModules(["esri/views/MapView", "esri/Map"],{
        css:true
        }).then(([MapView,Map])=>{ 
            const map = new Map({
                basemap: basemap,
                });

                // Add radar layer to map
                // const mapImageLayer = new ArcGISDynamicMapServiceLayer({
                //     url : "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/3"
                //     });
                //     map.add(mapImageLayer);

                view = new MapView({
                    zoom: 14, //Zoom Level can be Between 0 to 23
                    center: [longitude, latitude], //longitude, latitude
                    container:MapContainerRef.current,
                    map: map //map created above
                    });
        });
    });

    return (
        <div className="mapContainer" ref={MapContainerRef} />
    )
}

export default MapElement;