const express = require("express");
const authController = require("../controllers/authController");
const verifyFirebaseToken = require("../../middlewares/authMiddleware");

const router = express.Router();

// Public routes - removed "auth/" prefix since it's already mounted under /auth
router.post("/register", authController.register);
router.post("/verify", authController.verifyToken);

// Protected routes (require authentication)
router.get("/protected-route", verifyFirebaseToken, (req, res) => {
  res.status(200).json({ message: "You accessed a protected route!", user: req.user });
});

module.exports = router;