import React from 'react';
import {LineChart, Grid} from 'react-native-svg-charts';
import {View, Text, Button, Alert} from 'react-native';
import StackedAreaExample from './components/StackedAreaExample.js';
import AxesExample from './components/ToolTipExample';
import DecoratorExample from './components/DecoratorExample';
import SecondStack from './components/SecondStackArea';
import XAxisScaleTimeExample from './components/DateXaxis';
import Revolut from './components/revolut';
import Rev3 from './components/rev3';
import ConRend from './components/ConditionalRender';
import axios from 'axios';
import Speedometer from './components/speedometer'

var sentiment = require('wink-sentiment');

//console.log(sentiment( 'fail'
//const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI('0e7f1a5e3a514db88c78a7731d04edf6');


const apiKey = '0e7f1a5e3a514db88c78a7731d04edf6';
const ticker = 'IBM'




  getSentimentScore = async (dateFields) => {


    

   // console.log(year)

/*
    axios
      .get(
        `https://newsapi.org/v2/everything?language=en&qInTitle=${ticker}&from=2020-12-22&to=2020-12-22&sortBy=popularity&apiKey=${apiKey}`,
      )

      .then((response) => {

        //const arrayOfArticles = [];
        const arrayOfArticles = response.data.articles;

        //console.log(arrayOfArticles.length)


        for(var i =0; i < arrayOfArticles.length ; i++){

          
         // console.log(i +": " + arrayOfArticles[i].title)
        }
          

        
      })
      .catch((error) => console.log(error));

      */
}


class appjs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      isLoading: true
    };
  }

  loadData = async () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`,
      )

      .then((sectorRes) => {
        var tSeries = sectorRes.data['Time Series (Daily)'];

        // let arr = new Array(100);
        //let i = 0;
        getSentimentScore()
        for (var tempData in tSeries) {
          const dateFields = tempData.split('-');

         // console.log(dateFields);
            getSentimentScore(dateFields)

          this.setState({
            stockData: [
              ...this.state.stockData,
              {
                x: new Date(tempData), ///dateFields[0], dateFields[1], dateFields[2]
                y: parseInt(tSeries[tempData]['4. close']),
              },
            ],
          });


        }

       // console.log(this.state.stockData)

         this.setState({isLoading: false});
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.loadData();
  }

  render() {

    const {stockData} = this.state  

    if (this.state.isLoading) {
      return (
        <View style={{marginTop: 10, marginLeft: 160}}>
          <Text>XMAS</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between', //flex-end
        }}>
        
        <View>
          
        </View>

        <View>
        <Rev3 data={stockData}/>
        </View>
        
        
      </View>
    );
  }
}

export default appjs;
