const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (make sure the credentials are set up properly)
const serviceAccount = require("../../../credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Register User
exports.register = async (req, res) => {
  const userController = require("./userController")
  const { email, password, displayName } = req.body;
  
  if (!email || !password || !displayName) {
    return res.status(400).json({ error: "Email, password, and display name are required" });
  }

  try {
    // Create auth user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    });

    // Create user in Firestore via userController
    await userController.createUser(userRecord.uid, {
      email,
      displayName,
    });

    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        userId: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        emailVerified: userRecord.emailVerified
      } 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
};

// Login User (handled via Firebase Client SDK; not on the server directly)
exports.login = (req, res) => {
  res.status(501).json({ 
    message: "Login should be handled by Firebase Client SDK on the frontend." 
  });
};

// Verify Token
exports.verifyToken = async (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ 
      message: "Token verified", 
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};