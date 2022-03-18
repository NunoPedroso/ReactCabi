import { useEffect } from 'react';
import L from 'leaflet';
import {LayersControl, MapContainer, Polygon, TileLayer} from "react-leaflet";
import {visitasIsValide} from "../../helpers/visitasIsValide";
import {bufferColors} from "./bufferColors";

function Spinner() {
    return (
        <div id="spinnerBox" >
            <div className="loader" id="spinner"></div>
        </div>
    );
}

export default Spinner