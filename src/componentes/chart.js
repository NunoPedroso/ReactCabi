import React from "react";
import ReactDOM from "react-dom";
import AnyChart from "anychart-react";
import anychart from "anychart";

import './chart.scss'

const Chart = (dados) => {
    console.log(dados)
    return(
        <>
            <div className="graficoConteiner">
                <div className="grafico">
                    <AnyChart type="pie"
                              data={[1, 2, 3, 4]}
                    />
                </div>
            </div>
            <div className="graficoConteiner">
                <div className="grafico1">
                    <AnyChart type="pie"
                              data={[4, 2, 3, 4,5,7,100]}
                    />
                </div>
            </div>
        </>
    );
}

export default Chart;