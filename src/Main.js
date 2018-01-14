
import React from 'react';
import { FlatList, Text, View, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation'

import { db, auth } from './firebase.js'
export default class Main extends React.Component {
    state = {
        data: [],
        newPostTitle: "create a new Post",
        navigate: null,
        is_testing: false,
    };
    static navigationOptions = {
        title: 'Welcome',
    };

    componentWillMount(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'})
            ]
        })

        if(!this.state.is_testing) {
            auth.onAuthStateChanged((user) => {
                (user) ? console.log("USER EXIST") : this.props.navigation.dispatch(resetAction) 
            })
        }
        if(!this.state.navigate) {
            const { navigate } = this.props.navigation;
            this.setState({navigate: navigate})
        }

    }
    componentDidMount(){
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
                borderBottomWidth: 5,
                borderColor: 'white',
            }} 
            onPress={() => { (item.key == this.state.newPostTitle) ? this.state.navigate("NewPost", {isPost: false }) : this.state.navigate("NewPost", item.params) }}>

            <Text style={{fontSize: 40, color: 'white'}}> {item.key} </Text>

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
