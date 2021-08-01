import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import weatherImage1 from './assets/img/weather.jpg'
import weatherImage2 from './assets/img/weather2.jpg'
import weatherImage3 from './assets/img/weather3.jpg'
class Weather extends React.Component {
  displayData = (obj) => {
    return (
      
        <CardGroup className='shadow-sm p-3 mb-5 bg-white rounded'>
          <Card className='weatherCard '>
            
            <Card.Body>
              <Card.Title className='weatherHeader'>{new Date(obj.threeDayDates[0]).toDateString()}</Card.Title>
              <Card.Text className='weatherData'>
                {obj.threeDayDescription[0]}
              </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={weatherImage1} height='60%'/>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
          <Card>
            
            <Card.Body>
              <Card.Title className='weatherHeader'>{new Date(obj.threeDayDates[1]).toDateString()}</Card.Title>
              <Card.Text className='weatherData'>
                {obj.threeDayDescription[1]}
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={weatherImage2} height='60%' />
            <Card.Footer>

            </Card.Footer>
          </Card>
          <Card>
            
            <Card.Body>
              <Card.Title className='weatherHeader'>{new Date(obj.threeDayDates[2]).toDateString()}</Card.Title>
              <Card.Text className='weatherData'>
                {obj.threeDayDescription[2]}
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={weatherImage3} height='60%'/>
            <Card.Footer>

            </Card.Footer>
          </Card>
        </CardGroup>)
  }

        render() {

    return (
        <h2>{this.displayData(this.props.data)}</h2>
        )
  }
}

        export default Weather;
//this.props.data.data[0].threeDayDates[0]
