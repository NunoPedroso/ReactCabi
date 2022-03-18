import {useState, useEffect, useContext} from 'react';

import {DateContext} from "../contexts/date-context";
import {BrigadaContext} from "../contexts/brigada-contex";

import {converterData} from "../helpers/convertData"

import './brigadasQueTrabalharam.scss';

const BrigadasQueTrabalharam = () => {

    const {data} = useContext(DateContext);
    const {brigada} = useContext(BrigadaContext);
    const [dados, setDados] = useState('')

    useEffect(() => {
        if (Array.isArray(data)===false){
          const dateAPI = converterData(data,0,'YYYY-MM-DD')
          const dateAPIPlus1 = converterData(data,1,'YYYY-MM-DD')
          async function fetchBrigadas() {
                const response = await fetch('https://cabi.pt/api/desinfestacoes/equipas/?inicio__gte='+dateAPI+
                    '&inicio__lt='+dateAPIPlus1+brigada);
                const result = await response.json();
                setDados(result)
            };
            fetchBrigadas();
        }
    }, [data,brigada]);

    return (
        <div>
            {Array.isArray(data)===false ? (
                (dados!='' && dados.count!=0) ? (
                    <table className="brigadasQueTrabalharam">
                        <thead >
                            <tr >
                                <th >ID</th>
                                <th >Data</th>
                                <th >Brigada</th>
                                <th >colaborador 1</th>
                                <th >colaborador 2</th>
                            </tr>
                        </thead>
                        <tbody >
                        {dados.results.map(element => (
                            <tr key={element.id}  >
                                <td >{element.id}</td>
                                <td >{element.data}</td>
                                <td >{element.brigada}</td>
                                <td >{element.pessoas[0].nome}</td>
                                <td >{element.pessoas[1].nome}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="brigadasQueTrabalharamAcarregar" >Brigadas não trabalharam nesse dia</p>
                )
            ) : (
                <p className="brigadasQueTrabalharamAcarregar"> Selecionar Data </p>
            )}
        </div>
    );
}

export default BrigadasQueTrabalharam;