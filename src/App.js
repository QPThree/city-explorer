import React from 'react';
import City from './City';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar expand="lg" className = "navbar">
          <Navbar.Brand href="#home"><h1>City Explorer</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
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
