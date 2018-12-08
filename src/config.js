import firebase from 'firebase';
// Change you firebase settings here
const firebaseConfig = {
apiKey: "AIzaSyD-DMjw3IfrTHBZ5jeAblWvKGPF1o6AYdY",
authDomain: "front-end-project-ca550.firebaseapp.com",
databaseURL: "https://front-end-project-ca550.firebaseio.com",
projectId: "front-end-project-ca550",
storageBucket: "front-end-project-ca550.appspot.com",
messagingSenderId: "300653829275"
};
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;