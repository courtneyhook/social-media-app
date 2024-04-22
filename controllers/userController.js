const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const friendCount = async () => {
  const numberOfFriends = await User.aggregate().count("friendCount");
  return numberOfFriends;
};

const getUsers = async (req, res) => {
  console.log("user route");
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  return;
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  return;
};

const updateUser = async (req, res) => {
  return;
};

const addNewFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user was found with that ID" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addNewFriend,
  deleteFriend,
};
