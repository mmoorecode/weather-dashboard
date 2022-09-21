import React, { useEffect, useState } from "react";
import './Navbar.css';
import { IProps } from "../../App";

export const SENSOR_DATA_TAB_ID = 'Sensor';
export const RADAR_TAB_ID = 'Radar';
export const LOCATIONS_TAB_ID = 'Locations'
const TABS = [
    { 'id': SENSOR_DATA_TAB_ID, 'display': 'Sensor Data', 'component_id': 'sensor' },
    { 'id': RADAR_TAB_ID, 'display': 'Radar', 'component_id': 'radar' },
    { 'id': LOCATIONS_TAB_ID, 'display': 'Locations', 'component_id': 'locations' }
]

const Navbar: React.FC<IProps> = ({ activeTab, activeTabHandler, currentLocationName, currentLocationLat, currentLocationLon }) => {

    const [renderedTabs, setRenderedTabs] = useState<React.ReactElement[]>();

    useEffect(() => {
        let renderTabs = [] as React.ReactElement[];
        TABS.forEach((tab, i) => {
            let classes = "tab";
            // If tab is active, apply active style to it
            if (tab.id === activeTab) {
                classes += " active";
            }
            renderTabs.push(
                <div key={tab.id} id={tab.id} className={classes} onClick={switchTab}>{tab.display}</div>
            );
        });
        setRenderedTabs(renderTabs);
    }, [activeTab]);

    const switchTab = (event: React.MouseEvent<HTMLElement>) => {
        const clickedTabId = event.currentTarget.id;
        if (activeTab !== clickedTabId) {
            activeTabHandler(clickedTabId);
        }
    };

    return (
        <nav className="navbar">
            <div className="bar">
                <div className="vertical_align">
                    <h3 className="header">Weather Dashboard</h3>
                    <h2 className="subheader">{currentLocationName} ({currentLocationLat}, {currentLocationLon})</h2>
                </div>
                {renderedTabs}
            </div>
        </nav>
    )
}

export default Navbar;