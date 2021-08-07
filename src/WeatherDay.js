import React from 'react';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{new Date(this.props.threeDayDates).toDateString()}</Card.Title>
          <Card.Text>
            {this.props.threeDayDescription}
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={this.props.weatherImage} height='60%' />
        <Card.Footer>
        <i class="bi bi-thermometer-sun"></i>
          <small className="text-muted">
            High:{this.props.highs}
            <br></br>
            <i class="bi bi-thermometer-snow"></i>
            Low: {this.props.lows}
          </small>
        </Card.Footer>
      </Card>
    )
  }
}
export default WeatherDay;
