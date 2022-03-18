import "./leafletMap.scss"
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {VisitasContex} from "../contexts/visitas-context";
import {insfestacaoNome} from "../helpers/nivel-Infestacao-para-nome";
import {visitasIsValide} from "../helpers/visitasIsValide";
import {bufferColors} from "./map/bufferColors";
import {multipleBufferCompiled} from "./map/bufferCalcule";


/*import LGeo from 'https://cdn.jsdelivr.net/npm/geodesy@2.3.0/latlon-spherical.min.js';*/

import * as turf from '@turf/turf'
/*import * as turf from "https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"*/

import { MapContainer, LayersControl, FeatureGroup, TileLayer, Marker, Popup, Circle, Polygon, GeoJSON, useMap } from 'react-leaflet'
import { useContext } from "react";
import {circle} from "leaflet-geodesy";

import Legend from "./map/legend";

const niveis = [1,2,3,4,5]

let bufferBlatideos = []
let bufferMurideos = []

const spinner = () => {
    return (
        <div id="spinnerBox" >
            <div className="loader" id="spinner"></div>
        </div>
    );
}

const Leafletmap = () => {

    const Leaflet = window.L;
    const position = [38.68, -9.385]
    const { visitas } = useContext(VisitasContex)

    const DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    Leaflet.Marker.prototype.options.icon = DefaultIcon;

    const raio = 20;

    if (visitasIsValide(visitas)){
        bufferBlatideos = multipleBufferCompiled('blatideos',niveis, raio, visitas)
        bufferMurideos = multipleBufferCompiled('murideos',niveis, raio, visitas)
    }

    function ChangeView() {
        const map = useMap();

        let polygon

        for (var i = 0 ; i < bufferBlatideos.length ; i ++ ){
            if (polygon!=undefined){
                polygon = turf.union(polygon,bufferBlatideos[i][1])
            } else {
                polygon = bufferBlatideos[i][1]
            }
        }

        for (var i = 0 ; i < bufferMurideos.length ; i ++ ){
            if (polygon!=undefined){
                polygon = turf.union(polygon,bufferMurideos[i][1])
            } else {
                polygon = bufferMurideos[i][1]
            }
        }

        if (polygon!= undefined){
            const explode = turf.explode(polygon);

            let bounds = []
            for (var i=0; i<explode.features.length; i++){
                bounds.push([explode.features[i].geometry.coordinates[0],explode.features[i].geometry.coordinates[1]])
            }

            if (bounds.length>0){
                map.fitBounds(bounds);
            } else {
                map.setView([38.68, -9.385])
            }

        }
        return null;
    }

    return (
        <div className="columConteiner">
            <MapContainer center={position} zoom={12} >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {
                        visitasIsValide(visitas) ? (
                            bufferBlatideos.length>0 ? (
                                <LayersControl.Overlay checked name= "Blatideos Nivel">
                                    <FeatureGroup >
                                        {
                                        bufferBlatideos.map(buffer => (
                                            <Polygon
                                                positions={ buffer[1].geometry.coordinates }
                                                fillColor = {bufferColors(buffer[0])}
                                                fillOpacity={0.6}
                                                color={bufferColors(buffer[0])}
                                                strokeOpacity={0.6}
                                                strokeWeight={2}
                                            />
                                        ))
                                        }
                                    </FeatureGroup>
                            </LayersControl.Overlay>
                            ) : console.log('sem buffer')
                        ) : (console.log('sem poligono composto'))
                    }
                    {
                        visitasIsValide(visitas) ? (
                            bufferMurideos.length>0 ? (
                                <LayersControl.Overlay checked name= "Murideos Nivel" >
                                    <FeatureGroup >
                                        {
                                            bufferMurideos.map(buffer => (
                                            <Polygon
                                                positions={buffer[1].geometry.coordinates}
                                                fillColor={bufferColors(buffer[0])}
                                                fillOpacity={0.6}
                                                color={bufferColors(buffer[0])}
                                                strokeOpacity={0.6}
                                                strokeWeight={2}
                                            />

                                        ))
                                        }
                                    </FeatureGroup>
                                </LayersControl.Overlay>
                        ) : console.log('sem buffer')
                        ) : (console.log('sem poligono composto'))
                    }
                </LayersControl>

                <ChangeView/>

            </MapContainer>
        </div>
    );
}

export default Leafletmap;