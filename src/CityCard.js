import React from 'react';
import Card from 'react-bootstrap/Card';

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Card className="card" border="dark">
        {this.props.displayCity ? <Card.Header>{this.props.cityData.display_name}</Card.Header> : ''}
        {this.props.displayCity ? <Card.Body>Latitude - {this.props.cityData.lat} <br></br> Longitude - {this.props.cityData.lon}</Card.Body> : ''}
        {this.props.displayCityMap ? <Card.Img variant="top" src={this.props.cityImageSrc} /> : ''}
      </Card>
    )
  }
}
export default CityCard;
