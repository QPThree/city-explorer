import React from 'react';
import { Form, Button, Card, Row, Col, Accordion, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import Error from './Error';
import CityCard from './CityCard';
import Weather from './Weather';
import Movies from './Movies';

// Testing

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityToSearch: '',
      cityData: {},
      lat: '',
      lon:'',
      displayCity: false,
      cityImageSrc: '',
      displayCityMap: false,
      displayError: false,
      errorMessage: '',
      weatherData: {},
      displayWeather: false,
      movieData: {},
      displayMovies: false,
    }
  }
  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    try {
      let locationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityToSearch}&format=json`);

      this.setState({
        cityData: locationData.data[0],
        lat: locationData.data[0].lat,
        lon: locationData.data[0].lon,
        displayCity: true,
        displayError: false,
      })
      this.getWeather();
      this.getMap();
      this.getMovies();
    } catch (error) {

      this.setState({
        displayCity: false,
        displayCityMap: false,
        displayError: true,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`,
      })
    }
  }
  getWeather = async () => {
    try {
      let weatherDataFromServer = await axios.get(`https://qp3-city-explorer-server.herokuapp.com/weather?searchQuery=${this.state.cityToSearch}&lat=${this.state.lat}&lon=${this.state.lon}`);
      this.setState({
        weatherData: weatherDataFromServer,
        displayWeather: true,
      })
    } catch (error) {
      this.setState({
        displayWeather: false,
        errorMessage: `Error: ${error.response.status}, ${error.response.data}`,
      })
    }
  }
  getMap = async () => {
    let map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`);
    this.setState({
      cityImageSrc: map.config.url,
      displayCityMap: true,
    });
  }

  getMovies = async () =>{
    try {
      console.log('trying to get movies from front end');
      let movieData = await axios.get(`https://qp3-city-explorer-server.herokuapp.com/movies?searchQuery=${this.state.cityToSearch}`);
      console.log('movie data from server ', movieData);
      this.setState({
        movieData: movieData,
        displayMovies: true,
      })
    } catch (error) {
      this.setState({
        displayMovies: false,
        errorMessage: `Error: ${error.response.status}, ${error.response.data}`,
      })
    }
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
              <br />
              City Explorer will return data on your city, including an image of the city map!
            </Container>
          </Tab>
        </Tabs>

        <Row className="mainrow">
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
                  <Card.Body> {this.state.displayWeather ? <Weather data={this.state.weatherData.data[0]} /> : <Alert variant="danger">{this.state.errorMessage}</Alert> }</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header className='accordionHeader'>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    <span className='accordionHeader'>Movies</span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>{this.state.displayMovies? 
                  <Movies data = {this.state.movieData} />:
                  <Error
                  errorMessage={this.state.errorMessage} />}</Card.Body>
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
