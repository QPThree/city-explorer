import React from 'react';
import { Form, Button, Card, Row, Col, Accordion } from 'react-bootstrap';
import axios from 'axios';
import Error from './Error';

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
      displayError: false,
      errorMessage: '',
    }
  }
  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    console.log('inside getLocation fx');
    console.log(this.state.cityToSearch);
    try {
      let locationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityToSearch}&format=json`);
      this.setState({
        cityData: locationData.data[0],
        displayCity: true,
        displayError: false,

      })
      console.log(locationData);
      this.getMap();
    } catch (error) {

      this.setState({
        displayCity: false,
        displayCityMap: false,
        displayError: true,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`,
      })
    }
  }
  getMap = async () => {
    let map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`);
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
        <Form className='form'>
          <Form.Group>
            <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter City" />
            <Button className='button' variant="primary" type="submit" onClick={this.getLocation}>Explore!</Button>
          </Form.Group>
        </Form>
        <Row>
          <Col>
            <Card className="card">
              {this.state.displayCity ? <Card.Header>{this.state.cityData.display_name}</Card.Header> : ''}
              {this.state.displayCity ? <Card.Body>Latitude - {this.state.cityData.lat} <br></br> Longitude - {this.state.cityData.lon}</Card.Body> : ''}
              {this.state.displayCityMap ? <Card.Img variant="top" src={this.state.cityImageSrc} /> : ''}
            </Card>
          </Col>
          <Col>
            {this.state.displayError ? <Error
              errorMessage={this.state.errorMessage} /> : ''}
            {this.state.displayCity ? <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                   Read More!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><a href={`https://en.wikipedia.org/wiki/${this.state.cityToSearch}`}>Wikipedia</a></Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion> : ''}
          </Col>
        </Row>
      </>
    )
  }
}

export default City;
