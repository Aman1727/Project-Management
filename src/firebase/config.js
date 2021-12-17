import firebase from 'firebase/app'

// services we want to import for using it.
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAIfTyN1k_2Cbs3smCSUwlg-rxteCgW1uo",
    authDomain: "project-management-7c4cb.firebaseapp.com",
    projectId: "project-management-7c4cb",
    storageBucket: "project-management-7c4cb.appspot.com",
    messagingSenderId: "222564988960",
    appId: "1:222564988960:web:4b75c422f6785df0be2445"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
export const projectFirestore = firebase.firestore()
export const projectAuth = firebase.auth()
export const projectStorage = firebase.storage()

// timestamp
export const timestamp = firebase.firestore.Timestamp



