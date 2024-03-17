const admin = require("firebase-admin");

const login = async (req, res) => {
  const { phoneNumber } = req.body;

  admin.auth()
  .getUserByPhoneNumber(phoneNumber)
  .then((userRecord) => {
    admin.auth()
  .createCustomToken(userRecord.uid)
  .then((customToken) => {
    // Send token back to client
  })
    res.send('Successfully fetched user data');

    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:  ${userRecord.toJSON()}`);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

};

const register = async (req, res) => {
  // Handle registration logic using authService
  try {
    const { phoneNumber } = req.body;
    const user = await admin.auth().createUser({
      phoneNumber,
    });
    res.json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = {
  login,
  register,
};