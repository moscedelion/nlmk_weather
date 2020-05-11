import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class App extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

 handleChange = date => {
    this.setState({
      startDate: date
    });
    console.log(date.toISOString().split('T')[0])
  };

  render() {
    return (
    <>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        dateFormat="MM/dd/yyyy"
      />
      <DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange}
        selectsEnd
        startDate={this.state.endDate}
        endDate={this.state.endDate}
        dateFormat="MM/dd/yyyy"
      />
    </>
    );
  }
}

export default App;
