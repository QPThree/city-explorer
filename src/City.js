import React from 'react';
import { Form, Button, Card, Row, Col, Accordion, Container} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios';
import Error from './Error';
import CityCard from './CityCard';

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
        <Tabs defaultActiveKey="form" >
          <Tab eventKey="form" title="Search">
            <Form className='form'>
              <Form.Group>
                <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter City" />
                <Button className='button' variant="primary" type="submit" onClick={this.getLocation}>Explore!</Button>
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="howto" title="How To">
            <Container>
              Enter a city of your choosing, and select 'Explore!'
              <br/>
               City Explorer will return data on your city, including an image of the city map!
            </Container>
          </Tab>
        </Tabs>

        <Row className = "mainrow">
          <Col>
            {this.state.displayCity ?
              <CityCard
                displayCity={this.state.displayCity}
                cityData={this.state.cityData}
                displayCityMap={this.state.displayCityMap}
                cityImageSrc={this.state.cityImageSrc} /> : ''}
          </Col>
          <Col>
            {/* Displays if error  */}
            {this.state.displayError ? <Error
              errorMessage={this.state.errorMessage} /> : ''}
            {/* Displays if no error */}
            {this.state.displayCity ? <Accordion>
              <Card>
                <Card.Header className='accordionHeader'>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <span className='accordionHeader'>Read More</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body><a href={`https://en.wikipedia.org/wiki/${this.state.cityToSearch}`}>Wikipedia</a></Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header className='accordionHeader'>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <span className='accordionHeader'>Weather</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Weather here</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header className='accordionHeader'>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    <span className='accordionHeader'>Movies</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>Movies here</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header className='accordionHeader'>
                  <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    <span className='accordionHeader'>Future Feature</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>Feature here</Card.Body>
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
