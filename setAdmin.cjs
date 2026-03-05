const admin = require("firebase-admin");
const serviceAccount = require("");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "WLqK7GbeUZhRYElvxPxrMhMibIf2";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(" Admin rights successfully added");
    process.exit();
  })
  .catch((error) => {
    console.error(" Error setting admin:", error);
  });

