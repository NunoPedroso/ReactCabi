import {circle} from "leaflet-geodesy";
import * as turf from "@turf/turf";

const singleCircle = (lat, lng, raio) => {
    let circlebuffer = circle([lat,lng],raio)
    let geo =[]
    let temp = []
    let first = []
    for (var i = 0 ; i<circlebuffer._latlngs[0].length; i++){
        if(i==0){first=[circlebuffer._latlngs[0][i].lat , circlebuffer._latlngs[0][i].lng]}
        temp = [circlebuffer._latlngs[0][i].lat , circlebuffer._latlngs[0][i].lng]
        geo.push(temp)
    }
    geo.push(first)
    return (turf.polygon([geo]))
}

const compiledBuffer = (nivel, tipo, raio, visitas) => {
    let tempBuffer = []
    let unionPoligon
    let poly1
    let poly2
    for (var i = 0 ; i < visitas.count ; i ++){
        if(tipo=='blatideos'){
            if (visitas.results[i].inspecao_blatideos!=null){
                if (visitas.results[i].inspecao_blatideos.nivel==nivel){
                    tempBuffer = singleCircle(visitas.results[i].tampa.geom.coordinates[1],visitas.results[i].tampa.geom.coordinates[0],raio)
                    if (unionPoligon==undefined){
                        unionPoligon = tempBuffer
                    } else {
                        poly1 = unionPoligon;
                        poly2 = tempBuffer
                        unionPoligon = turf.union(poly1,poly2)
                    }
                }
            }
        }
        if(tipo=='murideos'){
            if (visitas.results[i].inspecao_murideos!=null){
                if (visitas.results[i].inspecao_murideos.nivel==nivel){
                    tempBuffer = singleCircle(visitas.results[i].tampa.geom.coordinates[1],visitas.results[i].tampa.geom.coordinates[0],raio)
                    if (unionPoligon==undefined){
                        unionPoligon = tempBuffer
                    } else {
                        poly1 = unionPoligon;
                        poly2 = tempBuffer
                        unionPoligon = turf.union(poly1,poly2)
                    }
                }
            }
        }
    }
    return (unionPoligon)
}

export const multipleBufferCompiled = (tipo, niveis, raio, visitas) => {
    console.log(visitas)
    let poly1
    let poly2
    let tempBuffer
    let tempIndex
    let anotherbuffer=[]
    let unionPoligontoTrim
    for (var nivel = niveis.length ; nivel > 0 ; nivel--){
        tempBuffer = compiledBuffer(nivel,tipo, raio, visitas)
        if (tempBuffer != undefined) {
            if (nivel!=5){
                if (unionPoligontoTrim != undefined){
                    poly1=tempBuffer
                    poly2=unionPoligontoTrim
                    tempBuffer = turf.difference(poly1,poly2)
                    unionPoligontoTrim = turf.union(poly1,poly2)
                }
            }
            tempIndex=anotherbuffer.length
            anotherbuffer[tempIndex]=[]
            anotherbuffer[tempIndex].push(nivel)
            anotherbuffer[tempIndex].push(tempBuffer)
            unionPoligontoTrim = tempBuffer
        }
    }
    return anotherbuffer
}
