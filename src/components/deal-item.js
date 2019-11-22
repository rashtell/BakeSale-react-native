import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import { priceDisplay } from '../util'

export default class DealItem extends Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }

  handlePress = () => {
    this.props.onPress(this.props.deal.item.key)

  }

  render() {
    const { deal } = this.props

    return (
      <TouchableOpacity onPress={this.handlePress} style={sytles.deal}>
        <Image style={sytles.image}
          source={{ uri: deal.item.media[0] }} />
        <View style={sytles.info}>
          <Text style={sytles.title}>{deal.item.title}</Text>
          <View style={sytles.footer}>
            <Text style={sytles.cause}>{deal.item.cause.name}</Text>
            <Text style={sytles.price}>{priceDisplay(deal.item.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const sytles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
})
