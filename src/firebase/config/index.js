import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDQRxrBk_8NVdvuWRLp4OP3mlk1Seu3vVA",
    authDomain: "storage-2ebad.firebaseapp.com",
    databaseURL: "https://storage-2ebad.firebaseio.com",
    projectId: "storage-2ebad",
    storageBucket: "storage-2ebad.appspot.com",
    messagingSenderId: "1010820280121",
    appId: "1:1010820280121:web:e3eef69b9f233720f042e8",
    measurementId: "G-T36YJNEY6S"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase