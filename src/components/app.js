/**
 * BakeSale App
 * 
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'

import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native'


import ajax from '../ajax'
import DealList from './deal-list'
import DealDetail from './deal-detail'
import SearchBar from './search-bar'

class App extends Component {
  titleXPos = new Animated.Value(0)

  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
    activeSearchTerm: '',
  }

  animateTitle = (distance = 100, duration = 1000) => {
    Animated.timing(
      this.titleXPos,
      {
        toValue: distance,
        duration: duration,
        easing: Easing.ease,
      }
    ).start(({ finished }) => {
      if (finished) this.animateTitle(-1 * distance)
    })
  }

  async componentDidMount() {
    const width = Dimensions.get('window').width
    this.animateTitle(width/2)

    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }


  setCurrentDeal = (dealId) => {
    this.setState({ currentDealId: dealId })
  }

  unSetCurrentDeal = () => {
    this.setState({ currentDealId: null })
  }

  getCurrentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId)
  }


  searchDeals = async (searchTerm) => {
    let dealsFromSearch = []

    console.log('app: searchDeals: reached');

    if (searchTerm) dealsFromSearch = await ajax.fetchDealsSearchResult(searchTerm)

    this.setState({ dealsFromSearch, activeSearchTerm: searchTerm })
  }
  
  render() {

    if (this.state.currentDealId) {

      return (
        <View style={styles.main}
        >
          <DealDetail initialDealData={this.getCurrentDeal()}
            onBack={this.unSetCurrentDeal}
          />
        </View>
      )
    }

    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch :
      this.state.deals
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}
        >
          <SearchBar searchDeals={this.searchDeals}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList deals={dealsToDisplay}
            onItemPress={this.setCurrentDeal}
          />
        </View>
      )
    }
    return (
      <Animated.View style={[styles.container, { left: this.titleXPos }]}
      >
        <Text style={styles.header}
        >
          BakeSale
        </Text>
      </Animated.View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 30,
  }
})

export default App
