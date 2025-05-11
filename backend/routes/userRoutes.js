const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  updateProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/:userId', getUserProfile);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

// Protected routes
router.post('/follow', protect, followUser);
router.post('/unfollow', protect, unfollowUser);
router.put('/profile', protect, updateProfile);

module.exports = router;