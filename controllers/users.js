const User = require("../models/Consumer");

const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    res.status(200).json({ user: loggedInUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const updatedUser = await User.findByIdAndUpdate(loggedInUserId, req.body, {
      new: true,
    });
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, updateUser };
