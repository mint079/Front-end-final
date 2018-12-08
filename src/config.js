import firebase from 'firebase';
// Change you firebase settings here
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
databaseURL: "YOUR_URL",
projectId: "YOUR_PROJECTID",
storageBucket: "YOUR_BUCKET",
messagingSenderId: "YOUR_MSG_SENDER"
};
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth;