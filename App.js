import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from './src/Main'
import NewPost from './src/NewPost.js';
import Login from './src/Login.js'

import { auth } from './src/firebase.js'


const Runner = () => { // TODO: Change name of this later
    return {
        NewPost: { // put NewPost first to tell if app is broken
            screen: NewPost,
            key: 'main0',
        },
        Home: { 
            screen: Main,
        },
        Login:{
            screen: Login,
        },
    }
}

function RouterSettings() { 

let initRoute;
let CurrentUser = null

    if (CurrentUser) { 
        initRoute = "Home"
        console.log("USER DOES EXIST")
    } 
    else {
        initRoute = "Login"
    }
    return{
        initialRouteName: initRoute, 
    }
}

console.log(RouterSettings())

const App = StackNavigator(Runner(), RouterSettings())
export default App;


