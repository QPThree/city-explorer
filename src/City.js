import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Testing

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityToSearch: '',
      cityData: {},
      displayCity: false,
      cityImageSrc: '',
      displayCityMap: false,
    }
  }
  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    console.log('inside getLocation fx');
    console.log(this.state.cityToSearch);
    let locationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityToSearch}&format=json`);
    this.setState({
      cityData: locationData.data[0],
      displayCity: true,
      
    })
    this.getMap();
    console.log(this.state.cityData);
  }
  getMap = async () => {
    let map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom={10}`);
    this.setState({
      cityImageSrc: map.config.url,
      displayCityMap: true,
    });
    console.log(this.state.cityImageSrc);
  }
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      cityToSearch: e.target.value,
    })
  };

  render() {
    return (
      <>

        <Form>
          <Form.Group>
            <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter City" />
            <Button variant="primary" type="submit" onClick={this.getLocation}>Explore!</Button>
          </Form.Group>
        </Form>
        <Row>
          <Col>
            <Card>
              {this.state.displayCityMap ? <Card.Img variant="top" src={this.state.cityImageSrc} /> : ''}
              {this.state.displayCity ? <Card.Header>{this.state.cityData.display_name}</Card.Header> : ''}
              {this.state.displayCity ? <Card.Body>Latitude - {this.state.cityData.lat} <br></br> Longitude - {this.state.cityData.lon}</Card.Body> : ''}
            </Card>
          </Col>
          <Col>
          </Col>
        </Row>
      </>
    )
  }
}

export default City;
