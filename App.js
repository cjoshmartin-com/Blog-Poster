import React from 'react';
import { StackNavigator } from 'react-navigation';

import { db, auth } from './src/firebase.js'
import Main from './src/Main'
import NewPost from './src/NewPost.js';

const Runner = () => { // TODO: Change name of this later
    
    let blogPosts;
    auth.onAuthStateChanged((user) => {
        (user) ? console.log("USER EXIST") : console.log(`USER DOESN'T EXIST`)
    })

    db.child('blog').on('value', (snapshot)=>{
        
        //console.log(snapshot.val());
    
    })

const blog_db = db.child('blog');

    return {

        Home: { 
            screen: Main,
            params: { blog_db },
        },
        NewPost: {
            screen: NewPost,
            key: 'main0',
            params: { blog_db },
        },
    }

}

const App = StackNavigator(Runner())

export default App;


