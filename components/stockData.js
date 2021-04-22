
import axios from 'axios';


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
        console.log('Your Date: ' + tempData);
        console.log('Price: ' + parseFloat(tSeries[tempData]['4. close']));

        const dateFields = tempData.split('-');
        //this.setState({data: [...this.state.data, parseInt(tSeries[tempData]['4. close'])]})
        //this.setState({x: [...this.state.x, new Date(dateFields[0], dateFields[2], dateFields[1])]})
        console.log(dateFields[0]);
        console.log(dateFields[1]);
        console.log(dateFields[2]);

        arr[i] = {
          month: new Date(dateFields[0], dateFields[1], dateFields[2]),
          price: parseInt(tSeries[tempData]['4. close']),
          
        };

        i++;
      }

      for (let i = 0; i < 50; i++) {
        this.setState({stockData: [...this.state.stockData, arr[i]]});
      }


    } catch (error) {
      console.log(error);
    }
  };

  export default stonks;