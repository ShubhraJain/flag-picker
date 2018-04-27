import React, { Component } from 'react';

class Flags extends Component {
  render() {
    return (
      <span className="flags-display">
        {this.props.flag}
      </span>
    )
  }    
}


export default Flags;