
import React from 'react';
import { FlatList, Text, View, TouchableHighlight } from 'react-native';

import { db, auth } from './firebase.js'
export default class Main extends React.Component {
    state = {
        data: [],
        newPostTitle: "create a new Post",
        navigate: null,
    };
    static navigationOptions = {
        title: 'Welcome',
    };


    componentDidMount(){
        if(!this.state.navigate) {
            const { navigate } = this.props.navigation;
            this.setState({navigate: navigate})
        }
        auth.onAuthStateChanged((user) => {
            (user) ? console.log("USER EXIST") : console.log(`USER DOESN'T EXIST`)
        })

        db.child('blog').on('value', (snapshot)=>{
            const data = snapshot.toJSON()
            const keys =Object.keys(data)
            const refreshdata = [] 

            refreshdata.push({key: this.state.newPostTitle }) 

            keys.map(e => {
                refreshdata.push({ 
                    key: data[e].title, 
                    params:{ 
                        data_modifited: data[e].data_modifited, 
                        body: data[e].body, 
                        title:data[e].title,
                        isPost: true,
                        id: e,
                    }  
                })
                this.setState({data: refreshdata})
            })
        })

        console.log(this.state.data)
    } // end of componentwillmount
    _renderlistitem({ item })
    {
        let colors = ['#13262F','#B0A084']
        return(
            <TouchableHighlight style={{
                backgroundColor:'#13262f', 
                justifyContent: 'center', 
                alignItems: 'center'
            }} 
            onPress={() => { (item.key == this.state.newPostTitle) ? this.state.navigate("NewPost", {isPost: false }) : this.state.navigate("NewPost", item.params) }}>

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
