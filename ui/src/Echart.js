import React from 'react';
import ReactEcharts from 'echarts-for-react';
import DatePicker from "react-datepicker";

class Echart extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    option: {},
    dates: [],
    humidity: [],
    pressure: [],
    temperature: [],
  }

  drawLines = () => {
      let api_dates = [];
      let api_humidity = [];
      let api_pressure = [];
      let api_temperature = [];
    fetch('/api?start_date='+ this.state.startDate.toLocaleDateString()  +'&end_date=' + this.state.endDate.toLocaleDateString()).then(response => response.json()).then( result => {
     result['json_list'].forEach(
        el => {
          api_dates.push(el['date']);
          api_humidity.push(el['humidity']);
          api_pressure.push(el['pressure']);
          api_temperature.push(el['temperature']);
        }
      );
     }
    ).then(
    e => {
      this.updateChartData(api_dates, api_humidity, api_pressure, api_temperature)
    }) 
  };

  updateChartData = (dates, humidity, pressure, temperature) => {
    this.setState({
      option:  {
        title: {
            text: 'новый тайтл'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Температура', 'Давление', 'Влажность']
        },
        yAxis: {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: dates
        },
        series: [{
            name: 'Влажность',
            type: 'line',
            data: humidity
        },
        {
            name: 'Давление',
            type: 'line',
            data: pressure
        },
        {
            name: 'Температура',
            type: 'line',
            data: temperature
        }]
      }
    })
 }

 handleStartChange = date => {
    this.setState({
      startDate: date
    });
    this.drawLines();
  }

 handleEndChange = date => {
   this.setState({
      endDate: date
    });
    this.drawLines();
  }


  render() {
    return (
    <> 
      <ReactEcharts option={this.state.option}/>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleStartChange}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        dateFormat="dd/MM/yyyy"
      />
      <DatePicker
        selected={this.state.endDate}
        onChange={this.handleEndChange}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        dateFormat="dd/MM/yyyy"
      />
    </>
    );
  }
}

export default Echart;