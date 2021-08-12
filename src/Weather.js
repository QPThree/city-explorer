import React from 'react';
import WeatherDay from './WeatherDay';
import CardGroup from 'react-bootstrap/CardGroup';
import weatherImage0 from './assets/img/weather.jpg'
import weatherImage1 from './assets/img/weather2.jpg'
import weatherImage2 from './assets/img/weather3.jpg'
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherImageArr: [weatherImage0, weatherImage1, weatherImage2],
    }
  }

  makeWeatherDayCards(obj) {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<WeatherDay
        threeDayDates={obj[i].time}
        threeDayDescription={obj[i].forecast}
        weatherImage={this.state.weatherImageArr[i]}
        // highs={obj.highs[i]}
        // lows={obj.lows[i]}
         />)
    }
    return arr;
  }

  displayData = (obj) => {
    return (
      <CardGroup className='shadow-sm p-3 mb-5 bg-white rounded'>
        {this.makeWeatherDayCards(obj)}
      </CardGroup>)
  }

  render() {

    return (
      <>
        {this.displayData(this.props.data)}
      </>
    )
  }
}

export default Weather;
//this.props.data.data[0].threeDayDates[0]
