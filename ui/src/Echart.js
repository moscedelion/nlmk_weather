import React from 'react';
import ReactEcharts from 'echarts-for-react';
import DatePicker from "react-datepicker";

class Echart extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    option: {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    },{
        data: [850, 952, 801, 434, 1090, 1530, 1120],
        type: 'line',
        smooth: true
    }]
    },
  }

 handleStartChange = date => {
    this.setState({
      startDate: date
    });
  };

 handleEndChange = date => {
    this.setState({
      endDate: date
    });
  };


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
        dateFormat="MM/dd/yyyy"
      />
      <DatePicker
        selected={this.state.endDate}
        onChange={this.handleEndChange}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        dateFormat="MM/dd/yyyy"
      />
    </>
    );
  }
}

export default Echart;
