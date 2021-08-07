import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class CustomNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHowTo: false,
      howToMessage: `Enter a city of your choosing, and select 'Explore!' City Explorer will return data on your city, including an image of the city map. Check out the tabs for additional information on Movies, Weather, and more!`,
    }
  }
  handleHowTo = () => {
    this.setState({
      displayHowTo: true,
    })
  }
  handleCloseModal = () => {
    this.setState({
      displayHowTo: false,
    })
  }
  render() {
    return (
      <>
        <Navbar expand="lg" className="d-flex justify-content-between navbar" >
          <Navbar.Brand href="#home"><h1>City Explorer <i class="bi bi-tree"></i></h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Button variant="light" onClick={this.handleHowTo}>How To <i class="bi bi-chat-right-dots"></i></Button>
        </Navbar>
        <Modal
          show={this.state.displayHowTo}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              City Explorer - How To
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.state.howToMessage}
            </p>
          </Modal.Body>
          <Button variant = "danger" onClick={this.handleCloseModal}>Close</Button>
        </Modal>
      </>
    )
  }
}
export default CustomNavbar;
