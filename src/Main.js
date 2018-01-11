
import React from 'react';
import { FlatList, Text, View, TouchableHighlight } from 'react-native';

export default class Main extends React.Component {
    state = {
        data: [],
        newPostTitle: "create a new Post",
        navigate: null,
    };
    static navigationOptions = {
        title: 'Welcome',
    };


    componentWillMount(){
        this.state.data.push({key: this.state.newPostTitle }) 
        if(!this.state.navigate) {
        const { navigate } = this.props.navigation;
            this.setState({navigate: navigate})
        }
    }
    _renderlistitem({ item })
    {
        let colors = ['#13262F','#B0A084']
        return(
            <TouchableHighlight style={{backgroundColor:'#13262f', justifyContent: 'center', alignItems: 'center'}} onPress={() => { (item.key == this.state.newPostTitle) ? this.state.navigate("NewPost") : ""}}>
                <Text style={{fontSize: 20, color: 'white'}}> {item.key} </Text>
            </TouchableHighlight>
        )
    }
    render()
    {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderlistitem.bind(this)}
            />
        );
    }
}
