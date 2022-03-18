import {useState, useContext, useEffect} from 'react';

import BrigadasQueTrabalharam from "./endpoints/brigadasQueTrabalharam";
import VisitasAtampas from "./endpoints/visitasAtampas";
import DatePicker from "./componentes/datePicker";
import Leafletmap from "./componentes/leafletMap";

import SelectBrigada from "./componentes/selectBrigada";
import TabelaResumo from "./componentes/tabelaResumo";

import Chart from "./componentes/chart";

//import Brigada from "./componentes/teste";

import {DateContext} from "./contexts/date-context";
import {VisitasContex} from "./contexts/visitas-context";
import {BrigadaContext} from "./contexts/brigada-contex";

import './App.scss';
import Spinner from "./componentes/map/spinnerMap";

function App() {
    const [data, setData] = useState([]);
    const [visitas, setVisitas ] = useState([])
    const [brigada, setBrigada ] = useState([])

    return(
        <>
            <DateContext.Provider value={{data, setData}}>
                <VisitasContex.Provider value={{visitas, setVisitas}}>
                    <BrigadaContext.Provider value={{brigada, setBrigada}}>

                        <Leafletmap />
                        <TabelaResumo />

                        <DatePicker  />
                        <SelectBrigada />
                        <BrigadasQueTrabalharam />
                        <VisitasAtampas />

                    </BrigadaContext.Provider>
                </VisitasContex.Provider>
            </DateContext.Provider>
        </>
    )

}



export default App;
