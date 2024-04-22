const { User, Thought } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("thought");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUsers };
