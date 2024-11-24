const mongoose = require('mongoose');

const Card = new mongoose.Schema({
  id: { type: String },
  count: { type: Number }
});

const Comment = new mongoose.Schema({
  writerId: { type: String },
  text: { type: String }
});

const instance = new mongoose.Schema({
  title: { type: String },
  type: { type: String, default: "Premier" },
  leader: { type: Card },
  secondaryLeader: { type: Card },
  base: { type: Card },
  list: { type: [Card] },
  sideboard: { type: [Card] },
  viewCount: { type: Number, default: 0 },
  likeCount: { type: Number, deafault: 0 },
  private: { type: Boolean, default: true },
  ownerId: { type: String },
  version: { type: Number, default: 1 },
  comments: { type: [Comment], default: [] },
  description: { type: String, default: "" }
},
  {
    timestamps: true,
  });

const modelName = 'Deck';

module.exports = mongoose.model(modelName, instance);
