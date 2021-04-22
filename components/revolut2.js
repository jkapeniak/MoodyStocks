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
import {extent }from 'd3-array'


//const {
//  Path, Defs, LinearGradient, Stop,
//} = Svg;
const d3 = {
  shape,
  
};

const height = 200;
const {width} = Dimensions.get('window');
const verticalPadding = 5;
const cursorRadius = 8;
const labelWidth = 100;

const data = [
  {x: new Date(2018, 9, 1), y: 0},
  {x: new Date(2018, 9, 16), y: 0},
  {x: new Date(2018, 9, 17), y: 200},
  {x: new Date(2018, 10, 1), y: 200},
  {x: new Date(2018, 10, 2), y: 300},
  {x: new Date(2018, 10, 5), y: 300},
];


const xExtent = extent(data, d => d.x)
var scaleX = scaleTime().domain(xExtent).range([0, width]);
var scaleY = scaleLinear()
  .domain([0, 300])
  .range([height - verticalPadding, verticalPadding]);
var scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

var line = d3.shape
  .line()
  .x((d) => scaleX(d.x))
  .y((d) => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);
var properties = path.svgPathProperties(line); // svgPathProperties gives us the total length of the line
var lineLength = properties.getTotalLength();

class Revolut2 extends React.Component {
  
  
  cursor = React.createRef();

  label = React.createRef();
  state = {
    isLoading: true,
    x: new Animated.Value(0),
    data:null,
   
  };
  
  

  moveCursor(value) {
    const {x, y} = properties.getPointAtLength(lineLength - value);
    this.cursor.current.setNativeProps({
      top: y - cursorRadius,
      left: x - cursorRadius,
    });
    const label = scaleLabel(scaleY.invert(y));
    this.label.current.setNativeProps({text: `${label} CHF`}); //setNativeProps allows you to directly modify a DOM node without using state/props and thus triggering a renrender of the entire subtree
  }
  
  
  

  componentDidMount() {
    ///this.loadData()
     this.state.x.addListener(({value}) => this.moveCursor(value));
     this.moveCursor(0);
  }

  render() {
    









      





      const {x} = this.state;
      const translateX = x.interpolate({
        inputRange: [0, lineLength],
        outputRange: [width - labelWidth, 0],
        extrapolate: 'clamp',
      });
      return (
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <Svg {...{width, height}}>
              <Defs>
                <LinearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="gradient">
                  <Stop stopColor="#CDE3F8" offset="0%" />
                  <Stop stopColor="#eef6fd" offset="80%" />
                  <Stop stopColor="#FEFFFF" offset="100%" />
                </LinearGradient>
              </Defs>
              <Path
                d={line}
                fill="transparent"
                stroke="#367be2"
                strokeWidth={5}
              />
              <Path
                d={`${line} L ${width} ${height} L 0 ${height}`}
                fill="url(#gradient)"
              />
              <View ref={this.cursor} style={styles.cursor} />
            </Svg>
            <Animated.View style={[styles.label, {transform: [{translateX}]}]}>
              <TextInput ref={this.label} />
            </Animated.View>
            <Animated.ScrollView
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{width: lineLength * 2}}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
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
  root: {
    flex: 1,
  },
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

export default Revolut2;
