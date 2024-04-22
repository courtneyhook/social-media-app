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
  return;
};

const deleteFriend = async (req, res) => {
  return;
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
