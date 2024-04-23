const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});

    res.json({ thoughts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this ID" });
    }

    res.json({ thought });
  } catch (error) {
    return res.status(500).json(error);
  }
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
