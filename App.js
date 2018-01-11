import React from 'react';
import { StackNavigator } from 'react-navigation';

import { db, auth } from './src/firebase.js'
import Main from './src/Main'
import NewPost from './src/NewPost.js';

const Runner = () => { // TODO: Change name of this later


    return {

        Home: { screen: Main },
        NewPost: {
            screen: NewPost,
            key: 'main0',
        },
    }

}



const App = StackNavigator(Runner)

export default App;


