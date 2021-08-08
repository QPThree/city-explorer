import React from 'react';
import Card from 'react-bootstrap/Card';


class WeatherDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherIcon: '',
    }
  }
  setWeatherIcon = () => {
    let cloudRegex = /cloud/i;
    let rainRegex = /rain/i;
    let sunRegex = /sun/i;
    let arr = this.props.threeDayDescription.split(' ');
    arr.forEach(word => {
      if (cloudRegex.test(word)) {
        console.log(word);
        this.setState({
          weatherIcon: 'cloud',
        });
        console.log(this.state);
      };
      if (rainRegex.test(word)) {
        this.setState({
          weatherIcon: 'rain',
        });
        console.log(this.state);
      };
      if (sunRegex.test(word)) {
        this.setState({
          weatherIcon: 'sun',
        });
        console.log(this.state);
      }; 
    });
  };

render() {
  this.setWeatherIcon.bind(this);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{new Date(this.props.threeDayDates).toDateString()}</Card.Title>
        <Card.Text>
          {this.props.threeDayDescription}
          <br></br>
          {this.props.threeDayDescription.includes('rain')?<h1><i class="bi bi-cloud-rain"></i></h1> : ''}
          {this.props.threeDayDescription.includes('cloud')? <h1><i class="bi bi-cloud-sun"></i></h1> : ''}
          {this.props.threeDayDescription.includes('sun')?<h1><i class="bi bi-sun"></i></h1> : ''}
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={this.props.weatherImage} height='60%' />
      <Card.Footer>
        <h1><i class="bi bi-thermometer-sun"></i></h1>
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
