import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getFirestore, collection, doc, getDocs, getDoc} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import * as cookies from "../cookieFunctions.js";

const firebaseApp = await initializeApp({
    apiKey: "AIzaSyDVp8qYCwql3-g9VR-zRx5UoitP3q3Ma7w",
    authDomain: "waynarbocangelportfolio.firebaseapp.com",
    projectId: "waynarbocangelportfolio",
    storageBucket: "waynarbocangelportfolio.appspot.com",
    messagingSenderId: "383165753776",
    appId: "1:383165753776:web:80ec553fbb77e114374e75",
    measurementId: "G-80MWR8QHR0"
});

let db = getFirestore(firebaseApp);
let users = collection(db, "users");
let projects = collection(db, "projects");

let authenticate = (user) => {
    let docRef = doc(db, "users", user.email);
    getDoc(docRef).then(authUser => {
        if (authUser.exists()) {
            if (authUser.data().password != user.password) {
                alert("Wrong Password");
            } else {
                window.location.href = "/console";
            }
        } else {
            alert("error loging in");
        }
    });
}

authenticate({email: "waynarbocangel@gmail.com", password: "valepedrowaynar"});
console.log(JSON.stringify({email: "test", password: "test"}, null, 2));
console.log(db);
