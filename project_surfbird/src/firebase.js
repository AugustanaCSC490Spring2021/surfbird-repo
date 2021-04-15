import firebase from "firebase";

    const firebaseConfig = {
        apiKey: "AIzaSyCqhW8hcefwRSgwBHGjjnFUZ7CRfklYBNI",
        authDomain: "project-surfbird.firebaseapp.com",
        projectId: "project-surfbird",
        storageBucket: "project-surfbird.appspot.com",
        messagingSenderId: "83635846578",
        appId: "1:83635846578:web:380a8e175a667e76a578ab",
        measurementId: "G-0HKDS53YV2"
    };

    const db = firebaseApp.firestore();

    export default db
    export { firebaseApp } 
    export const logOut = () => {
      firebase.auth().signOut().then(()=> {
        console.log('logged out')
      }).catch((error) => {
        console.log(error.message)
      })
    }; 