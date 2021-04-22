import React from 'react'
import {View, Text, Button, Alert} from 'react-native'

class ConRend extends React.Component{
    
    state = {
        visible: true
    }

    
    
    render(){


        return (
            <View>
                
                {this.state.visible && <Text> Hello </Text> }

                <Button title='off' onPress={()=>{this.setState({visible:false})}} />
                <Button title='on' onPress={()=>{this.setState({visible:true})}} />
                    
                
            </View>
        );
    }
}

export default ConRend;