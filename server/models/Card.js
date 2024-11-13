const mongoose = require('mongoose')


const aspect = new mongoose.Schema({ value: { type: String, enum: ['Vigilance', 'Command', 'Aggression', 'Cunning', 'Villainy', 'Heroism', 'none'] } });
const arena = new mongoose.Schema({ value: { type: String, enum: ['Ground', 'Space'] } });

const instance = new mongoose.Schema(
  {
    set: { type: String },
    number: { type: Number },
    name: { type: String },
    subtitle: { type: String },
    type: {
      type: String,
      enum: ['unit', 'event', 'upgrade', 'leader', 'base'],
      default: 'unit'
    },
    aspect: {
      type: [aspect],
      default: 'none'
    },
    traits: { type: [String] },
    arenas: { type: [arena] },
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
    artits: { type: String },
    frontArt: { type: String }
  }
)

const modelName = 'Card'

module.exports = mongoose.model(modelName, instance)
