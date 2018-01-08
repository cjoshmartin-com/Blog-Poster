
import React from 'react';
import { Text, View, TouchableHighlight, Button, TextInput, StyleSheet} from 'react-native';

export default class NewPost extends React.Component {

    state = {isPreview: false, text: "The Markdown Editor is coming!" };

    componentDidMount() {
        this.props.navigation.setParams({ togglePreview: this._togglePreview.bind(this)});
        this.props.navigation.setParams({isEditing: true })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state; 

        let editButton =(<Button title={(params.isEditing)?"Edit" : "Done"} onPress={params.togglePreview ? params.togglePreview : () => null} />) 

        return { 
            
            title: 'Compose Your Post',
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
        console.log(this.state)
        return(
            <View style={{flex: 1}}>
                <TextInput editable = {this.state.isPreview}  multiline = {true} onChangeText={(text) => this.setState({text})} value={this.state.text} style={Styles.BodyField} />
            </View>
        )

    }

} // end of class

var Styles = StyleSheet.create({
    BodyField: {
        borderColor: 'rgba(82, 194, 175, 1)',
        borderWidth: 1,
        flex: 1,
        padding: 4,
        paddingLeft: 8,
        fontSize: 16,
    }

})
