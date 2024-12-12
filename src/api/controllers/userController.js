const admin = require("firebase-admin");
const db = admin.firestore();

// Create user in Firestore
exports.createUser = async (userId, userData) => {
  try {
    await db.collection('users').doc(userId).set({
      userId: userId,
      career: "No Career",
      email: userData.email,
      name: userData.displayName,
      roadmapProgress: [
        {
          step: "Choose Your Career First", 
          isDone: false
        }
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    throw error;
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ user: userDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    
    await db.collection('users').doc(userId).update(updateData);
    
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    
    usersSnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};