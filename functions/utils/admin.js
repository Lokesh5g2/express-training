var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var Collection = db.collection("myCollection")

module.exports = { Collection, admin }