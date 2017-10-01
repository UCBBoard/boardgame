import firebase from 'firebase'

const config = {
 apiKey: "AIzaSyAo_a9DKjgff4DP5QG-o4qCX1Mpcz-BFlM",
    authDomain: "boardgame-9c5a6.firebaseapp.com",
    databaseURL: "https://boardgame-9c5a6.firebaseio.com",
    projectId: "boardgame-9c5a6",
    storageBucket: "",
    messagingSenderId: "844999465595"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
