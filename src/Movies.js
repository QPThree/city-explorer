import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

class Movies extends React.Component {
  displayData = (obj) => {
    console.log('data inside movies.js:', obj);
    return (
      <CardGroup className='shadow-sm p-3 mb-5 bg-white rounded'>
        <Card className='movieCard '>

          <Card.Body>
            <Card.Title >{obj.data[0].original_title}</Card.Title>
            <Card.Text >
              {obj.data[0].overview}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={`https://image.tmdb.org/t/p/original${obj.data[0].poster_path}`} height='60%' />
          <Card.Footer>
            <small className="text-muted"></small>
          </Card.Footer>
        </Card>
        <Card className='movieCard '>

          <Card.Body>
            <Card.Title >{obj.data[1].original_title}</Card.Title>
            <Card.Text >
              {obj.data[1].overview}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={`https://image.tmdb.org/t/p/original${obj.data[1].poster_path}`} height='60%' />
          <Card.Footer>
            <small className="text-muted"></small>
          </Card.Footer>
        </Card>
        <Card className='movieCard '>

          <Card.Body>
            <Card.Title >{obj.data[2].original_title}</Card.Title>
            <Card.Text >
              {obj.data[2].overview}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={`https://image.tmdb.org/t/p/original${obj.data[2].poster_path}`} height='60%' />
          <Card.Footer>
            <small className="text-muted"></small>
          </Card.Footer>
        </Card>
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

export default Movies
