import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from './src/Main'
import NewPost from './src/NewPost.js';

const App = StackNavigator({

    Home: { screen: Main },
    NewPost: {screen: NewPost},
})

export default App;


