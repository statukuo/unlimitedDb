const mongoose = require('mongoose');

const instance = new mongoose.Schema({
  set: { type: String },
  number: { type: Number },
  name: { type: String },
  subtitle: { type: String },
  type: {
    type: String,
    enum: ['Unit', 'Event', 'Upgrade', 'Leader', 'Base'],
    default: 'unit'
  },
  aspects: { type: [String] },
  traits: { type: [String] },
  arenas: { type: [String] },
  cost: { type: Number },
  power: { type: Number },
  hp: { type: Number },
  frontText: { type: String },
  epicAction: { type: String },
  doubleSided: { type: Boolean },
  backArt: { type: String },
  backText: { type: String },
  rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Legendary', 'Special'] },
  unique: { type: Boolean },
  artist: { type: String },
  frontArt: { type: String },
  keywords: { type: [String] }
});

const modelName = 'Card';

module.exports = mongoose.model(modelName, instance);
