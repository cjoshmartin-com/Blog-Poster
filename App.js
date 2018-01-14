import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from './src/Main'
import NewPost from './src/NewPost.js';
import Login from './src/Login.js'

const Runner = () => { // TODO: Change name of this later
    return {

        Home: { 
            screen: Main,
        },
        Login:{
            screen: Login,
        },
        NewPost: {
            screen: NewPost,
            key: 'main0',
        },
    }

}

const App = StackNavigator(Runner())

export default App;


