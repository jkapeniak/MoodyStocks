import React from 'react';
import {StackedAreaChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {View, Text, Button, Alert} from 'react-native';
import axios from 'axios';

export default class StackedAreaExample extends React.PureComponent {
  
  constructor(){
      super();
      this.state = {
          stockData: [
            {
              month: new Date(2015, 0, 1),
              apples: 3840,
              bananas: 1920,
              cherries: 960,
              dates: 400,
            },
            {
              month: new Date(2015, 1, 1),
              apples: 1600,
              bananas: 1440,
              cherries: 960,
              dates: 400,
            },
            {
              month: new Date(2015, 2, 1),
              apples: 640,
              bananas: 960,
              cherries: 3640,
              dates: 400,
            },
            
          ],
      }
  }

  addItem = () => {
    let newStock = {
      month: new Date(2015, 3, 1),
      apples: 3320,
      bananas: 480,
      cherries: 640,
      dates: 400,
    }

    this.setState({stockData: [...this.state.stockData, newStock]})

  }
    
  
  
  
    stonks = async () => {
   
    var ret = null;
    try {
      const sectorRes = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`,
      );
      
      var tSeries = sectorRes.data['Time Series (Daily)'];

      //console.log(Object.size(tSeries));
      //var tempDataStore = [];
      let arr = new Array(100);
      let i = 0;
      for (var tempData in tSeries) {
        // console.log('i: ' + i);
        // console.log('Your Date: ' + tempData);

        const dateFields = tempData.split('-');

        arr[i] = {
          month: new Date(dateFields[0], dateFields[2], dateFields[1]),
          apples: parseInt(tSeries[tempData]['4. close']),
          bananas: 1920,
          cherries: 960,
          dates: 400,
        };

      
        i++;
      }
      
      for (let i = 0; i < 4; i++) {

        
        this.state.stockData[i] = arr[i];
      }

      

      
    } catch (error) {
      console.log(error);
    }

    
  };

  render() {

    
    /*const data = [
      {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
      },
      {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
      },
    ];
        */
     

    const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
    const keys = ['apples', 'bananas', 'cherries', 'dates'];
    const svgs = [
      {onPress: () => console.log('apples')},
      {onPress: () => console.log('bananas')},
      {onPress: () => console.log('cherries')},
      {onPress: () => console.log('dates')},
    ];

    return (
      <View>
        <Button
          title="Press"
          onPress={this.addItem} //onPress={() => this.state.data[5] = this.state.data[5]+100 }
        />

        <StackedAreaChart
          style={{height: 500}}
          data={this.state.stockData}
          keys={keys}
          colors={colors}
          curve={shape.curveNatural}
          showGrid={false}
          svgs={svgs}
        />
      </View>
    );
  }
}
