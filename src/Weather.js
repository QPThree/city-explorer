import React from 'react';
import Table from 'react-bootstrap/Table';


class Weather extends React.Component {
  displayData = (obj) => {  
      return (<Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className = 'weatherHeader'>{new Date(obj.threeDayDates[0]).toDateString()}</th>
            <th className = 'weatherHeader'>{new Date(obj.threeDayDates[1]).toDateString()}</th>
            <th className = 'weatherHeader'>{new Date(obj.threeDayDates[2]).toDateString()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className = 'weatherData'>{obj.threeDayDescription[0]}</td>
            <td className = 'weatherData'>{obj.threeDayDescription[1]}</td>
            <td className = 'weatherData'>{obj.threeDayDescription[2]}</td>
          </tr>
        </tbody>
      </Table>)
  }

  render() {

    return (
      <h2>{this.displayData(this.props.data)}</h2>
    )
  }
}

export default Weather;
//this.props.data.data[0].threeDayDates[0]
