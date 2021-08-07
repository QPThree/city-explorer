import React from 'react';
import City from './City';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import CustomNavbar from './CustomNavbar.js';

class App extends React.Component {
  render() {
    return (
      <>
        <CustomNavbar />
        <main>
          <Container>
            <City />
          </Container>
        </main>
      </>
    )
  }
}

export default App;
