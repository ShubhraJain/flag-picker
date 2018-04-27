import React, { Component } from 'react';
import '../App.css';
import SearchBox from './SearchBox.js';
import data from '../data/continents.json'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      continentList: data,
      selectedContinent: '',
      selectedCountries: [],
      isChecked: false,
      flags: [],
    };

    this.searchContinent = this.searchContinent.bind(this);
    this.handleCountrySelection = this.handleCountrySelection.bind(this);
    this.handleClearingFlags = this.handleClearingFlags.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  searchContinent(selectedConti) {
    this.setState({
      selectedContinent: selectedConti
    });
  }

  handleCountrySelection(country, flag, checked) {
    if (checked) {
      this.state.selectedCountries.push(country);
      this.state.flags.push(flag);
    } else {
      var idx = this.state.selectedCountries.indexOf(country);
      this.state.selectedCountries.splice(idx, 1);
      this.state.flags.splice(idx, 1);
    }
    this.setState({
      isChecked: checked
    })
  }

  handleClearingFlags() {
    this.setState({
      selectedCountries: [],
      flags: []
    });
  }

  handleInputClick() {
    this.setState({
      selectedContinent: '',
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBox 
          continents={this.state.continentList} 
          onSearch={this.searchContinent}
          selectedContinent={this.state.selectedContinent}
          onCheck={this.handleCountrySelection}
          selectedCountries={this.state.selectedCountries}
          flags={this.state.flags}
          isChecked={this.state.isChecked}
          clear={this.handleClearingFlags}
          onClick={this.handleInputClick}
        />
      </div>
    );
  }
}

export default App;
