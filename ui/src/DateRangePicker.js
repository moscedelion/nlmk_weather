import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class DateRangePicker extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

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

export default DateRangePicker;
