import React from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
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
      lon: '',
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
      let weatherDataFromServer = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/weather?searchQuery=${this.state.cityToSearch}&lat=${this.state.lat}&lon=${this.state.lon}`);
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

  getMovies = async () => {
    try {
      let movieData = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/movies?searchQuery=${this.state.cityToSearch}`);
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
            <Form className='form'>
              <Form.Group>
                <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter City" />
                <Button className='button' variant="primary" type="submit" onClick={this.getLocation}><i class="bi bi-binoculars"></i>Explore!</Button>
              </Form.Group>
            </Form>
         
        
        {this.state.displayError ? <Error
              errorMessage={this.state.errorMessage} /> : ''}
        {this.state.displayCityMap ?       
        <Tabs defaultActiveKey="map" >
          <Tab eventKey="map" title="Map">
            {this.state.displayCity ?
              <Container>
                <CityCard
                  displayCity={this.state.displayCity}
                  cityData={this.state.cityData}
                  displayCityMap={this.state.displayCityMap}
                  cityImageSrc={this.state.cityImageSrc} />
                <a href={`https://en.wikipedia.org/wiki/${this.state.cityToSearch}`}>Learn More</a>
              </Container>
              : ''}
          </Tab>
          <Tab eventKey="weather" title="Weather">
            <Card.Body> {this.state.displayWeather ? <Weather data={this.state.weatherData.data[0]} /> : <Alert variant="danger">{this.state.errorMessage}</Alert>}</Card.Body>
          </Tab>
          <Tab eventKey="movies" title="Movies">
            <Card.Body>
              {this.state.displayMovies ?
                <Movies data={this.state.movieData} /> :
                <Error
                  errorMessage={this.state.errorMessage} />}</Card.Body>
          </Tab>
        </Tabs> : ''}
      </>
    )
  }
}

export default City;
