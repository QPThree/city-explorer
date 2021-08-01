import React from 'react';
import Table from 'react-bootstrap/Table';


class Weather extends React.Component {
  displayData = (obj) => {  
      return (<Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>{obj.threeDayDates[0]}</th>
            <th>{obj.threeDayDates[1]}</th>
            <th>{obj.threeDayDates[2]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{obj.threeDayDescription[0]}</td>
            <td>{obj.threeDayDescription[1]}</td>
            <td>{obj.threeDayDescription[2]}</td>
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
