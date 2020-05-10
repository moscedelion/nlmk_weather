import React from 'react';
import {useState} from 'react';
import './App.css';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



function App() {
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
	return <>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="MM/dd/yyyy"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        dateFormat="MM/dd/yyyy"
      />
    </>
}

export default App;
