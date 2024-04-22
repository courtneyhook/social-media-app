const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {},
  reactionBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtSchema = new Schema({
  /**
   *
   * thoughtText
   *  string
   * required
   * must be between 1 and 280 charachters
   *
   *
   * createdAt
   *  Date
   *  set default to current timestamp
   *  user a getter method to format the timestamp on query
   *
   *
   * username (the user that created the thought)
   *  string
   *  required
   *
   * reactions (these are like replies)
   *  array of nested documents created with the reactionSchema
   *
   * schema settings--create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
   *
   *
   * reaction (Schema Only)
   * reactionID
   *  use mongooses object ID data type
   * default value is set to a new objectID
   *
   * reactionBody
   *  string
   *  required
   *  280 character maximum
   *
   * username
   *  string
   *  required
   *
   * createdAt
   *  Date
   *  set default value to the current timestamp
   *  use a getter method to format the timestamp on query
   *
   * schema setting--this will not be a model, but rather will be used as the rection field's subdocument schema in the thought model
   */
  thoughtText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [reactionSchema],
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
