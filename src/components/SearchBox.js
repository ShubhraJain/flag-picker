import React, { Component } from 'react';
import ContinentListItem from './ContinentListItem.js';
import CountriesListItem from './CountriesListItem.js';
import Flags from './Flags.js';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: this.props.continents.map( (elem) => {
        return elem.continent.toLowerCase();
      }),
      countries: (continentName) => {
        return this.props.continents.filter( (elem) => {
          return elem.continent.toLowerCase() === continentName
        })[0].countries
      },
      showContinents: false,
      countriesAndFlags: (continentName) => {
        return this.props.continents.filter( (elem) => {
          return elem.continent.toLowerCase() === continentName
        })[0].countries.map( (country) => {
          return [country.name, country.flag];
        })
      },
      showCountries: false
    }
    this.handleContinentSelection = this.handleContinentSelection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showContinentSelection = this.showContinentSelection.bind(this);
    this.hideContinentSelection = this.hideContinentSelection.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.hideCountrySelection = this.hideCountrySelection.bind(this);
    this.showCountrySelection = this.showCountrySelection.bind(this);
  }

  renderContinents() {
    return (
      <ul>
        {this.state.results.map( (elem, index) => {
          return <ContinentListItem
            key={index}
            continent={elem}
            onSearch={this.props.onSearch}
          />
        })
      }
    </ul>
  )}

  renderContinentSelection() {
    if (this.props.selectedContinent !== '') {
      return this.handleContinentSelection();
    } else if (this.state.showContinents) {
      return this.renderContinents()
    }
  }

  renderCountrySearchBox() {
    if (this.props.selectedContinent) {
      var continentSelected = this.props.selectedContinent;
      return (
        <div id="country-search">
          <p className="para-text">Now, select a country.</p>
          <input type="text" 
                 className="input-box"
                 onClick={this.showCountrySelection}
          /> 
          {this.renderCountrySelection(continentSelected)}
        </div>
      );
    }
  }
  
  renderCountries(continent) {
    var continentData = this.state.countriesAndFlags(continent);
    return (
      <ul >
        {this.state.countries(continent).map( (elem) => {
          return <CountriesListItem
            key={elem.name}
            country={elem.name}
            onCheck={this.props.onCheck}
            isChecked={this.props.isChecked}
            contiData={continentData}
          />
        })}
      </ul>
    )
  }

  renderCountrySelection(continentSelected) {
    if (this.state.showCountries) {
      return this.renderCountries(continentSelected);
    }
  }

  renderFlags() {
    if (this.props.flags.length) {
      return (
        <div id="selected-flags">
          <p className="para-text">Selected flags:</p>
          {this.props.flags.map( (flag, idx) => {
            return <Flags
              key={idx}
              flag={flag}
            />
          })}
          <br/>
          <button id="clear-btn"
            onClick={this.handleButtonClick}>
            Clear flags
          </button>
        </div>
      );
    }
  }

  handleButtonClick() {
    this.props.clear();
    this.hideCountrySelection();
  }

  handleInputChange(event) {
    event.preventDefault();
    const q = this.refs.continentName.value.toLowerCase();
    const prevLen = this.state.query.length;
    this.setState({
      query: q
    }, () => {
      if (this.state.query.length === 0) {
        this.setState({
          results: this.props.continents.map( (elem) => {
                    return elem.continent.toLowerCase();
                  })
        });
        {this.renderContinents()} 
      } else if(prevLen > this.state.query.length) {
        this.setState({
          results: this.props.continents.map( (elem) => {
                      return elem.continent.toLowerCase()
                    }).filter( (elem) => {
                      return elem.indexOf(q) !== -1;
                    })
        });
      } else {
        this.updateResults(q)
      }
    });
  }

  handleContinentSelection() {
    this.refs.continentName.value = ''
    const selContinent = this.props.selectedContinent[0].toUpperCase() + 
                         this.props.selectedContinent.slice(1);
    return (
      <div id="selected-continent">
        <p className="para-text">You selected</p>
        <h2>{selContinent}</h2>
      </div>
    );
  }

  updateResults(q) {
    var conts = this.state.results.filter( (elem) => {
                  return elem.indexOf(q) !== -1;
                });
    this.setState({
      results: conts
    });
  }

  showContinentSelection() {
    this.setState({showContinents: true});
    this.props.onClick();
  }
  hideContinentSelection() {
    this.setState({showContinents: false});
  }

  showCountrySelection() {
    this.setState({showCountries: true});
  }

  // focusInCountryDiv({relatedTarget, currentTarget}) {
  //   console.log("c.id="+ currentTarget.id);
  //   return currentTarget.id !== "country-search"
  // } 

  hideCountrySelection(e) {
    // console.log('hideCountrySelection', e.target);
    // if (!this.focusInCountryDiv(e)) {
    this.setState({showCountries: false});
    // }
  }

  render() {
    return (
      <div id="container">
        <div id="continent-search">
          <p className="para-text">Select a continent.</p>
          <form>
            <input 
              type="text" 
              className="input-box" 
              ref="continentName"
              onChange={this.handleInputChange}
              onClick={this.showContinentSelection}
            />
          </form>
          {this.renderContinentSelection()}
        </div>
        {this.renderCountrySearchBox()}
        {this.renderFlags()}
      </div>
    );
  }    
}

export default SearchBox;