import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';

import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';

import {scaleTime, scaleLinear, scaleQuantile} from 'd3-scale';

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

const printFirstItem = (a) => {
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
};

const scaleX = scaleTime().domain([data[0].x, data[5].x]).range([0, width]);
const scaleY = scaleLinear()
  .domain([0, 300])
  .range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);
const line = d3.shape
  .line()
  .x((d) => scaleX(d.x))
  .y((d) => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);
const properties = path.svgPathProperties(line); // svgPathProperties gives us the total length of the line
const lineLength = properties.getTotalLength();

class Revolut extends React.Component {
  cursor = React.createRef();

  label = React.createRef();

  state = {
    x: new Animated.Value(0),
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
    this.state.x.addListener(({value}) => this.moveCursor(value));
    this.moveCursor(0);
  }

  render() {
    //console.log(data)
    //printFirstItem(data)
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
              <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
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

export default Revolut;
