
import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { MarkdownEditor } from 'react-native-markdown-editor';

export default class NewPost extends React.Component {

    static navigationOptions = {
        title: 'Compose Your Post',
    };

    onTextChange(text){
    }
    render(){
    
        return(
            <MarkdownEditor onMarkdownChange={this.onTextChange} showPreview={true}/>
        )
    
    }

}
