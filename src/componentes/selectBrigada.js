import React, {Component, useContext, useState} from 'react'
import {BrigadaContext} from "../contexts/brigada-contex";

import './selectBrigada.scss'

const SelectBrigada = ({
                         options = [
                             { key: 22222, value: '', label: '' },
                             { key: 22223, value: '&equipa__brigada=b1', label: 'Zona 1' },
                             { key: 22224, value: '&equipa__brigada=b2', label: 'Zona 2' }
                         ]
                  }) => {

    const {brigada, setBrigada} = useContext(BrigadaContext);
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    return (
        <div className="selectBrigada">
            <label>Brigada:</label>
            <select
                value={selectedOption}
                onChange={e => {
                    setSelectedOption(e.target.value)
                    setBrigada(e.target.value)}
            }>
                {options.map(o => (
                    <option key={o.key} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectBrigada;
