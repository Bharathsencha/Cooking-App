const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        followers: user.followers.length,
        following: user.following.length
      }
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get followers
exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ uid: userId }).populate('followers', 'uid displayName photoURL');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.followers
    });
  } catch (error) {
    console.error('Error getting followers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get following
exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ uid: userId }).populate('following', 'uid displayName photoURL');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.following
    });
  } catch (error) {
    console.error('Error getting following:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Get both users
    const follower = await User.findOne({ uid: followerId });
    const following = await User.findOne({ uid: followingId });

    if (!follower || !following) {
      return res.status(404).json({
        success: false,
        message: 'One or both users not found'
      });
    }

    // Check if already following
    if (follower.following.includes(following._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already following this user'
      });
    }

    // Update follower's following list
    follower.following.push(following._id);
    await follower.save();

    // Update followed user's followers list
    following.followers.push(follower._id);
    await following.save();

    res.status(200).json({
      success: true,
      message: 'Successfully followed user'
    });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Get both users
    const follower = await User.findOne({ uid: followerId });
    const following = await User.findOne({ uid: followingId });

    if (!follower || !following) {
      return res.status(404).json({
        success: false,
        message: 'One or both users not found'
      });
    }

    // Check if actually following
    if (!follower.following.includes(following._id)) {
      return res.status(400).json({
        success: false,
        message: 'Not following this user'
      });
    }

    // Update follower's following list
    follower.following = follower.following.filter(id => !id.equals(following._id));
    await follower.save();

    // Update followed user's followers list
    following.followers = following.followers.filter(id => !id.equals(follower._id));
    await following.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unfollowed user'
    });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { displayName, photoURL } = req.body;
    const userId = req.user.id; // From auth middleware

    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (photoURL) updateData.photoURL = photoURL;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};