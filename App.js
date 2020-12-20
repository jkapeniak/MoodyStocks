import React from 'react';
import {LineChart, Grid} from 'react-native-svg-charts';
import {View, Text, Button, Alert} from 'react-native';
import StackedAreaExample from './components/StackedAreaExample.js';



class appjs extends React.PureComponent {
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{top: 1, padding: 100}}>
          
        </View>
        <View
          style={{
            justifyContent: 'center',
            //alignItems: 'center',
            //position: 'absolute', //Here is the trick
            bottom: -20, //Here is the trick
          }}>
          <StackedAreaExample />
        </View>
      </View>
    );
  }
}

export default appjs;
