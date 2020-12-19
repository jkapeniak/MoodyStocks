import React from 'react';
import {LineChart, Grid} from 'react-native-svg-charts';
import {View, Text, Button, Alert} from 'react-native';
import StackedAreaExample from './components/StackedAreaExample.js';

import axios from "axios";



class appjs extends React.PureComponent {

   stonks = async () => {
   // console.log('69')
    
    try {
        const sectorRes = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
        );
        //console.log(69)
        console.log(sectorRes.data)
      } catch (error) {
        console.log(error);
      }
      
}
  render() {
    return (
      <View style ={{flex:1, flexDirection: 'column', justifyContent: 'space-between', }}
        >
       
       <View style={{top:1, padding: 100}}>
        <Button
            title="Press"
            onPress={ this.stonks } //onPress={() => this.state.data[5] = this.state.data[5]+100 }
          />
        </View>
        <View style ={{
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
