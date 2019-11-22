import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder, Dimensions, Button, Linking } from 'react-native'
import ajax from '../ajax'
import { priceDisplay } from '../util'



export default class DealDetail extends Component {
  imageXPos = new Animated.Value(0)
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (evt, ges) => {
      this.imageXPos.setValue(ges.dx)
    },
    onPanResponderRelease: (evt, ges) => {
      this.width = Dimensions.get('window').width
      if (Math.abs(ges.dx) > this.width * 0.4) {
        const direction = Math.sign(ges.dx)
        
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 300,
        }).start(() => this.handleSwipe(-1 * direction))
      } 
      else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start()
      }
    }
  })

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start()
      return
    }
    
    this.setState((prev) => ({
      imageIndex: prev.imageIndex + indexDirection
    }), () => {
      this.imageXPos.setValue(this.width * indexDirection)
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start()
    })
  }

  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired
  }

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  }
  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
    this.setState({ deal: fullDeal })

  }

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url)
  }

  render() {
    const { deal } = this.state

    return (
      <View style={styles.deal}
      >
        <TouchableOpacity onPress={this.props.onBack}
        >
          <Text style={styles.backLink}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          style={[{ left: this.imageXPos }, styles.image]}
          source={{ uri: deal.media[this.state.imageIndex] }}
        />
        <View>
          <Text style={styles.title}
          >
            {deal.title}
          </Text>
        </View>
        <ScrollView style={styles.detail}
        >
          <View style={styles.footer}
          >
            <View style={styles.info}
            >
              <Text style={styles.price}
              >
                {priceDisplay(deal.price)}
              </Text>
              <Text style={styles.cause}
              >
                {deal.cause.name}
              </Text>
            </View>
            {deal.user && (
              <View style={styles.user}
              >
                <Image source={{ uri: deal.user.avatar }}
                  style={styles.avatar}
                />
              </View>
            )}
          </View>
          <View style={styles.description}
          >
            <Text>
              {deal.description}
            </Text>
          </View>
          <Button title='Buy this deal!'
            onPress={this.openDealUrl}
            style={styles.deal}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detail: {
  },
  deal: {
    marginBottom: 20,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});
