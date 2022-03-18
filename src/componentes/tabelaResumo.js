import {VisitasContex} from "../contexts/visitas-context";

import './tabelaresumo.scss'
import {useContext, useEffect, useState} from "react";
import {converterData} from "../helpers/convertData";

import Chart from "./chart";



const TabelaResumo = () => {

    const {visitas} = useContext(VisitasContex)
    let results

    let blatideosResumoNiveis = []
    let blatideosproduto = 0

    let murideosResumoNiveis = []
    let murideosproduto = 0
    const [dados, setDados] = useState('')


    function contagem(dados,index,tipo,produto){
            blatideosResumoNiveis = []
            blatideosproduto = 0
            murideosResumoNiveis = []
            murideosproduto = 0


            if (dados.count > 0){
                results = dados.results
            } else {
                results = []
            }
            for (var i = 0 ; i < results.length ; i++){
                if (results[i].inspecao_blatideos != null){
                    if (results[i].inspecao_blatideos.nivel != null){
                        if (blatideosResumoNiveis[results[i].inspecao_blatideos.nivel]==undefined){
                            blatideosResumoNiveis[results[i].inspecao_blatideos.nivel] = 0
                        }
                        blatideosResumoNiveis[results[i].inspecao_blatideos.nivel] ++
                    }
                    if (results[i].inspecao_blatideos.produto_aplicado == true){
                        blatideosproduto ++
                    }
                }
                if (results[i].inspecao_murideos != null){
                    if (results[i].inspecao_murideos.nivel != null){
                        if (murideosResumoNiveis[results[i].inspecao_murideos.nivel]==undefined){
                            murideosResumoNiveis[results[i].inspecao_murideos.nivel] = 0
                        }
                        murideosResumoNiveis[results[i].inspecao_murideos.nivel] ++
                    }
                    if (results[i].inspecao_murideos.quantidade_produto != undefined && results[i].inspecao_murideos.quantidade_produto != null){
                        murideosproduto = murideosproduto + results[i].inspecao_murideos.quantidade_produto
                    }
                }
            }
            if (tipo=='murideos' && produto==false){
                return murideosResumoNiveis[index]
            }
            if (tipo=='blatideos'&& produto==false){
                return blatideosResumoNiveis[index]
            }
            if (tipo=='murideos' && produto==true){
                return murideosproduto
            }
            if (tipo=='blatideos'&& produto==true){
                return blatideosproduto
            }

    }

    useEffect(() => {
        setDados(visitas)
    }, [visitas]);

        return(
            <>
             { (dados)!='' ? (
                 <div className="columConteiner">
                 <table className="tabelaResumo">
                    <thead >
                        <tr >
                            <th rowSpan={2} colSpan={2}></th>
                            <th colSpan={2}>Blatideos</th>
                            <th colSpan={2}>Murideos</th>
                        </tr>
                        <tr >
                            <th>total </th>
                            <th>Produto</th>
                            <th>total </th>
                            <th>Produto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td rowSpan={5}>Nivel</td>
                            <td>nulo</td>
                            <td>{contagem(dados,1,'blatideos',false)}</td>
                            <td rowSpan={5}>{contagem(dados,1,'blatideos',true)}</td>
                            <td>{contagem(dados,1,'murideos',false)}</td>
                            <td rowSpan={5}>{contagem(dados,1,'murideos',true)}</td>
                        </tr>
                        <tr >
                            <td>fraco</td>
                            <td>{contagem(dados,2,'blatideos',false)}</td>
                            <td>{contagem(dados,2,'murideos',false)}</td>
                        </tr>
                        <tr >
                            <td>médio</td>
                            <td>{contagem(dados,3,'blatideos',false)}</td>
                            <td>{contagem(dados,3,'murideos',false)}</td>
                        </tr>
                        <tr >
                            <td>forte</td>
                            <td>{contagem(dados,4,'blatideos',false)}</td>
                            <td>{contagem(dados,4,'murideos',false)}</td>
                        </tr>
                        <tr >
                            <td>muito forte</td>
                            <td>{contagem(dados,5,'blatideos',false)}</td>
                            <td>{contagem(dados,5,'murideos',false)}</td>
                        </tr>
                    </tbody>
                </table>
                 <Chart />
                 </div>
                ) : (console.log('não'))
             }

            </>
        )

}

export default TabelaResumo;