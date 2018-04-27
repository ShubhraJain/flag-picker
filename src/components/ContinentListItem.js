import React, {Component} from 'react';

class ContinentListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onSearch(event.target.innerHTML);
  }

  render() {
    return (
      <li className="data-list" 
        onClick={this.handleClick}> 
          {this.props.continent}
      </li>
    );
  }
}

export default ContinentListItem;