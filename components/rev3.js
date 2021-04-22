import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  TextInput,
  Text,
  Button,
} from 'react-native';

import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import axios from 'axios';
import {scaleTime, scaleLinear, scaleQuantile} from 'd3-scale';
import {extent} from 'd3-array';
import Speedometer from './speedometer'
//const {
//  Path, Defs, LinearGradient, Stop,
//} = Svg;
const d3 = {
  shape,
};

const height = 350;
const {width} = Dimensions.get('window');
const verticalPadding = 5;
const cursorRadius = 8;
const labelWidth = 200;

/*

const properties = path.svgPathProperties(line); // svgPathProperties gives us the total length of the line
const lineLength = properties.getTotalLength();

*/


class Rev3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      x: new Animated.Value(0),
      properties: null,
      lineLength: null,
      scaleLabel: null
    };
  }

  cursor = React.createRef();
  label = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const {data} = nextProps;
    if (!data) return {};

    const xExtent = extent(data, (d) => d.x);
    const yExtent = extent(data, (d) => d.y);

    const scaleX = scaleTime().domain(xExtent).range([0, width]);
    const scaleY = scaleLinear()
      .domain(yExtent)
      .range([height - verticalPadding, verticalPadding]);

    const line = d3.shape
      .line()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .curve(d3.shape.curveBasis)(data);

    const properties = path.svgPathProperties(line); // svgPathProperties gives us the total length of the line
    const lineLength = properties.getTotalLength();

    const scaleLabel = scaleQuantile().domain(xExtent).range(yExtent);
    
   // console.log(data)

    return {scaleX, scaleY, data, line, lineLength, properties, scaleLabel};
  }
  
   

  
  moveCursor(value) {
    const {x, y} = this.state.properties.getPointAtLength(this.state.lineLength - value);
    //console.log(this.state.properties.getPointAtLength(0))
    this.cursor.current.setNativeProps({
      top: y - cursorRadius,
      left: x - cursorRadius,
    });
    
    var path = this.state.properties
    var pathLength = path.getTotalLength();


     if(this.label.current){
       
       const labelY = (this.state.scaleY.invert(y)).toFixed(2);
       const labelX = this.state.scaleX.invert(x)

       var dateFields = String(labelX).split(' ')
        
        var date = dateFields[0] +' '+ dateFields[1] + ' ' + dateFields[2] + ' ' + dateFields[3]
      // console.log(date)
       var num = Math.round(labelY)
       this.label.current.setNativeProps({ text: `${date} - ${labelY}` })

     }

    









    
     //setNativeProps allows you to directly modify a DOM node without using state/props and thus triggering a renrender of the entire subtree
  }

  
  componentDidMount() {
   this.state.x.addListener(({value}) => this.moveCursor(value));
    this.moveCursor(0);
  }

  render() {
    const {data, line, lineLength, x} = this.state;

    
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });
        



    return (
      <SafeAreaView style={{}} >
        <View style={{marginBottom:50}} >
          <Speedometer/>
          </View>
            
        <View style={styles.container}>
          
        
          <Svg {...{width, height}}>
            <Path
              d={line}
              fill="transparent"
              stroke="#367be2"
              strokeWidth={3}
            />
            <View ref={this.cursor} style={styles.cursor} />
          </Svg>
          <Animated.View style={[styles.label, {transform: [{translateX}]}]}>
            <TextInput ref={this.label} />
          </Animated.View>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{width: lineLength * 2}}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={16}
            bounces={true}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            horizontal
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    marginTop: 60,
    height,
    width,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: 'lightgray',
    width: labelWidth,
  },
});

export default Rev3;
