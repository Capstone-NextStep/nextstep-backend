const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Add the user info to the request object
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = verifyFirebaseToken;
