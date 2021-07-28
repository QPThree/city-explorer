import React from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
// Testing

class City extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        cityToSearch: '',
        cityData: {},
    }
  }
  getLocation = async (e) =>{
  //  function will use city stored in state to search api with axios
    e.preventDefault();
    console.log('inside getLocation fx');
    console.log(this.state.cityToSearch);
    let locationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityToSearch}&format=json`);
    this.setState({
      cityData: locationData,
    })
    console.log(this.state.cityData);
  }
  handleCityInput = (e) =>{
    e.preventDefault();
    this.setState({
      cityToSearch: e.target.value,
    })
  };
  
  render() {
    return (
      <Form>

      <Form.Group>
        <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter City" />
      <Button variant="primary" type="submit"  onClick = {this.getLocation}>Explore City!</Button>
      </Form.Group>
      </Form>
    )
  }
}

export default City;
