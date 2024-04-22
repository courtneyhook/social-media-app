const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    /**
     * username:
     *  string
     *  unique
     * required
     * trimmed
     *
     * email
     *  string
     * require
     * unique
     * must match a valid email address (look into mongoose's matching validation)
     *
     * thoughts
     *  array of _id values referencing the thought model
     *
     * friends
     *  array of _id values referencing the user model (self-reference)
     *
     * Schema settings--create a virtual called friendcount that retrieves the length of the user's friends array field on the query
     *
     *
     */
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {});

const User = model("User", userSchema);

module.exports = User;
