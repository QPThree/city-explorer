import React from 'react';
import Card from 'react-bootstrap/Card';

class Restaurant extends React.Component {

  renderCards(data) {
    console.log('data inside renderCards:', data);
    return data.map(restaurant => (
      <Card className='restaurantCard shadow p-3 mb-5 bg-white rounded thumbnail-img'>
        <Card.Header id="title">{restaurant.data.name}</Card.Header>
        <Card.Body>
          <Card.Title>{restaurant.data.rating} / 5</Card.Title>
          <Card.Text >
            {restaurant.data.price}
          </Card.Text>
        </Card.Body>
        <Card.Img class="img-fluid" style={{ height:'50vh', width: '50vw', margin: 'auto'}} variant="bottom" src={`${restaurant.data.image_url}`} height='60%' />
        <Card.Footer>
          <small className="text-muted">
            Call: {restaurant.data.phone}
          </small>
        </Card.Footer>
      </Card>
    ))
  }

  render() {
    return (
      <>
        {this.renderCards(this.props.data.data)}
      </>
    )
  }
}

export default Restaurant;
