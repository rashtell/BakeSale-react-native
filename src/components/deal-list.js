import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  FlatList
} from 'react-native'

import DealItem from './deal-item'

export default class DealList extends Component {

  static propsTypes = {
    deals: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList data={this.props.deals}
          renderItem={(item) =>
            <DealItem deal={item} onPress={this.props.onItemPress} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  }
})


// {
//   this.props.deals.map((deal) =>
//   <Text key={deal.key}>
//     {deal.title}
//   </Text>)
// }