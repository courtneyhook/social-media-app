const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user with this ID" });
    }

    res.json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
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
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist.",
      });
    }

    res.json({ message: "User successfully deleted." });
  } catch (error) {
    res.status(500).json(error);
  }
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
