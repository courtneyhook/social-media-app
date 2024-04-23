const { Schema, model } = require("mongoose");
const formattedDate = require("../utils/dateformat");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: () => formattedDate,
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: () => formattedDate,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    id: false,
    runGettersOnQuery: true,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions?.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
