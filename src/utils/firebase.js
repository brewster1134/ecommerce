import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDgGZOYSIY9ms9_nVFTFpEFqG4DWLAlv4U',
  authDomain: 'react-ecommerce-firebase.firebaseapp.com',
  databaseURL: 'https://react-ecommerce-firebase.firebaseio.com',
  projectId: 'react-ecommerce-firebase',
  storageBucket: 'react-ecommerce-firebase.appspot.com',
  messagingSenderId: '488577895067',
  appId: '1:488577895067:web:296cbf424945a67994943e',
  measurementId: 'G-FSQHQJ1V8Y'
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()

// create google authentication provider
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// save user to database
export const createUserRef = async (userAuth, additionalData) => {
  if (!userAuth) return null

  const userRef = firestore.collection('users').doc(userAuth.uid)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth

    try {
      await userRef.set({
        displayName,
        email,
        created: firebase.firestore.Timestamp.now(),
        ...additionalData
      })
    } catch (error) {
      console.error('error saving user to database', error.message)
    }
  }

  return userRef
}

export default firebase
