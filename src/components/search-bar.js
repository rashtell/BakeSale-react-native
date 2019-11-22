import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { TextInput, StyleSheet } from 'react-native'



export default class SearchBar extends Component {

  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
    initialSearchTerm: PropTypes.string.isRequired,
  };

  state = {
    searchTerm: this.props.initialSearchTerm,
  };

  searchItem = (searchTerm) => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur()
  }

  debouncedSearchDeals = debounce(this.searchItem, 300)

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm)
    });
  }

  render() {
    console.log('search-bar: render: searchTerm: ' + this.state.searchTerm);

    return (
      <TextInput style={StyleSheet.input}
        ref={(inputElement) => { this.inputElement = inputElement }}
        onChangeText={this.handleChange}
        placeholder='Search All Deals'
        value={this.state.searchTerm}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
})