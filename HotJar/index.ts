const express = require('express');
const app = express();
const PORT = 3000;
var admin = require("firebase-admin");
//import authRoutes from "./src/auth/authRouter"
 const authRoutes = require('./src/auth/authRouter.ts');
const chatRoutes = require('./src/chat/chatRouter.ts');
const { authenticate } = require('./src/middlewre/authMiddleware.ts');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hotjar-55513-default-rtdb.asia-southeast1.firebasedatabase.app"
});



// Middleware to parse JSON
app.use(express.json());



app.use('/auth', authRoutes);
app.use('/chat', authenticate, chatRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = {
  app, admin
};

