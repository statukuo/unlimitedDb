const mongoose = require('mongoose');

const collectionCard = new mongoose.Schema({
  set: { type: String, required: true },
  number: { type: Number, required: true },
  count: { type: Number, required: true, default: 0 },
  isFoil: { type: Boolean, default: false }
});

const instance = new mongoose.Schema(
  {
    /*
      document ID is set by default via MongoDB - next line is deprecated
      _id: mongoose.Schema.Types.ObjectId,
    */

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    cardCollection: {
      type: [collectionCard]
    }
  },
  {
    timestamps: true,
  },
);

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = 'Account';

module.exports = mongoose.model(modelName, instance);
