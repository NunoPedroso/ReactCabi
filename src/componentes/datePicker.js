import React from 'react';
import {useContext,useEffect} from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import {DateContext} from "../contexts/date-context";
import './datePicker.scss'

function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

export default function DatePicker() {

    const {setData} = useContext(DateContext);
    const FORMAT = 'dd-MM-yyyy';

    return (
        <div className="datePicker">
                <label>Data:</label>
                <DayPickerInput className="datePickerBox"
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    onDayChange={ day =>  setData(day) }
                />
        </div>
    );

}