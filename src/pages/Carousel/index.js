import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { scrollInterpolator, animatedStyles } from './animation';
import { styles } from '../Carousel/styles'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}

export default class Index extends Component {
  
  state = {
    index: 0
  }

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
      </View>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => this.carousel = c}
          data={DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
        <Text style={styles.counter}
        >
          {this.state.index}
        </Text>
      </View>
    );
  }
}
