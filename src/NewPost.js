
import React from 'react';
import { Text, View, TouchableHighlight, Button, TextInput, StyleSheet} from 'react-native';
import Markdown from 'react-native-simple-markdown'

import { db } from './firebase.js'
export default class NewPost extends React.Component {

    state = {
        isPreview: false, 
        BodyText: "# The Markdown Editor is coming!", 
        TitleText: "NEWS! its coming!",
        did_text_change: false,
    };

    componentDidMount() {
        this.props.navigation.setParams({ togglePreview: this._togglePreview.bind(this)});
        this.props.navigation.setParams({isEditing: true })
        if(this.props.navigation.state.params.isPost)
        {
            this.setState({TitleText: this.props.navigation.state.params.title})
            this.setState({BodyText: this.props.navigation.state.params.body})
        }
    }

    componentWillUnmount(){
        if(this.state.did_text_change)
        {
            let id, date_modified;

            if(this.props.navigation.state.params.isPost){
                id = this.props.navigation.state.params.id
                date_modified =(new Date() ).getTime()
            }
            else
            {
                id = (new Date() ).getTime()
                date_modified = 'N/A';

            }
            console.log(date_modified)
            db.child('blog').child(id).set({
                body: this.state.BodyText,
                title: this.state.TitleText,
                date_modified,
            })
        } 
    
    
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state; 

        function _editorState(){

            if(params.isEditing)
            {
                return 'Edit'
            }

            return 'Done'
        }

        let editButton =(<Button title={_editorState()} onPress={params.togglePreview ? params.togglePreview : () => null} />) 

        return { 

            title: 'Compose Your Post',
            headerRight: editButton,
        }
    };


    _togglePreview(){
        this.setState({isPreview: !this.state.isPreview })
        this.props.navigation.setParams({isEditing:  !this.props.navigation.state.params.isEditing  })
    }

    onTextChange(text){

        this.setState({did_text_change: true})
        this.setState(text)
    }
    render(){
        return( <View style={{flex: 1}}>

            <TextInput
                editable={this.state.isPreview}
                onChangeText={(TitleText) => this.onTextChange({TitleText})}
                value={this.state.TitleText}
                style={Styles.TitleField}/>

            { (this.state.isPreview) ?  
                    <TextInput 
                        editable = {this.state.isPreview} 
                        multiline = {true} 
                        onChangeText={(BodyText) => this.onTextChange({BodyText})} 
                        value={this.state.BodyText} 
                style={Styles.BodyField} /> :
                    <Markdown 
                        style={Styles.Markdown}> 
                        
                        {this.state.BodyText} 
                   
                    </Markdown> }

        </View>)

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
    },
    TitleField:{

        borderColor: 'rgba(82, 194, 175, 1)',
        borderWidth: 1,
        padding: 20,
        paddingLeft: 8,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    Markdown:{

        flex: 1,
        padding: 4,
        paddingLeft: 15,

    }

})
