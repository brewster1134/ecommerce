import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDgGZOYSIY9ms9_nVFTFpEFqG4DWLAlv4U',
  authDomain: 'react-ecommerce-firebase.firebaseapp.com',
  databaseURL: 'https://react-ecommerce-firebase.firebaseio.com',
  projectId: 'react-ecommerce-firebase',
  storageBucket: 'react-ecommerce-firebase.appspot.com',
  messagingSenderId: '488577895067',
  appId: '1:488577895067:web:296cbf424945a67994943e',
  measurementId: 'G-FSQHQJ1V8Y',
}

firebase.initializeApp(config)

// create google authentication provider
const providerGoogle = new firebase.auth.GoogleAuthProvider()
providerGoogle.setCustomParameters({ prompt: 'select_account' })

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle)
export default firebase
