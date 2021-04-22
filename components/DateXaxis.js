import React from 'react'
import { AreaChart, XAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'

class XAxisScaleTimeExample extends React.PureComponent {

    render() {

        const data = [
            {
                
                value: 50,
                date: new Date(2018, 0, 1),
            },
            {
                value: 10,
                date: new Date(2018, 0, 2),
            },
            {
                value: 150,
                date: new Date(2018, 0, 3),
            },
            {
                value: 10,
                date: new Date(2018, 0, 4),
            },
            {
                value: 100,
                date: new Date(2018, 0, 5),
            },
            {
                value: 20,
                date: new Date(2018, 0, 6),
            },
        ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <AreaChart
                    style={{ flex: 1 }}
                    data={ data }
                    yAccessor={ ({ item }) => item.value }
                    xAccessor={ ({ item }) => item.date }
                    xScale={ scale.scaleTime }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                    curve={ shape.curveLinear }
                >
                    <Grid/>
                </AreaChart>
                <XAxis
                    data={ data }
                    svg={{
                        fill: 'black',
                        fontSize: 8,
                        fontWeight: 'bold',
                        rotation: 20,
                        originY: 30,
                        y: 5,
                    }}
                    xAccessor={ ({ item }) => item.date }
                    scale={ scale.scaleTime }
                    numberOfTicks={ 6 }
                    style={{ marginHorizontal: -15, height: 20 }}
                    contentInset={{ left: 10, right: 25 }}
                    formatLabel={ (value) => dateFns.format(value, 'MMM:dd') }
                />
            </View>
        )
    }

}

export default XAxisScaleTimeExample