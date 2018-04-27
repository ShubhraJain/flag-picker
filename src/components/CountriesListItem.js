import React, { Component } from 'react';

class CountriesListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false
    };
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(event) {
    var status = !this.state.isChecked;
    this.setState({
      isChecked: status
    })
    const selectedCountry = event.target.value;
    var flag = this.props.contiData.filter( (elem) => {
      return elem[0] === selectedCountry;
    });
    this.props.onCheck(selectedCountry, flag[0][1], status);
  }

  render() {
    return (
      <li>
        <label>
          <input type="checkbox" 
            onChange={this.handleCheckBoxChange}
            value={this.props.country}
            className="country-input"
          />
          {this.props.country}
        </label>
      </li>
    );
  }    
}

export default CountriesListItem;
