const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const { findByIdAndUpdate } = require("../models/User");

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
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this ID" });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({
        message: "There is no thought with that ID",
      });
    }

    res.json({ message: "Thought successfully deleted." });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "There is no thought with that ID" });
    }

    res.json(thought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "There is no thought with that ID." });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
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
