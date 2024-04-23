const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const getThoughts = async () => {
  return;
};

const getSingleThought = async (req, res) => {
  return;
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      res
        .status(400)
        .json({ message: "Thought created, but found no user with that ID." });
    }

    res.json("Thought created!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateThought = async (req, res) => {
  return;
};

const deleteThought = async (req, res) => {
  return;
};

const addReaction = async (req, res) => {
  return;
};

const deleteReaction = async (req, res) => {
  return;
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
