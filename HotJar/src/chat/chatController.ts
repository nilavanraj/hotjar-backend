const admin = require("firebase-admin");
const registrationToken = "d3W3yaF_SzqzzUyc997EaE:APA91bHSFTGzDc1-0mrHR9QwjNfJ_Fv4YnWbHew68_4nrSKpev2372KK2f7mnOJIbfNzhzaFSExFVWEehtd8jGmYTGdhOVjMF7XWoREEMiAON1fvX5krYlWeLz8UojMjMPm3b-JCJvEc"

const setToken = async (req, res) => {
  try {
    const userId = req.user.uid;
    const fcmToken = req.body.fcmtoken;

    const db = admin.firestore();
    const tokensRef = db.collection('fcmTokens');

    await tokensRef.doc(userId).set({
      token: fcmToken,
    });

    res.status(200).json({ message: 'Token updated successfully' });
  } catch (error) {
    console.error('Error updating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const message = {
    data: {
      sender: 'him',
      text: 'Hello'
    },
    token: registrationToken
  };

  
const sendMessage = async (req, res) => {
  const tokensRef = admin.firestore().collection('fcmTokens');
  const userId = req.body.sender;

  const snapshot = await tokensRef.doc(userId).get();
  const token = snapshot.data().token;


  const message = {
    data: {
      ...req?.body ?? {},
    },
    token
  };
  
    admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
  
    res.json({ message: 'Hello, welcome to my API!'});
};

module.exports = {
  setToken,
  sendMessage,
};