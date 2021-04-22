import React from 'react';
import {StackedAreaChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {View, Text, Button, Alert} from 'react-native';
import axios from 'axios';
import {G, Circle, Rect, Line} from 'react-native-svg';
import * as dateFns from 'date-fns';
import * as scale from 'd3-scale';

import stonks from '/Users/juliuskapeniakdev/projects/MoodyStocks/components/stockData.js';
export default class StackedAreaExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      stockData: [],
      isLoading: true,
    };

    // this.stonks();
    //console.log(Object.size(this.state))
  }

  componentDidMount() {
    this.stonks();
  }

  stonks = async () => {
    // var ret = null;
    try {
      // const sectorRes = await axios.get(
      // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`,
      //);

      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`,
        )
        .then((sectorRes) => {
          var tSeries = sectorRes.data['Time Series (Daily)'];

          //console.log(Object.size(tSeries));
          //var tempDataStore = [];
          let arr = new Array(100);
          let i = 0;
          for (var tempData in tSeries) {
            // console.log('i: ' + i);
            //   console.log('Your Date: ' + tempData);
            //   console.log('Price: ' + parseFloat(tSeries[tempData]['4. close']));

            const dateFields = tempData.split('-');
            //this.setState({data: [...this.state.data, parseInt(tSeries[tempData]['4. close'])]})
            //this.setState({x: [...this.state.x, new Date(dateFields[0], dateFields[2], dateFields[1])]})
            // console.log(dateFields[0]);
            // console.log(dateFields[1]);
            //  console.log(dateFields[2]);

            arr[i] = {
              month: new Date(dateFields[0], dateFields[1], dateFields[2]),
              price: parseInt(tSeries[tempData]['4. close']),
            };

            i++;
          }

          for (let i = 0; i < 50; i++) {
            this.setState({stockData: [...this.state.stockData, arr[i]]});
          }

          this.setState({isLoading: false});
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // const {isLoading} =this.state;
    const axesSvg = {fontSize: 10, fill: 'grey'};
    const verticalContentInset = {top: 10, bottom: 10};
    const xAxisHeight = 30;

    const colors = ['#cc66ff']; //, '#aa00ff', '#cc66ff', '#eeccff'
    const keys = ['price']; // const keys = ['apples', 'bananas', 'cherries', 'dates'];

    const svgs = [
      {onPress: () => console.log('price')},
      // {onPress: () => console.log('bananas')},
      // {onPress: () => console.log('cherries')},
      //{onPress: () => console.log('dates')},
    ];

    if (this.state.isLoading) {
      return (
        <View style={{marginBottom: 200, marginLeft: 160}}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={{height: 250, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={this.state.stockData}
          style={{marginBottom: xAxisHeight}}
          yAccessor={({item}) => item.price}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <StackedAreaChart
            style={{flex: 1}}
            style={{height: 300, flex: 1}}
            data={this.state.stockData}
            keys={keys}
            colors={colors}
            curve={shape.curveNatural}
            showGrid={false}
            svgs={svgs}
          />

          <XAxis
            // style={{marginHorizontal: -10, height: xAxisHeight}}
            data={this.state.stockData}
            // scale={scale.scaleTime}
            // numberOfTicks={20}
            // xAccessor={({item}) => item.month}
            // formatLabel={(value) => dateFns.format(value, 'M:d')}
            // contentInset={{left: 10, right: 10}}
            // svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}
