import firebase from 'firebase/app'
import database from 'firebase/database'
import 'firebase/auth'

  const config = {
    apiKey: "AIzaSyBDkYL7SPL_rERsHW6cvVP6WwdE352iujY",
    authDomain: "cjoshmartin-f652e.firebaseapp.com",
    databaseURL: "https://cjoshmartin-f652e.firebaseio.com",
    projectId: "cjoshmartin-f652e",
    storageBucket: "cjoshmartin-f652e.appspot.com",
    messagingSenderId: "277001799380"
  };

const app = firebase.initializeApp(config);

export default app;
export const db = firebase.database().ref()

export const auth = app.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const githubProvider = new firebase.auth.GithubAuthProvider()
export const twitterProvider = new firebase.auth.TwitterAuthProvider()
