import { useEffect } from 'react';
import L from 'leaflet';

function Legend(map) {

    useEffect(() => {

            const legend = L.control({ position: "bottomleft" });

            legend.onAdd = () => {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML =
                    '<h4>This is the legend</h4>' +
                    '<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>';
                return div;
            }

            legend.addTo(map);

    },[]);

}

export default Legend