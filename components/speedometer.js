import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';

import RNSpeedometer from 'react-native-speedometer'

const labels = [
    {
      name: 'Very Low Sentiment',
      labelColor: '#98F5FF',
      activeBarColor: '#98F5FF', //98F5FF
    },
    {
      name: 'Very Slow',
      labelColor: '#00BFFF',
      activeBarColor: '#00BFFF', //00BFFF
    },
    {
      name: 'Poor Sentiment',
      labelColor: '#1E90FF',
      activeBarColor: '#1E90FF', //1E90FF
    },
    {
      name: 'Normal',
      labelColor:  '#1C86EE',
      activeBarColor: '#1C86EE', //1C86EE
    },
    {
      name: 'Fast',
      labelColor: '#1874CD',
      activeBarColor: '#1874CD', //1874CD
    },
    {
      name: 'Very High Sentiment',
      labelColor: '#104E8B',
      activeBarColor: '#104E8B', //104E8B
    },
  ]


class Speedometer extends React.Component {
  state = {
    value: 0,
  };

  onChange = (value) => this.setState({ value: parseInt(value) });

  render() {
     return (
        <SafeAreaView >
          <TextInput placeholder="Speedometer Value" style={styles.textInput} onChangeText={this.onChange} />
          <RNSpeedometer labels={labels} minValue={-5} maxValue={5} value={this.state.value} size={200}/>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  
  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    height: 25,
    fontSize: 16,
    marginVertical: 50,
    marginHorizontal: 20,
  },
});

export default Speedometer;