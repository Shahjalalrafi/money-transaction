import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBxZF8xx94bmjueCcnKH8NrXRiS2Nff6KQ",
    authDomain: "money-transaction-529a1.firebaseapp.com",
    projectId: "money-transaction-529a1",
    storageBucket: "money-transaction-529a1.appspot.com",
    messagingSenderId: "728913088608",
    appId: "1:728913088608:web:6bd6fe3438cfab73acb305"
};

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

export { projectFirestore , projectAuth s}