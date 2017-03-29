import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDs_UalXlf6uzpPcPX0IBVF0SD61fgb1U8",
  authDomain: "xdomio-1fdcc.firebaseapp.com",
  databaseURL: "https://xdomio-1fdcc.firebaseio.com",
  storageBucket: "xdomio-1fdcc.appspot.com",
  messagingSenderId: "1002071359895"
};
firebase.initializeApp(config)
const database = firebase.database()

export default database