import {useState, useEffect, useContext} from 'react';

import {DateContext} from "../contexts/date-context";
import {BrigadaContext} from "../contexts/brigada-contex";
import {VisitasContex} from "../contexts/visitas-context";
import {converterData} from "../helpers/convertData";
import './visitasAtampas.scss'

const VisitasAtampas = () => {

    const {data} = useContext(DateContext);
    const {brigada} = useContext(BrigadaContext);
    const {setVisitas} = useContext(VisitasContex)
    const [dados, setDados] = useState('')

   useEffect(() => {
       if (Array.isArray(data)===false) {
           const dateAPI = converterData(data,0,'YYYY-MM-DD')
           const dateAPIPlus1 = converterData(data,1,'YYYY-MM-DD')
           const endpoint = 'https://cabi.pt/api/desinfestacoes/visitatampas/' +
           '?per_page=1000&data_criacao__gte='+dateAPI+'&data_criacao__lte='+dateAPIPlus1+brigada+'&ordering=data_criacao'
           async function fetchEquipas() {
               const response = await fetch(endpoint );
               const result = await response.json();
               setVisitas(result)
               setDados(result)
           };
           fetchEquipas();
       }
    }, [data,brigada]);

    const retornaEstadoTampa = (tampa) => {
        let result = '';
        for(var i in tampa){
            if (i != 'id' && i != 'pronta_inspecao_baratas' && i != 'pronta_inspecao_ratos' ){
                if (tampa [i] == true){
                    if (result==''){
                        result = `${i} `
                    } else {
                        result = `${result}, ${i} `
                    }
                }
            }
        }
        return result
    }

     return(
        <>
            <div>
                {Array.isArray(data)===false ? (
                    (dados!='' && dados.count!=0) ? (
                    <table className="visitasAtampas">
                        <thead >
                        <tr >
                            <th rowSpan={2}>Hora</th>
                            <th rowSpan={2}>Morada</th>
                            <th rowSpan={2}>Tampa</th>
                            <th colSpan={2}>Blatideos</th>
                            <th colSpan={2}>Murideos</th>
                        </tr>
                        <tr >
                            <th>Nivel </th>
                            <th>Produto</th>
                            <th>Nivel </th>
                            <th>Produto</th>
                        </tr>
                        </thead>
                        <tbody >
                        {dados.results.map(element => (
                            <tr key={element.id}  >

                                <td>{element.time.substr(11,8)}</td>

                                <td>{element.tampa.morada}</td>

                                <td>{retornaEstadoTampa(element.inspecao_tampa)}</td>

                            {/*blatideos nivel */}
                                {element.inspecao_blatideos===null ? (<td>---</td>) : (<td>{element.inspecao_blatideos.nivel}</td>)}

                            {/*blatideos produto*/}
                                {element.inspecao_blatideos===null ? (<td>---</td>) : (
                                    element.inspecao_blatideos.produto_aplicado===false ? (<td>Não</td>) : ( <td>Sim</td> )
                                )}

                            {/*murideos nivel*/}
                                {element.inspecao_murideos===null  ? (<td>---</td>) : (<td>{element.inspecao_murideos.nivel}</td>)}

                            {/*murideos produto*/}
                                {element.inspecao_murideos===null  ? (<td>---</td>) : (
                                    element.inspecao_murideos.quantidade_produto===null  ? (<td>0</td>) : ( <td>{element.inspecao_murideos.quantidade_produto}</td> )
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                        <p className="visitasAtampasAcarregar"> Sem visitas nesse dia </p>
                    )
                    ) : (
                    <p className="visitasAtampasAcarregar"> Selecionar Data </p>
                )}
            </div>
        </>
    )
}

export default VisitasAtampas;