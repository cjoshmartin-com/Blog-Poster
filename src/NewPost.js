
import React from 'react';
import { Text, View, TouchableHighlight, Platform, Button } from 'react-native';

export default class NewPost extends React.Component {

    state = {isPreview: false };

    componentDidMount() {
        this.props.navigation.setParams({ togglePreview: this._togglePreview.bind(this)});
        this.props.navigation.setParams({isEditing: true })
        //this.setState({isPreview: true})  // quck fix have the same state as isEditing
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state; 

       let editButton =(<Button title={(params.isEditing)?"Edit" : "Done"} onPress={params.togglePreview ? params.togglePreview : () => null} />) 
        return { title: 'Compose Your Post',
            headerRight: editButton,
       }
    };
    
    _togglePreview(){
        console.log(this.props.navigation.state.params)
        this.setState({isPreview: !this.state.isPreview })
        this.props.navigation.setParams({isEditing:  !this.props.navigation.state.params.isEditing  })
    }
    onTextChange(text){
    }
    render(){
        console.log(this.state.isPreview)
        return(
            <View>
                <Text> In House Markdown Editor coming soon to a phone near you! </Text>
            </View>
        )
    
    }

}
