require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
const path = require('path');
const storage = new Storage({ keyFilename: process.env.STORAGE_CREDENTIALS });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const db = admin.firestore();

exports.setDetailProfile = async (req, res) => {
  try {
    const userId  = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // First, fetch the user document to get the name
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    // Create user profile object with data from request and user document
    const userProfile = {
      name: req.body.name !== undefined ? req.body.name : userData.name, 
      age: req.body.age,
      gender: req.body.gender,
      currentPosition: req.body.currentPosition,
      institution: req.body.institution,
      major: req.body.major,
      bio: req.body.bio,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Remove undefined fields
    Object.keys(userProfile).forEach(
      key => userProfile[key] === undefined && delete userProfile[key]
    );

    // Reference to user details document
    const userDetailsRef = db.collection('userDetails').doc(userId);

    // Upload profile image if provided
    let profileImageUrl;
    if (req.file) {
      const fileName = `profile-images/${userId}_${Date.now()}${path.extname(req.file.originalname)}`;
      const file = bucket.file(fileName);

      // Upload file with metadata
      await file.save(req.file.buffer, {
        metadata: {
          contentType: req.file.mimetype,
          metadata: {
            userId: userId,
            uploadedAt: new Date().toISOString()
          }
        },
        resumable: false
      });

      // Get public URL
      profileImageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      userProfile.profileImageUrl = profileImageUrl;
    }

    // Update Firestore document
    await userDetailsRef.set(userProfile, { merge: true });

    // Return success response
    return res.status(200).json({
      message: 'Profile updated successfully',
      data: {
        ...userProfile,
        profileImageUrl
      }
    });

  } catch (error) {
    console.error('Error in setDetailProfile:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getDetailProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection('userDetails').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ user: userDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}