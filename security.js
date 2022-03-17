require("dotenv").config();
const CryptoJS = require("crypto-js");
const admin = require("firebase-admin");
const serviceAccount = require(__dirname + "/servicekey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore();

let key = process.env.HASHKEY;

function passHash (password){
    let hashed = CryptoJS.HmacSHA256(password, key);
    hashed = hashed.toString();
    return hashed;
}

function authenticate (email, password, callback){
    database.collection("users").doc(email).get().then(doc => {
        if (!doc.exists){
            callback(false, "There is no such user");
        } else if (doc.data().password == passHash(password)){
            callback(true);
        } else {
            callback(false, "Wrong password!");
        }
    }).catch(err => {
        callback(false, err);
    });
}

module.exports = {
    authenticate: authenticate,
    admin: admin
}
