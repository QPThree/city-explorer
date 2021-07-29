import React from 'react';


class Error extends React.Component {
  render(){
    return(
      <h3 className = 'error'>{this.props.errorMessage}</h3>
    );
  }
}
export default Error;
